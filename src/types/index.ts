export type ViewMode = 'main' | 'order-builder' | 'review-orders' | 'settings';

export interface Restaurant {
  id: string;
  name: string;
  isActive: boolean;
  menu: Menu;
}

export interface Menu {
  categories: Category[];
}

export interface Category {
  id: string;
  name: string;
  items: MenuItem[];
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  categoryId: string;
  modifiers: Modifier[];
  requiredModifiers?: string[];
}

export interface Modifier {
  id: string;
  name: string;
  type: 'single' | 'multiple';
  options: ModifierOption[];
  required: boolean;
}

export interface ModifierOption {
  id: string;
  name: string;
  price?: number;
}

export interface Order {
  id: string;
  identifier: string;
  items: OrderItem[];
  timestamp: Date;
  status: 'active' | 'archived';
}

export interface OrderItem {
  id: string;
  menuItemId: string;
  menuItemName: string;
  selectedModifiers: SelectedModifier[];
  customModifiers: string[];
  quantity: number;
}

export interface SelectedModifier {
  modifierId: string;
  modifierName: string;
  selectedOptions: string[];
}

export interface AppSettings {
  activeRestaurantId: string | null;
  lastReset: Date;
}