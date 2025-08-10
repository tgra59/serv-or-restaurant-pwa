import { useState, useEffect } from 'react';
import { X, Plus, Minus } from 'lucide-react';
import type { MenuItem, Modifier, SelectedModifier } from '../types';

interface ModifierModalProps {
  isOpen: boolean;
  onClose: () => void;
  menuItem: MenuItem | null;
  onAddToOrder: (item: any) => void;
}

export function ModifierModal({ isOpen, onClose, menuItem, onAddToOrder }: ModifierModalProps) {
  const [selectedModifiers, setSelectedModifiers] = useState<Record<string, string[]>>({});
  const [customModifiers, setCustomModifiers] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (isOpen && menuItem) {
      // Initialize required modifiers
      const initialModifiers: Record<string, string[]> = {};
      menuItem.modifiers.forEach(modifier => {
        if (modifier.required && modifier.options.length > 0) {
          if (modifier.type === 'single') {
            initialModifiers[modifier.id] = [modifier.options[0].id];
          }
        }
      });
      setSelectedModifiers(initialModifiers);
      setCustomModifiers('');
      setQuantity(1);
    }
  }, [isOpen, menuItem]);

  if (!isOpen || !menuItem) return null;

  const handleModifierChange = (modifierId: string, optionId: string, type: 'single' | 'multiple') => {
    setSelectedModifiers(prev => {
      const newState = { ...prev };
      
      if (type === 'single') {
        newState[modifierId] = [optionId];
      } else {
        const current = newState[modifierId] || [];
        if (current.includes(optionId)) {
          newState[modifierId] = current.filter(id => id !== optionId);
        } else {
          newState[modifierId] = [...current, optionId];
        }
      }
      
      return newState;
    });
  };

  const canAddToOrder = () => {
    return menuItem.modifiers.every(modifier => {
      if (modifier.required) {
        const selected = selectedModifiers[modifier.id] || [];
        return selected.length > 0;
      }
      return true;
    });
  };

  const handleAddToOrder = () => {
    if (!canAddToOrder()) return;

    const formattedModifiers: SelectedModifier[] = menuItem.modifiers
      .map(modifier => {
        const selected = selectedModifiers[modifier.id] || [];
        if (selected.length === 0) return null;

        const selectedOptions = selected.map(optionId => {
          const option = modifier.options.find(opt => opt.id === optionId);
          return option?.name || optionId;
        });

        return {
          modifierId: modifier.id,
          modifierName: modifier.name,
          selectedOptions
        };
      })
      .filter(Boolean) as SelectedModifier[];

    const orderItem = {
      id: `${menuItem.id}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      menuItemId: menuItem.id,
      menuItemName: menuItem.name,
      selectedModifiers: formattedModifiers,
      customModifiers: customModifiers.trim() ? [customModifiers.trim()] : [],
      quantity
    };

    onAddToOrder(orderItem);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-card rounded-lg max-w-md w-full max-h-[80vh] overflow-y-auto">
        <div className="sticky top-0 bg-card border-b border-border p-4 flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg">{menuItem.name}</h3>
            <p className="text-sm text-muted-foreground">{menuItem.description}</p>
          </div>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-accent rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 space-y-6">
          {/* Quantity Selector */}
          <div className="flex items-center justify-between">
            <span className="font-medium">Quantity</span>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-1 rounded border border-border hover:bg-accent transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-8 text-center font-medium">{quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="p-1 rounded border border-border hover:bg-accent transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Modifiers */}
          {menuItem.modifiers.map(modifier => (
            <div key={modifier.id} className="space-y-3">
              <div className="flex items-center gap-2">
                <h4 className="font-medium">
                  {modifier.name}
                  {modifier.required && <span className="text-destructive ml-1">*</span>}
                </h4>
                {modifier.type === 'multiple' && (
                  <span className="text-xs text-muted-foreground">(select multiple)</span>
                )}
              </div>

              <div className="space-y-2">
                {modifier.options.map(option => (
                  <label 
                    key={option.id}
                    className="flex items-center gap-3 p-2 rounded border border-border hover:bg-accent/50 cursor-pointer transition-colors"
                  >
                    <input
                      type={modifier.type === 'single' ? 'radio' : 'checkbox'}
                      name={modifier.type === 'single' ? modifier.id : undefined}
                      checked={(selectedModifiers[modifier.id] || []).includes(option.id)}
                      onChange={() => handleModifierChange(modifier.id, option.id, modifier.type)}
                      className="rounded"
                    />
                    <span className="flex-1">{option.name}</span>
                    {option.price && (
                      <span className="text-sm text-muted-foreground">
                        +${option.price.toFixed(2)}
                      </span>
                    )}
                  </label>
                ))}
              </div>
            </div>
          ))}

          {/* Custom Instructions */}
          <div className="space-y-2">
            <label className="block font-medium">Special Instructions</label>
            <textarea
              value={customModifiers}
              onChange={(e) => setCustomModifiers(e.target.value)}
              placeholder="e.g., no onions, extra sauce, etc."
              className="w-full p-3 border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-ring dark:text-muted-foreground"
              rows={3}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={handleAddToOrder}
              disabled={!canAddToOrder()}
              className="flex-1 bg-primary text-primary-foreground py-3 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add to Order {quantity > 1 && `(${quantity})`}
            </button>
            <button
              onClick={onClose}
              className="px-6 py-3 border border-border rounded-lg font-medium hover:bg-accent transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}