import { useState } from 'react';
import { ArrowLeft, Building2, Menu, Utensils, Plus, Edit, Trash2, Check, X, Palette, Sun, Moon, Monitor, Upload } from 'lucide-react';
import { useRestaurants } from '../hooks/useRestaurants';
import { useTheme } from '../hooks/useTheme';
import { ItemEditor } from './ItemEditor';
import type { Restaurant, MenuItem, Modifier, ModifierOption } from '../types';

interface SettingsProps {
  onClose: () => void;
}

type SettingsView = 'main' | 'restaurants' | 'menu' | 'edit-item' | 'edit-modifier';

export function Settings({ onClose }: SettingsProps) {
  const { restaurants, activeRestaurant, setActiveRestaurant, addRestaurant, updateRestaurant, deleteRestaurant } = useRestaurants();
  const { theme, setTheme } = useTheme();
  const [currentView, setCurrentView] = useState<SettingsView>('main');
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [editingModifier, setEditingModifier] = useState<Modifier | null>(null);
  const [newRestaurantName, setNewRestaurantName] = useState('');
  const [showAddRestaurant, setShowAddRestaurant] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);

  const handleAddRestaurant = () => {
    if (!newRestaurantName.trim()) return;
    
    const newRestaurant: Restaurant = {
      id: `restaurant-${Date.now()}`,
      name: newRestaurantName.trim(),
      isActive: true,
      menu: {
        categories: []
      }
    };
    
    addRestaurant(newRestaurant);
    setNewRestaurantName('');
    setShowAddRestaurant(false);
  };

  const validateMenuJson = (data: any): string | null => {
    if (!data || typeof data !== 'object') {
      return 'Invalid JSON format';
    }

    if (!data.restaurantName || typeof data.restaurantName !== 'string' || !data.restaurantName.trim()) {
      return 'Missing or invalid restaurant name';
    }

    if (!data.menu || !data.menu.categories || !Array.isArray(data.menu.categories)) {
      return 'Missing or invalid menu categories';
    }

    const categoryNames = new Set<string>();
    
    for (let i = 0; i < data.menu.categories.length; i++) {
      const category = data.menu.categories[i];
      
      if (!category.name || typeof category.name !== 'string' || !category.name.trim()) {
        return `Category ${i + 1}: Missing or invalid name`;
      }

      if (categoryNames.has(category.name)) {
        return `Duplicate category name: ${category.name}`;
      }
      categoryNames.add(category.name);

      if (!category.items || !Array.isArray(category.items)) {
        return `Category "${category.name}": Missing or invalid items array`;
      }

      const itemNames = new Set<string>();
      
      for (let j = 0; j < category.items.length; j++) {
        const item = category.items[j];
        
        if (!item.name || typeof item.name !== 'string' || !item.name.trim()) {
          return `Category "${category.name}", Item ${j + 1}: Missing or invalid name`;
        }

        if (itemNames.has(item.name)) {
          return `Category "${category.name}": Duplicate item name: ${item.name}`;
        }
        itemNames.add(item.name);

        if (!item.description || typeof item.description !== 'string') {
          return `Item "${item.name}": Missing or invalid description`;
        }

        if (item.modifiers && Array.isArray(item.modifiers)) {
          const modifierNames = new Set<string>();
          
          for (let k = 0; k < item.modifiers.length; k++) {
            const modifier = item.modifiers[k];
            
            if (!modifier.name || typeof modifier.name !== 'string' || !modifier.name.trim()) {
              return `Item "${item.name}", Modifier ${k + 1}: Missing or invalid name`;
            }

            if (modifierNames.has(modifier.name)) {
              return `Item "${item.name}": Duplicate modifier name: ${modifier.name}`;
            }
            modifierNames.add(modifier.name);

            if (modifier.type !== 'single' && modifier.type !== 'multiple') {
              return `Item "${item.name}", Modifier "${modifier.name}": Type must be "single" or "multiple"`;
            }

            if (typeof modifier.required !== 'boolean') {
              return `Item "${item.name}", Modifier "${modifier.name}": Required must be true or false`;
            }

            if (!modifier.options || !Array.isArray(modifier.options) || modifier.options.length === 0) {
              return `Item "${item.name}", Modifier "${modifier.name}": Must have at least one option`;
            }

            const optionNames = new Set<string>();
            
            for (let l = 0; l < modifier.options.length; l++) {
              const option = modifier.options[l];
              
              if (!option.name || typeof option.name !== 'string' || !option.name.trim()) {
                return `Item "${item.name}", Modifier "${modifier.name}", Option ${l + 1}: Missing or invalid name`;
              }

              if (optionNames.has(option.name)) {
                return `Item "${item.name}", Modifier "${modifier.name}": Duplicate option name: ${option.name}`;
              }
              optionNames.add(option.name);
            }
          }
        }
      }
    }

    return null;
  };

  const handleJsonImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setImportError(null);

    try {
      const text = await file.text();
      const data = JSON.parse(text);
      
      const validationError = validateMenuJson(data);
      if (validationError) {
        setImportError(validationError);
        return;
      }

      // Transform the JSON to our internal format
      const newRestaurant: Restaurant = {
        id: `restaurant-${Date.now()}`,
        name: data.restaurantName.trim(),
        isActive: true,
        menu: {
          categories: data.menu.categories.map((category: any) => ({
            id: `category-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            name: category.name.trim(),
            items: category.items.map((item: any) => ({
              id: `item-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
              name: item.name.trim(),
              description: item.description.trim(),
              categoryId: '', // Will be set when the category is created
              modifiers: (item.modifiers || []).map((modifier: any) => ({
                id: `modifier-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                name: modifier.name.trim(),
                type: modifier.type,
                required: modifier.required,
                options: modifier.options.map((option: any) => ({
                  id: `option-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                  name: option.name.trim(),
                  price: option.price
                }))
              }))
            }))
          }))
        }
      };

      // Set category IDs for items
      newRestaurant.menu.categories.forEach(category => {
        category.items.forEach(item => {
          item.categoryId = category.id;
        });
      });

      addRestaurant(newRestaurant);
      
      // Clear the file input
      event.target.value = '';
      
    } catch (error) {
      if (error instanceof SyntaxError) {
        setImportError('Invalid JSON file format');
      } else {
        setImportError('Failed to read file');
      }
    }
  };

  const renderMainSettings = () => (
    <div className="space-y-4">
      <h2 className="text-xl font-bold mb-6">Settings</h2>
      
      <div className="space-y-3">
        <button
          onClick={() => setCurrentView('restaurants')}
          className="w-full flex items-center gap-3 p-4 bg-card border border-border rounded-lg hover:bg-accent transition-colors text-left"
        >
          <Building2 className="w-5 h-5 text-primary" />
          <div>
            <div className="font-medium">Restaurant Management</div>
            <div className="text-sm text-muted-foreground">
              Switch restaurants, add new locations
            </div>
          </div>
        </button>

        <button
          onClick={() => setCurrentView('menu')}
          className="w-full flex items-center gap-3 p-4 bg-card border border-border rounded-lg hover:bg-accent transition-colors text-left disabled:opacity-50"
          disabled={!activeRestaurant}
        >
          <Menu className="w-5 h-5 text-primary" />
          <div>
            <div className="font-medium">Menu Management</div>
            <div className="text-sm text-muted-foreground">
              {activeRestaurant ? `Edit ${activeRestaurant.name} menu` : 'Select a restaurant first'}
            </div>
          </div>
        </button>

        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center gap-3 mb-4">
            <Palette className="w-5 h-5 text-primary" />
            <div>
              <div className="font-medium">Theme</div>
              <div className="text-sm text-muted-foreground">
                Choose your preferred color scheme
              </div>
            </div>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => setTheme('light')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                theme === 'light' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'border border-border hover:bg-accent'
              }`}
            >
              <Sun className="w-4 h-4" />
              Light
            </button>
            <button
              onClick={() => setTheme('dark')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                theme === 'dark' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'border border-border hover:bg-accent'
              }`}
            >
              <Moon className="w-4 h-4" />
              Dark
            </button>
            <button
              onClick={() => setTheme('system')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                theme === 'system' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'border border-border hover:bg-accent'
              }`}
            >
              <Monitor className="w-4 h-4" />
              System
            </button>
          </div>
        </div>
      </div>

      <div className="pt-6 border-t border-border">
        <div className="text-sm text-muted-foreground">
          <p><strong>Current Restaurant:</strong> {activeRestaurant?.name || 'None selected'}</p>
          <p><strong>Total Restaurants:</strong> {restaurants.length}</p>
          <p><strong>Menu Items:</strong> {activeRestaurant?.menu.categories.reduce((sum, cat) => sum + cat.items.length, 0) || 0}</p>
        </div>
      </div>
    </div>
  );

  const renderRestaurantSettings = () => (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => setCurrentView('main')} className="p-2 hover:bg-accent rounded-lg">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="text-xl font-bold">Restaurant Management</h2>
      </div>

      <div className="space-y-3">
        {restaurants.map((restaurant) => (
          <div key={restaurant.id} className="flex items-center gap-3 p-4 bg-card border border-border rounded-lg">
            <div className="flex-1">
              <div className="font-medium">{restaurant.name}</div>
              <div className="text-sm text-muted-foreground">
                {restaurant.menu.categories.length} categories, {' '}
                {restaurant.menu.categories.reduce((sum, cat) => sum + cat.items.length, 0)} items
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {activeRestaurant?.id === restaurant.id ? (
                <span className="px-3 py-1 bg-primary text-primary-foreground rounded-full text-sm font-medium">
                  Active
                </span>
              ) : (
                <button
                  onClick={() => {
                    setActiveRestaurant(restaurant.id);
                    // Force a small delay to ensure state update completes
                    setTimeout(() => {
                      onClose();
                    }, 10);
                  }}
                  className="px-3 py-1 border border-border rounded-lg text-sm hover:bg-accent"
                >
                  Select
                </button>
              )}
              
              {restaurants.length > 1 && (
                <button
                  onClick={() => deleteRestaurant(restaurant.id)}
                  className="p-2 text-destructive hover:bg-destructive/10 rounded-lg"
                  title="Delete restaurant"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* JSON Import Section */}
      <div className="pt-4 space-y-4">
        <div className="border-t border-border pt-4">
          <h3 className="font-medium mb-3">Import from JSON</h3>
          <div className="space-y-2">
            <label className="block">
              <input
                type="file"
                accept=".json"
                onChange={handleJsonImport}
                className="sr-only"
              />
              <div className="flex items-center justify-center gap-2 p-3 border-2 border-dashed border-border rounded-lg hover:bg-accent transition-colors cursor-pointer">
                <Upload className="w-5 h-5" />
                <span>Import Menu from JSON File</span>
              </div>
            </label>
            {importError && (
              <div className="p-3 bg-destructive/10 text-destructive rounded-lg text-sm">
                <strong>Import Error:</strong> {importError}
              </div>
            )}
            <p className="text-xs text-muted-foreground">
              Supported format: Restaurant menu with categories, items, and modifiers. 
              See <code>MENU_JSON_FORMAT.md</code> for detailed specifications.
            </p>
          </div>
        </div>
        
        {showAddRestaurant ? (
          <div className="flex gap-2">
            <input
              type="text"
              value={newRestaurantName}
              onChange={(e) => setNewRestaurantName(e.target.value)}
              placeholder="Restaurant name..."
              className="flex-1 px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring dark:text-muted-foreground"
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleAddRestaurant();
                if (e.key === 'Escape') {
                  setShowAddRestaurant(false);
                  setNewRestaurantName('');
                }
              }}
              autoFocus
            />
            <button
              onClick={handleAddRestaurant}
              className="px-3 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90"
              disabled={!newRestaurantName.trim()}
            >
              <Check className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                setShowAddRestaurant(false);
                setNewRestaurantName('');
              }}
              className="px-3 py-2 border border-border rounded-lg hover:bg-accent"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowAddRestaurant(true)}
            className="w-full flex items-center justify-center gap-2 p-4 border-2 border-dashed border-border rounded-lg hover:bg-accent transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add New Restaurant
          </button>
        )}
      </div>
    </div>
  );

  const renderMenuSettings = () => {
    if (!activeRestaurant) return null;

    return (
      <div className="space-y-4">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => setCurrentView('main')} className="p-2 hover:bg-accent rounded-lg">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-xl font-bold">Menu Management</h2>
        </div>

        <div className="text-sm text-muted-foreground mb-4">
          Managing menu for: <strong>{activeRestaurant.name}</strong>
        </div>

        {activeRestaurant.menu.categories.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Utensils className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No menu categories yet</p>
            <p className="text-sm">Add your first category to get started</p>
          </div>
        ) : (
          <div className="space-y-6">
            {activeRestaurant.menu.categories.map((category) => (
              <div key={category.id} className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-lg">{category.name}</h3>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-muted-foreground">
                      {category.items.length} items
                    </span>
                    {activeRestaurant.menu.categories.length > 1 && (
                      <button
                        onClick={() => {
                          if (category.items.length > 0) {
                            if (!confirm(`Delete "${category.name}" category? This will delete all ${category.items.length} items in it.`)) {
                              return;
                            }
                          } else if (!confirm(`Delete "${category.name}" category?`)) {
                            return;
                          }
                          
                          const updatedCategories = activeRestaurant.menu.categories.filter(c => c.id !== category.id);
                          updateRestaurant(activeRestaurant.id, {
                            ...activeRestaurant,
                            menu: { categories: updatedCategories }
                          });
                        }}
                        className="p-1 text-destructive hover:bg-destructive/10 rounded"
                        title="Delete category"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
                
                <div className="space-y-2">
                  {category.items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                      <div className="flex-1">
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-muted-foreground">{item.description}</div>
                        {item.modifiers.length > 0 && (
                          <div className="text-xs text-primary mt-1">
                            {item.modifiers.length} modifier group{item.modifiers.length !== 1 ? 's' : ''}
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => {
                          setEditingItem(item);
                          setCurrentView('edit-item');
                        }}
                        className="p-2 hover:bg-accent rounded-lg"
                        title="Edit item"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  
                  <button
                    onClick={() => {
                      const newItem: MenuItem = {
                        id: `item-${Date.now()}`,
                        name: 'New Item',
                        description: 'Description',
                        categoryId: category.id,
                        modifiers: []
                      };
                      setEditingItem(newItem);
                      setCurrentView('edit-item');
                    }}
                    className="w-full flex items-center justify-center gap-2 p-3 border-2 border-dashed border-border rounded-lg hover:bg-accent transition-colors text-muted-foreground"
                  >
                    <Plus className="w-4 h-4" />
                    Add Item to {category.name}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <button
          onClick={() => {
            const newCategoryName = prompt('Category name:');
            if (newCategoryName?.trim()) {
              const updatedRestaurant = {
                ...activeRestaurant,
                menu: {
                  categories: [
                    ...activeRestaurant.menu.categories,
                    {
                      id: `category-${Date.now()}`,
                      name: newCategoryName.trim(),
                      items: []
                    }
                  ]
                }
              };
              updateRestaurant(activeRestaurant.id, updatedRestaurant);
            }
          }}
          className="w-full flex items-center justify-center gap-2 p-4 border-2 border-dashed border-border rounded-lg hover:bg-accent transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add New Category
        </button>
      </div>
    );
  };

  const handleSaveItem = (item: MenuItem) => {
    if (!activeRestaurant) return;

    const updatedCategories = activeRestaurant.menu.categories.map(category => {
      if (category.id === item.categoryId) {
        const existingItemIndex = category.items.findIndex(i => i.id === item.id);
        if (existingItemIndex >= 0) {
          // Update existing item
          return {
            ...category,
            items: category.items.map(i => i.id === item.id ? item : i)
          };
        } else {
          // Add new item
          return {
            ...category,
            items: [...category.items, item]
          };
        }
      }
      return category;
    });

    updateRestaurant(activeRestaurant.id, {
      ...activeRestaurant,
      menu: { categories: updatedCategories }
    });

    setEditingItem(null);
    setCurrentView('menu');
  };

  const handleDeleteItem = (item: MenuItem) => {
    if (!activeRestaurant || !confirm(`Delete "${item.name}"?`)) return;

    const updatedCategories = activeRestaurant.menu.categories.map(category => ({
      ...category,
      items: category.items.filter(i => i.id !== item.id)
    }));

    updateRestaurant(activeRestaurant.id, {
      ...activeRestaurant,
      menu: { categories: updatedCategories }
    });

    setEditingItem(null);
    setCurrentView('menu');
  };

  const renderView = () => {
    switch (currentView) {
      case 'restaurants':
        return renderRestaurantSettings();
      case 'menu':
        return renderMenuSettings();
      case 'edit-item':
        return editingItem && activeRestaurant ? (
          <ItemEditor
            item={editingItem}
            restaurant={activeRestaurant}
            onSave={handleSaveItem}
            onCancel={() => {
              setEditingItem(null);
              setCurrentView('menu');
            }}
            onDelete={() => handleDeleteItem(editingItem)}
            isNew={!activeRestaurant.menu.categories
              .flatMap(c => c.items)
              .some(i => i.id === editingItem.id)
            }
          />
        ) : null;
      default:
        return renderMainSettings();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-start justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-card rounded-lg w-full max-w-2xl my-8">
        <div className="sticky top-0 bg-card border-b border-border p-4 flex justify-between items-center rounded-t-lg">
          <h1 className="text-lg font-semibold">Settings</h1>
          <button onClick={onClose} className="p-2 hover:bg-accent rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6">
          {renderView()}
        </div>
      </div>
    </div>
  );
}