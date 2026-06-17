/*
  --- PAGE: FavoritesPage ---
  Displays saved favorite restaurants from the Redux store.

  --- useSelector ---
  Reads the favorites array from the Redux store.
  This component automatically re-renders when favorites change.

  --- useDispatch ---
  Dispatches the removeFavorite action to remove a restaurant
  from the centralized state.
*/

import { useSelector, useDispatch } from "react-redux";
import { removeFavorite } from "../store/favoritesSlice";

function FavoritesPage() {
  // useSelector: read favorites from the Redux store
  const favorites = useSelector((state) => state.favorites.favorites);

  // useDispatch: get dispatch function to send actions
  const dispatch = useDispatch();

  function handleRemove(name) {
    dispatch(removeFavorite(name));
  }

  return (
    <section className="container page-section">
      <h2>⭐ My Favorites</h2>
      <p>Your saved favorite healthy meals.</p>

      {favorites.length === 0 ? (
        <p className="placeholder-note">
          No favorites yet — go to Restaurants and save some!
        </p>
      ) : (
        <div className="restaurant-grid">
          {favorites.map((item, index) => (
            <article key={index} className="restaurant-card">
              <h4>{item.name}</h4>
              <p className="card-detail">⭐ Healthy Score: {item.healthyScore}/10</p>
              <p className="card-detail">🥗 Try: {item.recommendedMeal}</p>
              <p className="card-detail">🔥 {item.calories} calories</p>
              <button
                className="btn-remove"
                onClick={() => handleRemove(item.name)}
              >
                Remove
              </button>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default FavoritesPage;
