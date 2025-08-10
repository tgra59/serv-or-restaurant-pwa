import { useMemo, useEffect, useState } from 'react';
import { useLocalStorage } from './useLocalStorage';
import type { Restaurant, AppSettings } from '../types';
import { loadRestaurantsFromJSON } from '../utils/restaurantLoader';

export function useRestaurants() {
  const [restaurants, setRestaurants] = useLocalStorage<Restaurant[]>('restaurants', []);
  const [isLoading, setIsLoading] = useState(true);
  const [settings, setSettings] = useLocalStorage<AppSettings>('settings', {
    activeRestaurantId: null,
    lastReset: new Date()
  });

  // Load restaurants from JSON files on first mount
  useEffect(() => {
    let isMounted = true;
    
    const loadRestaurants = async () => {
      try {
        const loadedRestaurants = await loadRestaurantsFromJSON();
        if (isMounted && loadedRestaurants.length > 0) {
          // Only update if we don't already have restaurants or if the loaded ones are different
          setRestaurants(prev => {
            if (prev.length === 0) {
              return loadedRestaurants;
            }
            return prev;
          });
          
          // Set first restaurant as active if none is selected
          setSettings(prev => ({
            ...prev,
            activeRestaurantId: prev.activeRestaurantId || loadedRestaurants[0]?.id || null
          }));
        }
      } catch (error) {
        console.error('Failed to load restaurants:', error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadRestaurants();
    
    return () => {
      isMounted = false;
    };
  }, []); // Only run once on mount

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
    isLoading,
    setActiveRestaurant,
    addRestaurant,
    updateRestaurant,
    deleteRestaurant,
    setRestaurants
  };
}