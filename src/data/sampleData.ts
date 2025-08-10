import type { Restaurant } from '../types';

export const sampleRestaurants: Restaurant[] = [
  {
    id: 'bistro-central',
    name: 'Bistro Central',
    isActive: true,
    menu: {
      categories: [
        {
          id: 'starters',
          name: 'Starters',
          items: [
            {
              id: 'caesar-salad',
              name: 'Caesar Salad',
              description: 'Fresh romaine, parmesan, croutons, house caesar dressing',
              categoryId: 'starters',
              modifiers: [
                {
                  id: 'caesar-protein',
                  name: 'Add Protein',
                  type: 'single',
                  required: false,
                  options: [
                    { id: 'grilled-chicken', name: 'Grilled Chicken' },
                    { id: 'grilled-salmon', name: 'Grilled Salmon' },
                    { id: 'grilled-shrimp', name: 'Grilled Shrimp' }
                  ]
                },
                {
                  id: 'caesar-dressing',
                  name: 'Dressing',
                  type: 'single',
                  required: true,
                  options: [
                    { id: 'regular-caesar', name: 'Regular Caesar' },
                    { id: 'light-caesar', name: 'Light Caesar' },
                    { id: 'dressing-side', name: 'Dressing on the Side' }
                  ]
                }
              ]
            },
            {
              id: 'soup-of-day',
              name: 'Soup of the Day',
              description: "Chef's daily selection - ask your server",
              categoryId: 'starters',
              modifiers: [
                {
                  id: 'soup-size',
                  name: 'Size',
                  type: 'single',
                  required: true,
                  options: [
                    { id: 'cup', name: 'Cup' },
                    { id: 'bowl', name: 'Bowl' }
                  ]
                }
              ]
            },
            {
              id: 'calamari',
              name: 'Fried Calamari',
              description: 'Crispy squid rings with marinara and aioli',
              categoryId: 'starters',
              modifiers: [
                {
                  id: 'calamari-sauce',
                  name: 'Sauce Selection',
                  type: 'multiple',
                  required: false,
                  options: [
                    { id: 'marinara', name: 'Marinara' },
                    { id: 'garlic-aioli', name: 'Garlic Aioli' },
                    { id: 'spicy-mayo', name: 'Spicy Mayo' }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: 'mains',
          name: 'Main Courses',
          items: [
            {
              id: 'club-sandwich',
              name: 'Club Sandwich',
              description: 'Triple decker with turkey, bacon, lettuce, tomato',
              categoryId: 'mains',
              modifiers: [
                {
                  id: 'bread-type',
                  name: 'Bread Choice',
                  type: 'single',
                  required: true,
                  options: [
                    { id: 'white-bread', name: 'White Bread' },
                    { id: 'wheat-bread', name: 'Whole Wheat' },
                    { id: 'sourdough', name: 'Sourdough' },
                    { id: 'rye-bread', name: 'Rye' }
                  ]
                },
                {
                  id: 'sandwich-side',
                  name: 'Side Choice',
                  type: 'single',
                  required: true,
                  options: [
                    { id: 'fries', name: 'French Fries' },
                    { id: 'sweet-fries', name: 'Sweet Potato Fries' },
                    { id: 'side-salad', name: 'Side Salad' },
                    { id: 'soup', name: 'Cup of Soup' },
                    { id: 'onion-rings', name: 'Onion Rings' }
                  ]
                },
                {
                  id: 'sandwich-extras',
                  name: 'Add Extras',
                  type: 'multiple',
                  required: false,
                  options: [
                    { id: 'extra-bacon', name: 'Extra Bacon' },
                    { id: 'avocado', name: 'Avocado' },
                    { id: 'cheese', name: 'Cheese' },
                    { id: 'pickles', name: 'Extra Pickles' }
                  ]
                }
              ]
            },
            {
              id: 'grilled-salmon',
              name: 'Grilled Atlantic Salmon',
              description: 'Fresh Atlantic salmon with lemon butter, seasonal vegetables',
              categoryId: 'mains',
              modifiers: [
                {
                  id: 'salmon-temp',
                  name: 'Temperature',
                  type: 'single',
                  required: true,
                  options: [
                    { id: 'medium-rare', name: 'Medium Rare' },
                    { id: 'medium', name: 'Medium' },
                    { id: 'medium-well', name: 'Medium Well' },
                    { id: 'well-done', name: 'Well Done' }
                  ]
                },
                {
                  id: 'salmon-starch',
                  name: 'Starch Choice',
                  type: 'single',
                  required: true,
                  options: [
                    { id: 'rice-pilaf', name: 'Rice Pilaf' },
                    { id: 'mashed-potatoes', name: 'Mashed Potatoes' },
                    { id: 'roasted-potatoes', name: 'Roasted Potatoes' },
                    { id: 'pasta', name: 'Pasta' }
                  ]
                }
              ]
            },
            {
              id: 'beef-burger',
              name: 'Bistro Burger',
              description: '8oz beef patty, lettuce, tomato, onion, pickle',
              categoryId: 'mains',
              modifiers: [
                {
                  id: 'burger-temp',
                  name: 'Temperature',
                  type: 'single',
                  required: true,
                  options: [
                    { id: 'rare', name: 'Rare' },
                    { id: 'medium-rare', name: 'Medium Rare' },
                    { id: 'medium', name: 'Medium' },
                    { id: 'medium-well', name: 'Medium Well' },
                    { id: 'well-done', name: 'Well Done' }
                  ]
                },
                {
                  id: 'burger-cheese',
                  name: 'Cheese',
                  type: 'single',
                  required: false,
                  options: [
                    { id: 'american', name: 'American' },
                    { id: 'cheddar', name: 'Cheddar' },
                    { id: 'swiss', name: 'Swiss' },
                    { id: 'blue-cheese', name: 'Blue Cheese' }
                  ]
                },
                {
                  id: 'burger-side',
                  name: 'Side Choice',
                  type: 'single',
                  required: true,
                  options: [
                    { id: 'fries', name: 'French Fries' },
                    { id: 'sweet-fries', name: 'Sweet Potato Fries' },
                    { id: 'onion-rings', name: 'Onion Rings' },
                    { id: 'side-salad', name: 'Side Salad' }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: 'drinks',
          name: 'Beverages',
          items: [
            {
              id: 'fresh-juice',
              name: 'Fresh Juice',
              description: 'Freshly squeezed daily',
              categoryId: 'drinks',
              modifiers: [
                {
                  id: 'juice-type',
                  name: 'Juice Selection',
                  type: 'single',
                  required: true,
                  options: [
                    { id: 'orange', name: 'Orange' },
                    { id: 'apple', name: 'Apple' },
                    { id: 'cranberry', name: 'Cranberry' },
                    { id: 'grapefruit', name: 'Grapefruit' }
                  ]
                },
                {
                  id: 'juice-size',
                  name: 'Size',
                  type: 'single',
                  required: true,
                  options: [
                    { id: 'small', name: 'Small (8oz)' },
                    { id: 'large', name: 'Large (12oz)' }
                  ]
                }
              ]
            },
            {
              id: 'coffee',
              name: 'Coffee',
              description: 'Freshly brewed premium blend',
              categoryId: 'drinks',
              modifiers: [
                {
                  id: 'coffee-type',
                  name: 'Coffee Type',
                  type: 'single',
                  required: true,
                  options: [
                    { id: 'regular', name: 'Regular' },
                    { id: 'decaf', name: 'Decaffeinated' },
                    { id: 'espresso', name: 'Espresso' },
                    { id: 'cappuccino', name: 'Cappuccino' },
                    { id: 'latte', name: 'Latte' }
                  ]
                },
                {
                  id: 'coffee-milk',
                  name: 'Milk Choice',
                  type: 'single',
                  required: false,
                  options: [
                    { id: 'whole-milk', name: 'Whole Milk' },
                    { id: 'skim-milk', name: 'Skim Milk' },
                    { id: 'almond-milk', name: 'Almond Milk' },
                    { id: 'oat-milk', name: 'Oat Milk' },
                    { id: 'soy-milk', name: 'Soy Milk' }
                  ]
                }
              ]
            },
            {
              id: 'soft-drinks',
              name: 'Soft Drinks',
              description: 'Coca-Cola products',
              categoryId: 'drinks',
              modifiers: [
                {
                  id: 'soda-type',
                  name: 'Drink Selection',
                  type: 'single',
                  required: true,
                  options: [
                    { id: 'coke', name: 'Coca-Cola' },
                    { id: 'diet-coke', name: 'Diet Coke' },
                    { id: 'sprite', name: 'Sprite' },
                    { id: 'orange-fanta', name: 'Orange Fanta' },
                    { id: 'root-beer', name: 'Root Beer' }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: 'desserts',
          name: 'Desserts',
          items: [
            {
              id: 'chocolate-cake',
              name: 'Chocolate Layer Cake',
              description: 'Rich chocolate cake with vanilla ice cream',
              categoryId: 'desserts',
              modifiers: [
                {
                  id: 'dessert-extras',
                  name: 'Add Extras',
                  type: 'multiple',
                  required: false,
                  options: [
                    { id: 'whipped-cream', name: 'Whipped Cream' },
                    { id: 'extra-ice-cream', name: 'Extra Ice Cream' },
                    { id: 'chocolate-sauce', name: 'Chocolate Sauce' },
                    { id: 'strawberries', name: 'Fresh Strawberries' }
                  ]
                }
              ]
            },
            {
              id: 'ice-cream',
              name: 'Ice Cream',
              description: 'Premium vanilla, chocolate, or strawberry',
              categoryId: 'desserts',
              modifiers: [
                {
                  id: 'ice-cream-flavors',
                  name: 'Flavors (choose up to 3)',
                  type: 'multiple',
                  required: true,
                  options: [
                    { id: 'vanilla', name: 'Vanilla' },
                    { id: 'chocolate', name: 'Chocolate' },
                    { id: 'strawberry', name: 'Strawberry' },
                    { id: 'mint-chip', name: 'Mint Chip' },
                    { id: 'rocky-road', name: 'Rocky Road' }
                  ]
                },
                {
                  id: 'ice-cream-scoops',
                  name: 'Number of Scoops',
                  type: 'single',
                  required: true,
                  options: [
                    { id: 'one-scoop', name: '1 Scoop' },
                    { id: 'two-scoops', name: '2 Scoops' },
                    { id: 'three-scoops', name: '3 Scoops' }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  },
  {
    id: 'fast-food-express',
    name: 'Fast Food Express',
    isActive: false,
    menu: {
      categories: [
        {
          id: 'burgers',
          name: 'Burgers',
          items: [
            {
              id: 'classic-burger',
              name: 'Classic Burger',
              description: 'Beef patty, lettuce, tomato, onion',
              categoryId: 'burgers',
              modifiers: [
                {
                  id: 'burger-size',
                  name: 'Size',
                  type: 'single',
                  required: true,
                  options: [
                    { id: 'regular', name: 'Regular' },
                    { id: 'large', name: 'Large' }
                  ]
                },
                {
                  id: 'burger-combo',
                  name: 'Make it a Combo',
                  type: 'single',
                  required: false,
                  options: [
                    { id: 'combo', name: 'Add Fries & Drink' }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: 'fries',
          name: 'Fries',
          items: [
            {
              id: 'french-fries',
              name: 'French Fries',
              description: 'Crispy golden fries',
              categoryId: 'fries',
              modifiers: [
                {
                  id: 'fries-size',
                  name: 'Size',
                  type: 'single',
                  required: true,
                  options: [
                    { id: 'small', name: 'Small' },
                    { id: 'medium', name: 'Medium' },
                    { id: 'large', name: 'Large' }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  }
];