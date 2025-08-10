# SERV-OR Menu JSON Import Format

## Overview
This document defines the JSON format for importing restaurant menus into the SERV-OR application. The format is designed to be simple, flexible, and comprehensive enough to handle complex menu structures with modifiers.

## Root Structure
```json
{
  "restaurantName": "Restaurant Name",
  "menu": {
    "categories": [
      // Category objects go here
    ]
  }
}
```

## Complete Example
```json
{
  "restaurantName": "Mario's Italian Bistro",
  "menu": {
    "categories": [
      {
        "name": "Appetizers",
        "items": [
          {
            "name": "Bruschetta",
            "description": "Toasted bread with tomatoes, basil, and garlic",
            "modifiers": [
              {
                "name": "Size",
                "type": "single",
                "required": true,
                "options": [
                  { "name": "Small (4 pieces)" },
                  { "name": "Large (8 pieces)" }
                ]
              }
            ]
          },
          {
            "name": "Caesar Salad",
            "description": "Romaine lettuce with parmesan cheese and croutons",
            "modifiers": [
              {
                "name": "Add Protein",
                "type": "single",
                "required": false,
                "options": [
                  { "name": "Grilled Chicken" },
                  { "name": "Grilled Shrimp" },
                  { "name": "No Protein" }
                ]
              },
              {
                "name": "Modifications",
                "type": "multiple",
                "required": false,
                "options": [
                  { "name": "No Croutons" },
                  { "name": "Extra Parmesan" },
                  { "name": "Dressing on Side" }
                ]
              }
            ]
          }
        ]
      },
      {
        "name": "Main Courses",
        "items": [
          {
            "name": "Margherita Pizza",
            "description": "Fresh mozzarella, tomatoes, and basil",
            "modifiers": [
              {
                "name": "Size",
                "type": "single",
                "required": true,
                "options": [
                  { "name": "Personal (10\")" },
                  { "name": "Medium (14\")" },
                  { "name": "Large (18\")" }
                ]
              },
              {
                "name": "Extra Toppings",
                "type": "multiple",
                "required": false,
                "options": [
                  { "name": "Extra Cheese" },
                  { "name": "Mushrooms" },
                  { "name": "Pepperoni" },
                  { "name": "Olives" }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
}
```

## Field Specifications

### Root Object
- **restaurantName** (string, required): Name of the restaurant
- **menu** (object, required): Contains the menu structure

### Menu Object
- **categories** (array, required): Array of category objects

### Category Object
- **name** (string, required): Display name of the category
- **items** (array, required): Array of menu item objects

### Menu Item Object
- **name** (string, required): Display name of the menu item
- **description** (string, required): Brief description of the item
- **modifiers** (array, optional): Array of modifier group objects. Can be empty array `[]`

### Modifier Object
- **name** (string, required): Display name of the modifier group (e.g., "Size", "Toppings")
- **type** (string, required): Either `"single"` (radio button behavior) or `"multiple"` (checkbox behavior)
- **required** (boolean, required): Whether customer must select from this group
- **options** (array, required): Array of modifier option objects

### Modifier Option Object
- **name** (string, required): Display name of the option
- **price** (number, optional): Additional price for this option (for future use)

## Validation Rules

### Required Fields
All fields marked as "required" must be present and non-empty.

### Data Types
- Strings must not be empty after trimming whitespace
- Arrays must contain at least one item (except for modifiers array which can be empty)
- Boolean values must be explicit `true` or `false`

### Business Logic Rules
1. **Category names** must be unique within a restaurant
2. **Item names** must be unique within a category
3. **Modifier names** must be unique within an item
4. **Option names** must be unique within a modifier group
5. **Required single modifiers** should have at least one option
6. **Modifier types** must be exactly "single" or "multiple"

## AI Assistant Instructions

When formatting menus for SERV-OR import, follow these guidelines:

1. **Always include required fields**: restaurantName, menu.categories array, and all nested required fields
2. **Use descriptive names**: Make category, item, and modifier names clear and customer-friendly
3. **Write helpful descriptions**: Item descriptions should be informative but concise
4. **Group logically**: 
   - Size options should use "single" type and be "required": true
   - Customizations should use "multiple" type and typically be "required": false
   - Add-ons should use "multiple" type and be "required": false
5. **Common modifier patterns**:
   - Size: single, required
   - Cooking temperature: single, required (for steaks, burgers)
   - Sides: single, required (when item comes with choice of side)
   - Add-ons/extras: multiple, not required
   - Dietary modifications: multiple, not required
6. **Handle complex items**: Break down complex items with many customizations into logical modifier groups
7. **Empty modifiers**: If an item has no customizations, use `"modifiers": []`

## Error Handling

The import system will validate:
- JSON syntax correctness
- Required field presence
- Data type correctness
- Uniqueness constraints
- Business logic rules

Invalid files will be rejected with specific error messages indicating what needs to be corrected.

## Tips for Menu Conversion

### From PDF/Text Menus
1. Group items into logical categories (Appetizers, Mains, Desserts, Beverages)
2. Extract item names and descriptions
3. Identify customization options and group them logically
4. Convert size options to required single modifiers
5. Convert add-ons to optional multiple modifiers

### From POS Systems
1. Map POS categories to SERV-OR categories
2. Convert POS modifiers to SERV-OR modifier format
3. Ensure required/optional settings match POS behavior
4. Test with actual menu items to verify accuracy

### Quality Checklist
- [ ] All required fields present
- [ ] No duplicate names within scope
- [ ] Logical modifier groupings
- [ ] Appropriate required/optional settings
- [ ] Clear, customer-friendly language
- [ ] JSON syntax valid