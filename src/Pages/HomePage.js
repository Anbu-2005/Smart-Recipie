import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/HomePage.css';
import RecipeList from './RecipeList';

const HomePage = () => {
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [ingredientSearch, setIngredientSearch] = useState('');  // New state for ingredient search

  const ingredientCategories = {
    'Pantry Essentials': [
      'Butter', 'Egg', 'Garlic', 'Milk', 'Onion', 'Sugar', 'Flour', 'Olive Oil',
      'Salt', 'Pepper', 'Vinegar', 'Rice', 'Pasta', 'Canned Tomatoes', 'Soy Sauce',
      'Honey', 'Ketchup', 'Mustard', 'Lemon', 'Coconut Milk'
    ],
    'Vegetables & Greens': [
      'Tomato', 'Lettuce', 'Cucumber', 'Spinach', 'Carrot', 'Broccoli', 'Cauliflower',
      'Zucchini', 'Kale', 'Bell Pepper', 'Brussels Sprouts', 'Avocado', 'Asparagus',
      'Squash', 'Sweet Potato', 'Eggplant', 'Chard', 'Peas', 'Mushrooms', 'Cabbage'
    ],
    'Mushrooms': [
      'Shiitake', 'Portobello', 'Button Mushroom', 'Oyster Mushroom', 'Enoki',
      'Chanterelle', 'King Oyster', 'Cremini', 'Maitake', 'Porcini', 'Morel', 'Lion’s Mane'
    ],
    'Fruits': [
      'Apple', 'Banana', 'Orange', 'Grapes', 'Strawberries', 'Blueberries', 'Pineapple',
      'Mango', 'Papaya', 'Peach', 'Plum', 'Apricot', 'Pear', 'Melon', 'Watermelon', 'Kiwi',
      'Cherries', 'Raspberries', 'Blackberries', 'Lemon', 'Lime'
    ],
    'Cheeses': [
      'Mozzarella', 'Cheddar', 'Parmesan', 'Gouda', 'Brie', 'Camembert', 'Feta', 'Ricotta',
      'Cream Cheese', 'Goat Cheese', 'Gruyère', 'Swiss', 'Blue Cheese', 'Mascarpone', 'Manchego',
      'Pecorino', 'Provolone', 'Colby', 'Monterey Jack'
    ],
    'Dairy & Eggs': [
      'Yogurt', 'Cream', 'Egg', 'Milk', 'Heavy Cream', 'Sour Cream', 'Cottage Cheese', 'Buttermilk',
      'Eggnog', 'Almond Milk', 'Coconut Milk', 'Goat Milk', 'Ricotta Cheese', 'Skim Milk', 'Ice Cream',
      'Butter Milk', 'Clotted Cream', 'Egg White'
    ],
    'Oils & Fats': [
      'Vegetable Oil', 'Coconut Oil', 'Butter', 'Olive Oil', 'Avocado Oil', 'Canola Oil', 'Sunflower Oil',
      'Sesame Oil', 'Peanut Oil', 'Almond Oil', 'Ghee', 'Walnut Oil', 'Hazelnut Oil', 'Flaxseed Oil',
      'Hemp Oil', 'Macadamia Oil', 'Soybean Oil'
    ],
    'Herbs & Spices': [
      'Basil', 'Cilantro', 'Parsley', 'Rosemary', 'Thyme', 'Oregano', 'Sage', 'Mint', 'Dill',
      'Chives', 'Tarragon', 'Bay Leaves', 'Lavender', 'Cumin', 'Turmeric', 'Paprika', 'Cinnamon',
      'Cloves', 'Nutmeg', 'Ginger', 'Coriander'
    ],
    'Legumes & Beans': [
      'Chickpeas', 'Lentils', 'Black Beans', 'Kidney Beans', 'Pinto Beans', 'Garbanzo Beans', 'Green Beans',
      'Edamame', 'Soybeans', 'Peas', 'Mung Beans', 'Lima Beans', 'Split Peas', 'Fava Beans', 'Black-eyed Peas'
    ],
    'Sugars & Sweeteners': [
      'Sugar', 'Brown Sugar', 'Honey', 'Maple Syrup', 'Agave Syrup', 'Molasses', 'Stevia', 'Coconut Sugar',
      'Date Syrup', 'Corn Syrup', 'Powdered Sugar', 'Syrup', 'Xylitol', 'Monk Fruit Sweetener'
    ]
  };
  

  useEffect(() => {
    axios
      .get('http://localhost:5000/recipes')
      .then((response) => {
        setRecipes(response.data);
      })
      .catch((error) => {
        console.error('Error fetching recipes:', error);
      });
  }, []);

  const handleIngredientClick = (ingredient) => {
    setSelectedIngredients((prevSelected) =>
      prevSelected.includes(ingredient)
        ? prevSelected.filter((item) => item !== ingredient)
        : [...prevSelected, ingredient]
    );
  };

  const filteredRecipes = recipes.filter(
    (recipe) =>
      selectedIngredients.every((ingredient) => recipe.ingredients.includes(ingredient)) &&
      recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter ingredients based on the search query
  const filteredIngredients = Object.entries(ingredientCategories).reduce((acc, [category, ingredients]) => {
    const filtered = ingredients.filter((ingredient) =>
      ingredient.toLowerCase().includes(ingredientSearch.toLowerCase())
    );
    if (filtered.length > 0) {
      acc[category] = filtered;
    }
    return acc;
  }, {});

  return (
    <div className="homepage">
      <div className="main-content">
        <div className="ingredients-section">
          <h2 className="section-header">Select Ingredients</h2>

          {/* Ingredient search input */}
          <div className="ingredient-search">
            <input
              type="text"
              placeholder="Search ingredients..."
              value={ingredientSearch}
              onChange={(e) => setIngredientSearch(e.target.value)}
            />
          </div>

          {Object.entries(filteredIngredients).map(([category, ingredients]) => (
            <div key={category} className="ingredient-category">
              <h3 className="category-title">{category}</h3>
              <div className="ingredient-options">
                {ingredients.map((ingredient) => (
                  <div
                    key={ingredient}
                    className={`ingredient-item ${selectedIngredients.includes(ingredient) ? 'selected' : ''}`}
                    onClick={() => handleIngredientClick(ingredient)}
                  >
                    {ingredient}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="recipes-section">
          {/* Recipe search input */}
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search recipes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <RecipeList recipes={filteredRecipes} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
