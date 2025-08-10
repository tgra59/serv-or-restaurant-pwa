# Adding a New Restaurant - Step by Step Guide

## Quick Add Process

1. **Create JSON file** in `public/restaurants/`
2. **Add filename** to `RESTAURANT_FILES` array in `src/utils/restaurantLoader.ts`
3. **Commit and push** to GitHub
4. **Done!** Restaurant appears automatically

## Example: Adding "Joe's Pizza"

### Step 1: Create the JSON file
Create `public/restaurants/joes-pizza.json`:

```json
{
  "id": "4",
  "name": "Joe's Pizza",
  "isActive": true,
  "menu": {
    "categories": [
      {
        "id": "pizzas",
        "name": "Pizzas",
        "items": [
          {
            "id": "margherita",
            "name": "Margherita Pizza",
            "description": "Fresh mozzarella, tomato sauce, basil",
            "categoryId": "pizzas",
            "modifiers": [
              {
                "id": "size",
                "name": "Size",
                "type": "single",
                "required": true,
                "options": [
                  { "id": "small", "name": "Small (12\")" },
                  { "id": "large", "name": "Large (16\")" }
                ]
              }
            ],
            "requiredModifiers": ["size"]
          }
        ]
      }
    ]
  }
}
```

### Step 2: Update the loader
Edit `src/utils/restaurantLoader.ts` and add the filename:

```typescript
const RESTAURANT_FILES = [
  'bistro-garden.json',
  'fast-burger.json',
  'sunset-marquis.json',
  'joes-pizza.json'  // <- Add this line
];
```

### Step 3: Deploy
```bash
git add .
git commit -m "Add Joe's Pizza restaurant menu"
git push origin main
```

## Tips
- **Unique IDs:** Ensure all IDs are unique within their scope
- **Required Modifiers:** List all modifier IDs that must be selected
- **File Naming:** Use kebab-case (lowercase-with-dashes.json)
- **Testing:** Check your JSON syntax with a validator first

## Benefits of This System
- ✅ **No code changes** needed for new menus
- ✅ **Version controlled** restaurant configurations
- ✅ **Easy collaboration** - anyone can add restaurants
- ✅ **Automatic deployment** via GitHub Actions
- ✅ **Rollback capability** if issues occur