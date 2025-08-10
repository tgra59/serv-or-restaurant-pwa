import type { Restaurant } from '../types';

// List of restaurant JSON files to load
const RESTAURANT_FILES = [
  'bistro-garden.json',
  'fast-burger.json', 
  'sunset-marquis.json'
];

/**
 * Converts a simple JSON format to our app's required format
 */
function normalizeRestaurant(data: any): Restaurant {
  // Handle both formats: our format and simplified format
  const restaurant = {
    id: data.id || Math.random().toString(36).substr(2, 9),
    name: data.name || data.restaurantName || 'Unknown Restaurant',
    isActive: data.isActive !== undefined ? data.isActive : true,
    menu: {
      categories: data.menu?.categories?.map((category: any) => {
        const categoryId = category.id || category.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
        return {
          id: categoryId,
          name: category.name,
          items: category.items?.map((item: any, itemIndex: number) => ({
            id: item.id || `${categoryId}-${itemIndex}`,
            name: item.name,
            description: item.description || '',
            categoryId: categoryId,
            modifiers: item.modifiers?.map((modifier: any, modIndex: number) => ({
              id: modifier.id || `${categoryId}-${itemIndex}-mod-${modIndex}`,
              name: modifier.name,
              type: modifier.type || 'single',
              required: modifier.required || false,
              options: modifier.options?.map((option: any, optIndex: number) => ({
                id: option.id || `${categoryId}-${itemIndex}-mod-${modIndex}-opt-${optIndex}`,
                name: option.name
              })) || []
            })) || [],
            requiredModifiers: item.requiredModifiers || 
              item.modifiers?.filter((m: any) => m.required).map((m: any, i: number) => 
                m.id || `${categoryId}-${itemIndex}-mod-${i}`
              ) || []
          })) || []
        };
      }) || []
    }
  };
  
  return restaurant as Restaurant;
}

/**
 * Dynamically loads restaurants from JSON files in the public/restaurants directory
 */
export async function loadRestaurantsFromJSON(): Promise<Restaurant[]> {
  const restaurants: Restaurant[] = [];
  
  for (const filename of RESTAURANT_FILES) {
    try {
      const response = await fetch(`/serv-or-restaurant-pwa/restaurants/${filename}`);
      if (response.ok) {
        const data = await response.json();
        const restaurant = normalizeRestaurant(data);
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