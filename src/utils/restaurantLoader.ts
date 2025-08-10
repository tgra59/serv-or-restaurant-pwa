import type { Restaurant } from '../types';

// List of restaurant JSON files to load
const RESTAURANT_FILES = [
  'bistro-garden.json',
  'fast-burger.json', 
  'sunset-marquis.json'
];

/**
 * Dynamically loads restaurants from JSON files in the public/restaurants directory
 */
export async function loadRestaurantsFromJSON(): Promise<Restaurant[]> {
  const restaurants: Restaurant[] = [];
  
  for (const filename of RESTAURANT_FILES) {
    try {
      const response = await fetch(`/serv-or-restaurant-pwa/restaurants/${filename}`);
      if (response.ok) {
        const restaurant: Restaurant = await response.json();
        restaurants.push(restaurant);
      } else {
        console.warn(`Failed to load restaurant: ${filename}`);
      }
    } catch (error) {
      console.error(`Error loading restaurant ${filename}:`, error);
    }
  }
  
  return restaurants;
}

/**
 * Auto-discovers restaurant JSON files by trying common naming patterns
 * This is a fallback method when the file list isn't maintained
 */
export async function discoverRestaurants(): Promise<Restaurant[]> {
  // Since we can't dynamically list files in a static deployment,
  // we maintain the file list above. To add new restaurants:
  // 1. Add JSON file to public/restaurants/
  // 2. Add filename to RESTAURANT_FILES array
  // 3. Commit and push
  
  return loadRestaurantsFromJSON();
}