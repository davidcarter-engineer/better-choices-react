/*
  --- COMPONENT: RestaurantCard ---

  Props:
    - name, healthyScore, recommendedMeal, calories: display data
    - onFavorite: function to save to favorites
    - isFavorite: whether already saved
    - healthierOption: { meal, calories } — a healthier alternative
    - healthierTip: string — how to make the current meal healthier
*/

import { useState } from "react";

function RestaurantCard({ name, healthyScore, recommendedMeal, calories, onFavorite, isFavorite, healthierOption, healthierTip }) {
  const [showSuggestion, setShowSuggestion] = useState(false);

  return (
    <article className="restaurant-card">
      <h4>{name}</h4>
      <p className="card-detail">⭐ Healthy Score: {healthyScore}/10</p>
      <p className="card-detail">🥗 Try: {recommendedMeal}</p>
      <p className="card-detail">🔥 {calories} calories</p>

      <div className="card-actions">
        {onFavorite && (
          <button
            className={isFavorite ? "btn-favorited" : "btn-favorite"}
            onClick={onFavorite}
            disabled={isFavorite}
          >
            {isFavorite ? "✓ Saved" : "♡ Save to Favorites"}
          </button>
        )}

        {healthierOption && (
          <button
            className="btn-suggestion"
            onClick={() => setShowSuggestion(!showSuggestion)}
          >
            {showSuggestion ? "Hide Suggestion" : "🌱 Healthier Suggestion?"}
          </button>
        )}
      </div>

      {showSuggestion && healthierOption && (
        <div className="suggestion-panel">
          <p className="suggestion-alt">
            <strong>Try instead:</strong> {healthierOption.meal} — only {healthierOption.calories} cal
          </p>
          <p className="suggestion-tip">
            <strong>💡 Tip:</strong> {healthierTip}
          </p>
        </div>
      )}
    </article>
  );
}

export default RestaurantCard;
