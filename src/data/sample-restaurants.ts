import type { Restaurant } from '@/types';

export const sampleRestaurants: Restaurant[] = [
  {
    id: '1',
    name: 'Bistro Garden',
    isActive: true,
    menu: {
      categories: [
        {
          id: 'appetizers',
          name: 'Appetizers',
          items: [
            {
              id: 'bruschetta',
              name: 'Bruschetta',
              description: 'Toasted bread with tomatoes, basil, and garlic',
              categoryId: 'appetizers',
              modifiers: [
                {
                  id: 'bread-type',
                  name: 'Bread Type',
                  type: 'single',
                  required: true,
                  options: [
                    { id: 'sourdough', name: 'Sourdough' },
                    { id: 'ciabatta', name: 'Ciabatta' },
                    { id: 'baguette', name: 'Baguette' }
                  ]
                },
                {
                  id: 'extras',
                  name: 'Extras',
                  type: 'multiple',
                  required: false,
                  options: [
                    { id: 'extra-basil', name: 'Extra Basil' },
                    { id: 'extra-tomato', name: 'Extra Tomato' },
                    { id: 'balsamic', name: 'Balsamic Glaze' }
                  ]
                }
              ],
              requiredModifiers: ['bread-type']
            },
            {
              id: 'caesar-salad',
              name: 'Caesar Salad',
              description: 'Romaine lettuce with caesar dressing, croutons, and parmesan',
              categoryId: 'appetizers',
              modifiers: [
                {
                  id: 'size',
                  name: 'Size',
                  type: 'single',
                  required: true,
                  options: [
                    { id: 'small', name: 'Small' },
                    { id: 'large', name: 'Large' }
                  ]
                },
                {
                  id: 'add-ons',
                  name: 'Add-ons',
                  type: 'multiple',
                  required: false,
                  options: [
                    { id: 'grilled-chicken', name: 'Grilled Chicken' },
                    { id: 'bacon', name: 'Bacon' },
                    { id: 'anchovies', name: 'Anchovies' }
                  ]
                }
              ],
              requiredModifiers: ['size']
            }
          ]
        },
        {
          id: 'mains',
          name: 'Main Courses',
          items: [
            {
              id: 'pasta-carbonara',
              name: 'Pasta Carbonara',
              description: 'Creamy pasta with bacon, eggs, and parmesan cheese',
              categoryId: 'mains',
              modifiers: [
                {
                  id: 'pasta-type',
                  name: 'Pasta Type',
                  type: 'single',
                  required: true,
                  options: [
                    { id: 'spaghetti', name: 'Spaghetti' },
                    { id: 'fettuccine', name: 'Fettuccine' },
                    { id: 'penne', name: 'Penne' }
                  ]
                },
                {
                  id: 'cooking',
                  name: 'Cooking Preference',
                  type: 'single',
                  required: false,
                  options: [
                    { id: 'al-dente', name: 'Al Dente' },
                    { id: 'well-done', name: 'Well Done' }
                  ]
                }
              ],
              requiredModifiers: ['pasta-type']
            },
            {
              id: 'grilled-salmon',
              name: 'Grilled Salmon',
              description: 'Atlantic salmon with seasonal vegetables',
              categoryId: 'mains',
              modifiers: [
                {
                  id: 'temperature',
                  name: 'Temperature',
                  type: 'single',
                  required: true,
                  options: [
                    { id: 'medium-rare', name: 'Medium Rare' },
                    { id: 'medium', name: 'Medium' },
                    { id: 'well-done', name: 'Well Done' }
                  ]
                },
                {
                  id: 'sides',
                  name: 'Sides',
                  type: 'multiple',
                  required: false,
                  options: [
                    { id: 'rice', name: 'Rice' },
                    { id: 'roasted-veggies', name: 'Roasted Vegetables' },
                    { id: 'mashed-potatoes', name: 'Mashed Potatoes' }
                  ]
                }
              ],
              requiredModifiers: ['temperature']
            }
          ]
        },
        {
          id: 'beverages',
          name: 'Beverages',
          items: [
            {
              id: 'coffee',
              name: 'Coffee',
              description: 'Freshly brewed coffee',
              categoryId: 'beverages',
              modifiers: [
                {
                  id: 'size',
                  name: 'Size',
                  type: 'single',
                  required: true,
                  options: [
                    { id: 'small', name: 'Small' },
                    { id: 'medium', name: 'Medium' },
                    { id: 'large', name: 'Large' }
                  ]
                },
                {
                  id: 'milk',
                  name: 'Milk Options',
                  type: 'single',
                  required: false,
                  options: [
                    { id: 'whole', name: 'Whole Milk' },
                    { id: 'skim', name: 'Skim Milk' },
                    { id: 'almond', name: 'Almond Milk' },
                    { id: 'oat', name: 'Oat Milk' }
                  ]
                }
              ],
              requiredModifiers: ['size']
            }
          ]
        }
      ]
    }
  },
  {
    id: '2',
    name: 'Fast Burger',
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
              description: 'Beef patty with lettuce, tomato, and onion',
              categoryId: 'burgers',
              modifiers: [
                {
                  id: 'cooking',
                  name: 'How would you like it cooked?',
                  type: 'single',
                  required: true,
                  options: [
                    { id: 'rare', name: 'Rare' },
                    { id: 'medium-rare', name: 'Medium Rare' },
                    { id: 'medium', name: 'Medium' },
                    { id: 'well-done', name: 'Well Done' }
                  ]
                },
                {
                  id: 'toppings',
                  name: 'Toppings',
                  type: 'multiple',
                  required: false,
                  options: [
                    { id: 'cheese', name: 'Cheese' },
                    { id: 'bacon', name: 'Bacon' },
                    { id: 'pickles', name: 'Pickles' },
                    { id: 'extra-sauce', name: 'Extra Sauce' }
                  ]
                }
              ],
              requiredModifiers: ['cooking']
            }
          ]
        }
      ]
    }
  },
  {
    id: '3',
    name: 'Sunset Marquis',
    isActive: false,
    menu: {
      categories: [
        {
          id: 'cocktails',
          name: 'Cocktails',
          items: [
            {
              id: 'rosey-cheeks',
              name: 'Rosey Cheeks',
              description: 'Bourbon, Grapefruit Juice, Monin Rose Syrup, Select Aperitivo',
              categoryId: 'cocktails',
              modifiers: []
            },
            {
              id: 'sunset-marquis-lemonade',
              name: 'Sunset Marquis Lemonade',
              description: 'Vodka, Lemonade, Sandeman\'s Ruby Port',
              categoryId: 'cocktails',
              modifiers: []
            },
            {
              id: 'choice-of-spritz',
              name: 'Choice of Spritz',
              description: 'Choice of Aperol/Campari/St Germain/Lillet Aperitif and Sparkling Brut',
              categoryId: 'cocktails',
              modifiers: [
                {
                  id: 'aperitif-choice',
                  name: 'Aperitif Choice',
                  type: 'single',
                  required: true,
                  options: [
                    { id: 'aperol', name: 'Aperol' },
                    { id: 'campari', name: 'Campari' },
                    { id: 'st-germain', name: 'St Germain' },
                    { id: 'lillet', name: 'Lillet' }
                  ]
                }
              ],
              requiredModifiers: ['aperitif-choice']
            },
            {
              id: 'spice-is-nice',
              name: 'Spice is Nice',
              description: 'Jalapeno Tequila, Lime Juice, Cointreau, Agave',
              categoryId: 'cocktails',
              modifiers: []
            },
            {
              id: 'island-vacation',
              name: 'Island Vacation',
              description: 'Coconut Rum, Bacardi Rum, Pineapple, Lime Juice',
              categoryId: 'cocktails',
              modifiers: []
            },
            {
              id: 'summers-tragedy',
              name: 'Summer\'s Tragedy',
              description: 'Gin, Lemon Juice, Juliette Liquor, Simple Syrup',
              categoryId: 'cocktails',
              modifiers: []
            },
            {
              id: 'sunset-caipirinha',
              name: 'Sunset Caipirinha',
              description: 'Cachaça, Sugar cane, Limes',
              categoryId: 'cocktails',
              modifiers: []
            }
          ]
        },
        {
          id: 'frose-rtd',
          name: 'Frosé & RTD Cocktails',
          items: [
            {
              id: 'frose-cocktails',
              name: 'Frosé Cocktails',
              description: 'Ask your server for details',
              categoryId: 'frose-rtd',
              modifiers: []
            },
            {
              id: 'rtd-cocktails',
              name: 'RTD Cocktails',
              description: 'Ask your server for details',
              categoryId: 'frose-rtd',
              modifiers: []
            }
          ]
        },
        {
          id: 'mocktails',
          name: 'Mocktails',
          items: [
            {
              id: 'detox',
              name: 'Detox',
              description: 'Orgeat, Orange Juice, Club Soda',
              categoryId: 'mocktails',
              modifiers: []
            },
            {
              id: 'zero-proof',
              name: 'Zero Proof',
              description: '"Aperol" Spritz - French Bloom & Giffard Aperitif',
              categoryId: 'mocktails',
              modifiers: []
            },
            {
              id: 'rosemary-paloma',
              name: 'Rosemary Paloma',
              description: 'Seedlips, Grapefruit, Rosemary Tonic',
              categoryId: 'mocktails',
              modifiers: []
            },
            {
              id: 'na-amaro-lucano',
              name: 'N/A Amaro Lucano',
              description: 'Served over Big Rock & Orange Twist',
              categoryId: 'mocktails',
              modifiers: []
            }
          ]
        },
        {
          id: 'non-alcoholic',
          name: 'Non-Alcoholic Beverages',
          items: [
            {
              id: 'green-detox',
              name: 'Green Detox',
              description: 'Fresh green juice blend',
              categoryId: 'non-alcoholic',
              modifiers: []
            },
            {
              id: 'gingersnap',
              name: 'Gingersnap',
              description: 'Ginger-based refreshing drink',
              categoryId: 'non-alcoholic',
              modifiers: []
            },
            {
              id: 'water',
              name: 'Water',
              description: 'Premium bottled water',
              categoryId: 'non-alcoholic',
              modifiers: [
                {
                  id: 'water-type',
                  name: 'Type',
                  type: 'single',
                  required: true,
                  options: [
                    { id: 'san-pellegrino', name: 'San Pellegrino Sparkling (500ml)' },
                    { id: 'acqua-panna', name: 'Acqua Panna Still (500ml)' }
                  ]
                }
              ],
              requiredModifiers: ['water-type']
            }
          ]
        },
        {
          id: 'beer',
          name: 'Beer',
          items: [
            {
              id: 'domestic-beer',
              name: 'Domestic Beer',
              description: 'Selection of domestic beers',
              categoryId: 'beer',
              modifiers: [
                {
                  id: 'domestic-beer-choice',
                  name: 'Beer Choice',
                  type: 'single',
                  required: true,
                  options: [
                    { id: 'allagash-white', name: 'Allagash White Belgian-Style Wheat' },
                    { id: 'budweiser', name: 'Budweiser' },
                    { id: 'golden-road-mango', name: 'Golden Road Mango Cart Wheat Ale' },
                    { id: 'lagunitas-ipa', name: 'Lagunitas IPA' },
                    { id: 'boomtown-mic', name: 'Boomtown Mic Czech Pilsner (16 oz)' },
                    { id: 'sincere-cider', name: 'Sincere Dry Cider (16 oz)' }
                  ]
                }
              ],
              requiredModifiers: ['domestic-beer-choice']
            },
            {
              id: 'import-beer',
              name: 'Import Beer',
              description: 'Selection of imported beers',
              categoryId: 'beer',
              modifiers: [
                {
                  id: 'import-beer-choice',
                  name: 'Beer Choice',
                  type: 'single',
                  required: true,
                  options: [
                    { id: 'heineken-zero', name: 'Heineken Zero' },
                    { id: 'stella-artois', name: 'Stella Artois' },
                    { id: 'corona-extra', name: 'Corona Extra' },
                    { id: 'guinness-draught', name: 'Guinness Draught' }
                  ]
                }
              ],
              requiredModifiers: ['import-beer-choice']
            }
          ]
        },
        {
          id: 'sparkling-wine',
          name: 'Sparkling Wine',
          items: [
            {
              id: 'sparkling-wine',
              name: 'Sparkling Wine',
              description: 'Premium sparkling wine selection',
              categoryId: 'sparkling-wine',
              modifiers: [
                {
                  id: 'sparkling-wine-choice',
                  name: 'Wine Choice',
                  type: 'single',
                  required: true,
                  options: [
                    { id: 'nicolas-feuillatte', name: 'Nicolas Feuillatte Brut NV, FR' },
                    { id: 'bouvet-ladubay', name: 'Bouvet Ladubay Brut, Loire, FR' },
                    { id: 'surfrider-rose', name: 'Surfrider Sparkling Rosé NV, CA' },
                    { id: 'veuve-clicquot', name: 'Veuve Clicquot "Yellow Label" Brut (375ml)' }
                  ]
                },
                {
                  id: 'sparkling-serving-size',
                  name: 'Serving Size',
                  type: 'single',
                  required: true,
                  options: [
                    { id: 'glass', name: 'Glass' },
                    { id: 'bottle', name: 'Bottle' }
                  ]
                }
              ],
              requiredModifiers: ['sparkling-wine-choice', 'sparkling-serving-size']
            },
            {
              id: 'organic-sparkling-na',
              name: 'Organic Sparkling Wine (Alcohol Free)',
              description: 'Non-alcoholic sparkling wine options',
              categoryId: 'sparkling-wine',
              modifiers: [
                {
                  id: 'organic-sparkling-choice',
                  name: 'Wine Choice',
                  type: 'single',
                  required: true,
                  options: [
                    { id: 'french-bloom-blanc', name: 'French Bloom Le Blanc, FR' },
                    { id: 'french-bloom-rose', name: 'French Bloom Le Rosé, FR' }
                  ]
                },
                {
                  id: 'organic-serving-size',
                  name: 'Serving Size',
                  type: 'single',
                  required: true,
                  options: [
                    { id: 'glass', name: 'Glass' },
                    { id: 'bottle', name: 'Bottle' }
                  ]
                }
              ],
              requiredModifiers: ['organic-sparkling-choice', 'organic-serving-size']
            }
          ]
        },
        {
          id: 'white-wine',
          name: 'White Wine',
          items: [
            {
              id: 'light-medium-white',
              name: 'Light/Medium Body White Wines',
              description: 'Crisp and refreshing white wines',
              categoryId: 'white-wine',
              modifiers: [
                {
                  id: 'light-white-choice',
                  name: 'Wine Choice',
                  type: 'single',
                  required: true,
                  options: [
                    { id: 'fess-parker-riesling', name: 'Riesling, Fess Parker, Santa Barbara, CA' },
                    { id: 'terra-alpina-pinot', name: 'Pinot Grigio, Terra Alpina, Dolomiti, IT' },
                    { id: 'frenzy-sauvignon', name: 'Sauvignon Blanc, Frenzy, Marlborough' }
                  ]
                },
                {
                  id: 'light-white-serving',
                  name: 'Serving Size',
                  type: 'single',
                  required: true,
                  options: [
                    { id: 'glass', name: 'Glass' },
                    { id: 'bottle', name: 'Bottle' }
                  ]
                }
              ],
              requiredModifiers: ['light-white-choice', 'light-white-serving']
            },
            {
              id: 'fuller-body-white',
              name: 'Fuller Body White Wines',
              description: 'Rich and complex white wines',
              categoryId: 'white-wine',
              modifiers: [
                {
                  id: 'fuller-white-choice',
                  name: 'Wine Choice',
                  type: 'single',
                  required: true,
                  options: [
                    { id: 'villa-sparina-cortese', name: 'Cortese, Villa Sparina, Gavi, Piedmont, IT' },
                    { id: 'onehope-chardonnay', name: 'Chardonnay, OneHope, CA' }
                  ]
                },
                {
                  id: 'fuller-white-serving',
                  name: 'Serving Size',
                  type: 'single',
                  required: true,
                  options: [
                    { id: 'glass', name: 'Glass' },
                    { id: 'bottle', name: 'Bottle' }
                  ]
                }
              ],
              requiredModifiers: ['fuller-white-choice', 'fuller-white-serving']
            }
          ]
        },
        {
          id: 'rose-wine',
          name: 'Rosé Wine',
          items: [
            {
              id: 'rose-wine',
              name: 'Rosé Wine',
              description: 'Premium rosé wine selection',
              categoryId: 'rose-wine',
              modifiers: [
                {
                  id: 'rose-wine-choice',
                  name: 'Wine Choice',
                  type: 'single',
                  required: true,
                  options: [
                    { id: 'finco-nueva-rosado', name: 'Finco Nueva Rosado, Rioja, SP' },
                    { id: 'saint-pons-rose', name: 'Saint Pons Rosé, Côtes de Provence, FR' }
                  ]
                },
                {
                  id: 'rose-serving-size',
                  name: 'Serving Size',
                  type: 'single',
                  required: true,
                  options: [
                    { id: 'glass', name: 'Glass' },
                    { id: 'bottle', name: 'Bottle' }
                  ]
                }
              ],
              requiredModifiers: ['rose-wine-choice', 'rose-serving-size']
            }
          ]
        },
        {
          id: 'red-wine',
          name: 'Red Wine',
          items: [
            {
              id: 'pinot-noir',
              name: 'Pinot Noir',
              description: 'Elegant and smooth Pinot Noir',
              categoryId: 'red-wine',
              modifiers: [
                {
                  id: 'pinot-noir-choice',
                  name: 'Wine Choice',
                  type: 'single',
                  required: true,
                  options: [
                    { id: 'au-bon-climat', name: 'Au Bon Climat, Santa Barbara, CA' }
                  ]
                },
                {
                  id: 'pinot-serving-size',
                  name: 'Serving Size',
                  type: 'single',
                  required: true,
                  options: [
                    { id: 'glass', name: 'Glass' },
                    { id: 'bottle', name: 'Bottle' }
                  ]
                }
              ],
              requiredModifiers: ['pinot-noir-choice', 'pinot-serving-size']
            },
            {
              id: 'cool-reds',
              name: 'Cool Reds',
              description: 'Medium-bodied red wines',
              categoryId: 'red-wine',
              modifiers: [
                {
                  id: 'cool-reds-choice',
                  name: 'Wine Choice',
                  type: 'single',
                  required: true,
                  options: [
                    { id: 'chianti-classico-felsina', name: 'Chianti Classico, Felsina Berardenga, IT' }
                  ]
                },
                {
                  id: 'cool-reds-serving',
                  name: 'Serving Size',
                  type: 'single',
                  required: true,
                  options: [
                    { id: 'glass', name: 'Glass' },
                    { id: 'bottle', name: 'Bottle' }
                  ]
                }
              ],
              requiredModifiers: ['cool-reds-choice', 'cool-reds-serving']
            },
            {
              id: 'cabernet-blends',
              name: 'Cabernet Sauvignon & Blends',
              description: 'Bold and full-bodied red wines',
              categoryId: 'red-wine',
              modifiers: [
                {
                  id: 'cabernet-choice',
                  name: 'Wine Choice',
                  type: 'single',
                  required: true,
                  options: [
                    { id: 'chateau-bellgrave', name: 'Chateau Bellgrave, St. Emilion, Bordeaux' },
                    { id: 'onehope-red-blend', name: 'OneHope Red Blend, CA' }
                  ]
                },
                {
                  id: 'cabernet-serving',
                  name: 'Serving Size',
                  type: 'single',
                  required: true,
                  options: [
                    { id: 'glass', name: 'Glass' },
                    { id: 'bottle', name: 'Bottle' }
                  ]
                }
              ],
              requiredModifiers: ['cabernet-choice', 'cabernet-serving']
            }
          ]
        },
        {
          id: 'appetizers',
          name: 'Appetizers',
          items: [
            {
              id: 'togarashi-potato-chips',
              name: 'Togarashi Potato Chips',
              description: 'Spicy onion dip (Gluten Free, Vegetarian)',
              categoryId: 'appetizers',
              modifiers: []
            },
            {
              id: 'guacamole',
              name: 'Guacamole',
              description: 'Red chile sauce, toasted pepita, tostadas (Gluten Free, Vegan)',
              categoryId: 'appetizers',
              modifiers: []
            },
            {
              id: 'chilled-colossal-prawns',
              name: 'Chilled Colossal Prawns',
              description: 'Yuzu kosho-cocktail sauce (Gluten Free)',
              categoryId: 'appetizers',
              modifiers: []
            },
            {
              id: 'little-gem-caesar',
              name: 'Little Gem Caesar',
              description: 'Black pepper, white anchovy, croutons',
              categoryId: 'appetizers',
              modifiers: []
            },
            {
              id: 'sunset-spread',
              name: 'Sunset Spread',
              description: 'Coconut yogurt tzatziki, edamame hummus, beet muhammara, crudité, olives, pita (Vegetarian)',
              categoryId: 'appetizers',
              modifiers: []
            }
          ]
        },
        {
          id: 'entrees',
          name: 'Entrees',
          items: [
            {
              id: 'alta-loma-club',
              name: 'Alta Loma Club Sandwich',
              description: 'Roasted turkey, bacon, bibb lettuce, tomato, chipotle',
              categoryId: 'entrees',
              modifiers: []
            },
            {
              id: 'sunset-cobb',
              name: 'Sunset Cobb',
              description: 'Chicken, avocado, bacon, blue cheese, egg (Gluten Free)',
              categoryId: 'entrees',
              modifiers: []
            },
            {
              id: 'house-ground-veggie-burger',
              name: 'House Ground Veggie Burger',
              description: 'Napa cabbage, spicy cashew mayo, secret sauce, togarashi fries (Vegan)',
              categoryId: 'entrees',
              modifiers: []
            },
            {
              id: 'sunset-wagyu-cheeseburger',
              name: 'Sunset Wagyu Cheeseburger',
              description: 'Smoked pickle dressing, bacon, aged cheddar, lettuce, tomato',
              categoryId: 'entrees',
              modifiers: [
                {
                  id: 'temperature',
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
                }
              ],
              requiredModifiers: ['temperature']
            }
          ]
        },
        {
          id: 'dessert',
          name: 'Dessert',
          items: [
            {
              id: 'warm-chocolate-chip-cookies',
              name: 'Warm Chocolate Chip Cookies',
              description: 'Freshly baked warm chocolate chip cookies',
              categoryId: 'dessert',
              modifiers: []
            }
          ]
        }
      ]
    }
  }
];