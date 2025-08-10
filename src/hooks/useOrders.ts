import { useState, useCallback, useMemo } from 'react';
import { useLocalStorage } from './useLocalStorage';
import type { Order, OrderItem } from '../types';

export function useOrders() {
  const [orders, setOrders] = useLocalStorage<Order[]>('orders', []);
  const [currentOrder, setCurrentOrder] = useState<OrderItem[]>([]);

  const activeOrders = useMemo(() => 
    orders.filter(order => order.status === 'active'), 
    [orders]
  );

  const archivedOrders = useMemo(() => 
    orders.filter(order => order.status === 'archived'), 
    [orders]
  );

  const addItemToCurrentOrder = useCallback((item: OrderItem) => {
    setCurrentOrder(prev => {
      const existingItemIndex = prev.findIndex(
        existing => 
          existing.menuItemId === item.menuItemId && 
          JSON.stringify(existing.selectedModifiers) === JSON.stringify(item.selectedModifiers) &&
          JSON.stringify(existing.customModifiers) === JSON.stringify(item.customModifiers)
      );

      if (existingItemIndex >= 0) {
        const updated = [...prev];
        updated[existingItemIndex].quantity += item.quantity;
        return updated;
      } else {
        return [...prev, item];
      }
    });
  }, []);

  const updateItemInCurrentOrder = useCallback((itemId: string, updates: Partial<OrderItem>) => {
    setCurrentOrder(prev => 
      prev.map(item => item.id === itemId ? { ...item, ...updates } : item)
    );
  }, []);

  const removeItemFromCurrentOrder = useCallback((itemId: string) => {
    setCurrentOrder(prev => prev.filter(item => item.id !== itemId));
  }, []);

  const clearCurrentOrder = useCallback(() => {
    setCurrentOrder([]);
  }, []);

  const finalizeOrder = useCallback((identifier: string) => {
    if (currentOrder.length === 0) return false;

    const newOrder: Order = {
      id: `order-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      identifier,
      items: currentOrder,
      timestamp: new Date(),
      status: 'active'
    };

    setOrders(prev => [...prev, newOrder]);
    setCurrentOrder([]);
    return true;
  }, [currentOrder, setOrders]);

  const archiveOrder = useCallback((orderId: string) => {
    setOrders(prev => 
      prev.map(order => 
        order.id === orderId ? { ...order, status: 'archived' as const } : order
      )
    );
  }, [setOrders]);

  const deleteOrder = useCallback((orderId: string) => {
    setOrders(prev => prev.filter(order => order.id !== orderId));
  }, [setOrders]);

  const shouldResetOrders = useCallback(() => {
    const now = new Date();
    const resetTime = 9; // 9 AM
    const closeTime = 2;  // 2 AM next day
    const currentHour = now.getHours();
    
    const lastReset = localStorage.getItem('lastOrderReset');
    const lastResetDate = lastReset ? new Date(lastReset) : new Date(0);
    
    const isSameDay = (date1: Date, date2: Date) => {
      return date1.toDateString() === date2.toDateString();
    };

    // Reset if it's past 9 AM and we haven't reset today
    if (currentHour >= resetTime && !isSameDay(now, lastResetDate)) {
      return true;
    }
    
    // Reset if it's between midnight and 2 AM and we haven't reset for this service period
    if (currentHour >= 0 && currentHour < closeTime) {
      const serviceDate = new Date(now);
      serviceDate.setDate(serviceDate.getDate() - 1); // Previous day's service
      
      if (!isSameDay(serviceDate, lastResetDate)) {
        return true;
      }
    }
    
    return false;
  }, []);

  const resetOrders = useCallback(() => {
    setOrders([]);
    setCurrentOrder([]);
    localStorage.setItem('lastOrderReset', new Date().toISOString());
  }, [setOrders]);

  return {
    orders,
    activeOrders,
    archivedOrders,
    currentOrder,
    addItemToCurrentOrder,
    updateItemInCurrentOrder,
    removeItemFromCurrentOrder,
    clearCurrentOrder,
    finalizeOrder,
    archiveOrder,
    deleteOrder,
    shouldResetOrders,
    resetOrders
  };
}