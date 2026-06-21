/*
  --- PAGE: FavoritesPage ---
  Displays saved favorites fetched from the Better Choices API.
  Favorites are stored in MongoDB and tied to the authenticated user.

  Uses removeFavoriteAPI to DELETE /api/favorites/:id when removing.
*/

import { useSelector, useDispatch } from "react-redux";
import { removeFavoriteAPI } from "../store/favoritesSlice";

function FavoritesPage() {
  const favorites = useSelector((state) => state.favorites.favorites);
  const loading = useSelector((state) => state.favorites.loading);
  const dispatch = useDispatch();

  function handleRemove(id) {
    dispatch(removeFavoriteAPI(id));
  }

  if (loading) {
    return (
      <section className="container page-section">
        <h2>⭐ My Favorites</h2>
        <p>Loading favorites...</p>
      </section>
    );
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
          {favorites.map((item) => (
            <article key={item._id} className="restaurant-card">
              <h4>{item.name}</h4>
              {item.restaurant && (
                <p className="card-detail">🏪 {item.restaurant}</p>
              )}
              {item.calories !== undefined && (
                <p className="card-detail">🔥 {item.calories} calories</p>
              )}
              {item.protein !== undefined && (
                <p className="card-detail">💪 Protein: {item.protein}g</p>
              )}
              {item.carbs !== undefined && (
                <p className="card-detail">🍞 Carbs: {item.carbs}g</p>
              )}
              {item.fat !== undefined && (
                <p className="card-detail">🧈 Fat: {item.fat}g</p>
              )}
              {item.healthyScore !== undefined && (
                <p className="card-detail">⭐ Score: {item.healthyScore}/10</p>
              )}
              <button
                className="btn-remove"
                onClick={() => handleRemove(item._id)}
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
