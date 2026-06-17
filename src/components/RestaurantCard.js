/*
  --- COMPONENT: RestaurantCard ---

  --- WHAT ARE PROPS? ---
  Props (short for "properties") are how we pass data from a parent component
  to a child component. They work like function arguments.

  This component now also receives:
    - onFavorite: a function to call when the user clicks "Save to Favorites"
    - isFavorite: a boolean indicating if this restaurant is already saved
*/

function RestaurantCard({ name, healthyScore, recommendedMeal, calories, onFavorite, isFavorite }) {
  return (
    <article className="restaurant-card">
      <h4>{name}</h4>
      <p className="card-detail">⭐ Healthy Score: {healthyScore}/10</p>
      <p className="card-detail">🥗 Try: {recommendedMeal}</p>
      <p className="card-detail">🔥 {calories} calories</p>
      {onFavorite && (
        <button
          className={isFavorite ? "btn-favorited" : "btn-favorite"}
          onClick={onFavorite}
          disabled={isFavorite}
        >
          {isFavorite ? "✓ Saved" : "♡ Save to Favorites"}
        </button>
      )}
    </article>
  );
}

export default RestaurantCard;
