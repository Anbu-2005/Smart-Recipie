import React from 'react';
import '../styles/RecipeList.css';

const RecipeList = ({ recipes }) => {
  return (
    <div className="recipes">
      <h2>Recipes</h2>
      {recipes.length > 0 ? (
        <div className="recipe-grid">
          {recipes.map((recipe, index) => (
            <div key={index} className="recipe-card">
              <img
                src={recipe.image}
                alt={recipe.name}
                className="recipe-card-image"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
                }}
              />
              <div className="recipe-card-content">
                <h3 className="recipe-card-title">{recipe.name}</h3>
                <p className="recipe-card-ingredients">
                  Ingredients: {recipe.ingredients.join(', ')}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-recipes-message">No recipes match the selected ingredients.</p>
      )}
    </div>
  );
};

export default RecipeList;
