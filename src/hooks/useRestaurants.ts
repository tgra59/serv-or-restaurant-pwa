import { useMemo } from 'react';
import { useLocalStorage } from './useLocalStorage';
import type { Restaurant, AppSettings } from '../types';
import { sampleRestaurants } from '../data/sampleData';

export function useRestaurants() {
  const [restaurants, setRestaurants] = useLocalStorage<Restaurant[]>('restaurants', sampleRestaurants);
  const [settings, setSettings] = useLocalStorage<AppSettings>('settings', {
    activeRestaurantId: sampleRestaurants[0]?.id || null,
    lastReset: new Date()
  });

  const activeRestaurant = useMemo(() => 
    restaurants.find(r => r.id === settings.activeRestaurantId) || restaurants[0] || null,
    [restaurants, settings.activeRestaurantId]
  );

  const setActiveRestaurant = (restaurantId: string) => {
    setSettings(prev => ({ ...prev, activeRestaurantId: restaurantId }));
  };

  const addRestaurant = (restaurant: Restaurant) => {
    setRestaurants(prev => [...prev, restaurant]);
  };

  const updateRestaurant = (restaurantId: string, updates: Partial<Restaurant>) => {
    setRestaurants(prev => 
      prev.map(r => r.id === restaurantId ? { ...r, ...updates } : r)
    );
  };

  const deleteRestaurant = (restaurantId: string) => {
    setRestaurants(prev => {
      const filtered = prev.filter(r => r.id !== restaurantId);
      // If we deleted the active restaurant, set the first remaining one as active
      if (restaurantId === settings.activeRestaurantId && filtered.length > 0) {
        setSettings(prev => ({ ...prev, activeRestaurantId: filtered[0].id }));
      }
      return filtered;
    });
  };

  return {
    restaurants,
    activeRestaurant,
    settings,
    setActiveRestaurant,
    addRestaurant,
    updateRestaurant,
    deleteRestaurant,
    setRestaurants
  };
}