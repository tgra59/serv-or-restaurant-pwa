import { useState, useMemo, useCallback } from 'react';
import type { MenuItem, Restaurant } from '../types';

export function useSearch(restaurant: Restaurant | null) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const allMenuItems = useMemo(() => {
    if (!restaurant) return [];
    
    return restaurant.menu.categories.flatMap(category => 
      category.items.map(item => ({
        ...item,
        categoryName: category.name
      }))
    );
  }, [restaurant]);

  const filteredItems = useMemo(() => {
    if (!restaurant) return [];

    let items = allMenuItems;

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      items = items.filter(item => 
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.categoryName.toLowerCase().includes(query)
      );
    }

    // Filter by selected category
    if (selectedCategory) {
      items = items.filter(item => item.categoryId === selectedCategory);
    }

    return items;
  }, [allMenuItems, searchQuery, selectedCategory, restaurant]);

  const filteredCategories = useMemo(() => {
    if (!restaurant) return [];

    return restaurant.menu.categories.map(category => ({
      ...category,
      items: category.items.filter(item => {
        if (!searchQuery.trim()) return true;
        
        const query = searchQuery.toLowerCase().trim();
        return (
          item.name.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          category.name.toLowerCase().includes(query)
        );
      })
    })).filter(category => category.items.length > 0);
  }, [restaurant, searchQuery]);

  const searchSuggestions = useMemo(() => {
    if (!searchQuery.trim() || searchQuery.length < 2) return [];

    const query = searchQuery.toLowerCase().trim();
    const suggestions: Array<{
      type: 'item' | 'category';
      text: string;
      item?: MenuItem & { categoryName: string };
      categoryId?: string;
    }> = [];

    // Add item suggestions
    allMenuItems
      .filter(item => 
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query)
      )
      .slice(0, 5)
      .forEach(item => {
        suggestions.push({
          type: 'item',
          text: item.name,
          item
        });
      });

    // Add category suggestions
    restaurant?.menu.categories
      .filter(category => 
        category.name.toLowerCase().includes(query)
      )
      .slice(0, 3)
      .forEach(category => {
        suggestions.push({
          type: 'category',
          text: `${category.name} (${category.items.length} items)`,
          categoryId: category.id
        });
      });

    return suggestions.slice(0, 8);
  }, [searchQuery, allMenuItems, restaurant]);

  const clearSearch = useCallback(() => {
    setSearchQuery('');
    setSelectedCategory(null);
  }, []);

  const selectSuggestion = useCallback((suggestion: typeof searchSuggestions[0]) => {
    if (suggestion.type === 'item') {
      setSearchQuery(suggestion.text);
    } else if (suggestion.type === 'category') {
      setSearchQuery('');
      setSelectedCategory(suggestion.categoryId || null);
    }
  }, []);

  const hasActiveFilters = useMemo(() => {
    return searchQuery.trim() !== '' || selectedCategory !== null;
  }, [searchQuery, selectedCategory]);

  return {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    filteredItems,
    filteredCategories,
    searchSuggestions,
    clearSearch,
    selectSuggestion,
    hasActiveFilters
  };
}