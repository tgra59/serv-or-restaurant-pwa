import { useState, useEffect } from 'react';
import { ArrowLeft, Plus, X, Trash2, Check, Edit } from 'lucide-react';
import type { MenuItem, Modifier, ModifierOption, Restaurant } from '../types';

interface ItemEditorProps {
  item: MenuItem;
  restaurant: Restaurant;
  onSave: (item: MenuItem) => void;
  onCancel: () => void;
  onDelete?: () => void;
  isNew?: boolean;
}

export function ItemEditor({ item, restaurant, onSave, onCancel, onDelete, isNew = false }: ItemEditorProps) {
  const [editedItem, setEditedItem] = useState<MenuItem>(() => ({
    ...item,
    modifiers: item.modifiers.map(mod => ({
      ...mod,
      options: [...mod.options]
    }))
  }));
  
  const [editingModifier, setEditingModifier] = useState<Modifier | null>(null);
  const [showAddModifier, setShowAddModifier] = useState(false);

  const handleSave = () => {
    if (!editedItem.name.trim() || !editedItem.description.trim()) {
      alert('Please fill in both name and description');
      return;
    }
    onSave(editedItem);
  };

  const handleAddModifier = () => {
    const newModifier: Modifier = {
      id: `modifier-${Date.now()}`,
      name: 'New Modifier',
      type: 'single',
      required: false,
      options: []
    };
    setEditingModifier(newModifier);
    setShowAddModifier(false);
  };

  const handleSaveModifier = (modifier: Modifier) => {
    setEditedItem(prev => ({
      ...prev,
      modifiers: editingModifier && prev.modifiers.find(m => m.id === editingModifier.id)
        ? prev.modifiers.map(m => m.id === modifier.id ? modifier : m)
        : [...prev.modifiers, modifier]
    }));
    setEditingModifier(null);
  };

  const handleDeleteModifier = (modifierId: string) => {
    setEditedItem(prev => ({
      ...prev,
      modifiers: prev.modifiers.filter(m => m.id !== modifierId)
    }));
  };

  if (editingModifier) {
    return <ModifierEditor 
      modifier={editingModifier} 
      onSave={handleSaveModifier}
      onCancel={() => setEditingModifier(null)}
    />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={onCancel} className="p-2 hover:bg-accent rounded-lg">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-xl font-bold">
            {isNew ? 'Add New Item' : `Edit ${item.name}`}
          </h2>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90"
          >
            <Check className="w-4 h-4 mr-2 inline" />
            Save
          </button>
          {!isNew && onDelete && (
            <button
              onClick={onDelete}
              className="px-4 py-2 text-destructive border border-destructive rounded-lg hover:bg-destructive/10"
            >
              <Trash2 className="w-4 h-4 mr-2 inline" />
              Delete
            </button>
          )}
        </div>
      </div>

      {/* Basic Info */}
      <div className="bg-card border border-border rounded-lg p-4 space-y-4">
        <h3 className="font-semibold">Basic Information</h3>
        
        <div>
          <label className="block text-sm font-medium mb-2">Item Name</label>
          <input
            type="text"
            value={editedItem.name}
            onChange={(e) => setEditedItem(prev => ({ ...prev, name: e.target.value }))}
            className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring dark:text-muted-foreground"
            placeholder="e.g., Caesar Salad"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            value={editedItem.description}
            onChange={(e) => setEditedItem(prev => ({ ...prev, description: e.target.value }))}
            className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring resize-none dark:text-muted-foreground"
            rows={3}
            placeholder="e.g., Fresh romaine, parmesan, croutons, house caesar dressing"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Category</label>
          <select
            value={editedItem.categoryId}
            onChange={(e) => setEditedItem(prev => ({ ...prev, categoryId: e.target.value }))}
            className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-background dark:text-muted-foreground"
          >
            {restaurant.menu.categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Modifiers */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Modifiers</h3>
          <button
            onClick={handleAddModifier}
            className="px-3 py-1 bg-primary text-primary-foreground rounded-lg text-sm hover:opacity-90"
          >
            <Plus className="w-4 h-4 mr-1 inline" />
            Add Modifier
          </button>
        </div>

        {editedItem.modifiers.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p>No modifiers yet</p>
            <p className="text-sm">Add modifiers to let customers customize this item</p>
          </div>
        ) : (
          <div className="space-y-3">
            {editedItem.modifiers.map((modifier) => (
              <div key={modifier.id} className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                <div className="flex-1">
                  <div className="font-medium">{modifier.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {modifier.type === 'single' ? 'Single choice' : 'Multiple choice'} • 
                    {modifier.required ? ' Required' : ' Optional'} • 
                    {modifier.options.length} option{modifier.options.length !== 1 ? 's' : ''}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditingModifier(modifier)}
                    className="p-2 hover:bg-accent rounded-lg"
                    title="Edit modifier"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteModifier(modifier.id)}
                    className="p-2 text-destructive hover:bg-destructive/10 rounded-lg"
                    title="Delete modifier"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

interface ModifierEditorProps {
  modifier: Modifier;
  onSave: (modifier: Modifier) => void;
  onCancel: () => void;
}

function ModifierEditor({ modifier, onSave, onCancel }: ModifierEditorProps) {
  const [editedModifier, setEditedModifier] = useState<Modifier>(() => ({
    ...modifier,
    options: [...modifier.options]
  }));

  const [newOptionName, setNewOptionName] = useState('');
  const [showAddOption, setShowAddOption] = useState(false);

  const handleAddOption = () => {
    if (!newOptionName.trim()) return;
    
    const newOption: ModifierOption = {
      id: `option-${Date.now()}`,
      name: newOptionName.trim()
    };
    
    setEditedModifier(prev => ({
      ...prev,
      options: [...prev.options, newOption]
    }));
    
    setNewOptionName('');
    setShowAddOption(false);
  };

  const handleDeleteOption = (optionId: string) => {
    setEditedModifier(prev => ({
      ...prev,
      options: prev.options.filter(opt => opt.id !== optionId)
    }));
  };

  const handleSave = () => {
    if (!editedModifier.name.trim()) {
      alert('Please enter a modifier name');
      return;
    }
    if (editedModifier.options.length === 0) {
      alert('Please add at least one option');
      return;
    }
    onSave(editedModifier);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={onCancel} className="p-2 hover:bg-accent rounded-lg">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-xl font-bold">Edit Modifier</h2>
        </div>
        
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90"
        >
          <Check className="w-4 h-4 mr-2 inline" />
          Save Modifier
        </button>
      </div>

      <div className="bg-card border border-border rounded-lg p-4 space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Modifier Name</label>
          <input
            type="text"
            value={editedModifier.name}
            onChange={(e) => setEditedModifier(prev => ({ ...prev, name: e.target.value }))}
            className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring dark:text-muted-foreground"
            placeholder="e.g., Size, Add Protein, Dressing"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Selection Type</label>
            <select
              value={editedModifier.type}
              onChange={(e) => setEditedModifier(prev => ({ 
                ...prev, 
                type: e.target.value as 'single' | 'multiple' 
              }))}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-background dark:text-muted-foreground"
            >
              <option value="single">Single Choice</option>
              <option value="multiple">Multiple Choice</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Required?</label>
            <select
              value={editedModifier.required ? 'true' : 'false'}
              onChange={(e) => setEditedModifier(prev => ({ 
                ...prev, 
                required: e.target.value === 'true' 
              }))}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-background dark:text-muted-foreground"
            >
              <option value="false">Optional</option>
              <option value="true">Required</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Options</h3>
          <button
            onClick={() => setShowAddOption(true)}
            className="px-3 py-1 bg-primary text-primary-foreground rounded-lg text-sm hover:opacity-90"
          >
            <Plus className="w-4 h-4 mr-1 inline" />
            Add Option
          </button>
        </div>

        <div className="space-y-2">
          {editedModifier.options.map((option) => (
            <div key={option.id} className="flex items-center justify-between p-2 bg-secondary rounded">
              <span>{option.name}</span>
              <button
                onClick={() => handleDeleteOption(option.id)}
                className="p-1 text-destructive hover:bg-destructive/10 rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}

          {showAddOption && (
            <div className="flex gap-2">
              <input
                type="text"
                value={newOptionName}
                onChange={(e) => setNewOptionName(e.target.value)}
                placeholder="Option name..."
                className="flex-1 px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring dark:text-muted-foreground"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleAddOption();
                  if (e.key === 'Escape') {
                    setShowAddOption(false);
                    setNewOptionName('');
                  }
                }}
                autoFocus
              />
              <button
                onClick={handleAddOption}
                className="px-3 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90"
                disabled={!newOptionName.trim()}
              >
                <Check className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  setShowAddOption(false);
                  setNewOptionName('');
                }}
                className="px-3 py-2 border border-border rounded-lg hover:bg-accent"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {editedModifier.options.length === 0 && (
          <div className="text-center py-4 text-muted-foreground text-sm">
            No options yet. Add some options for customers to choose from.
          </div>
        )}
      </div>
    </div>
  );
}