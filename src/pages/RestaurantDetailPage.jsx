import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite } from "../store/favoritesSlice";
import restaurantsData from "../data/restaurants";

function RestaurantDetailPage() {
  const { slug } = useParams();
  const restaurant = restaurantsData.find((r) => r.slug === slug);
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.favorites);

  if (!restaurant) {
    return (
      <section className="page-section">
        <div className="container">
          <h2>Restaurant not found</h2>
          <Link to="/restaurants">← Back to Restaurants</Link>
        </div>
      </section>
    );
  }

  function isFavorite(mealName) {
    return favorites.some((item) => item.name === mealName);
  }

  function handleFavorite(item) {
    dispatch(addFavorite({
      name: item.meal,
      calories: item.calories,
      restaurant: restaurant.name,
    }));
  }

  return (
    <section className="page-section">
      <div className="container">
        <Link to="/restaurants">← Back to Restaurants</Link>
        <div className="restaurant-detail-header">
          <img src={restaurant.image} alt={restaurant.name} className="restaurant-detail-img" />
          <h2>{restaurant.name}</h2>
          <p>⭐ Healthy Score: {restaurant.healthyScore}/10</p>
        </div>
        <h3>Top 10 Healthiest Items</h3>
        <ol className="healthy-items-list">
          {restaurant.topHealthyItems.map((item, i) => (
            <li key={i} className="healthy-item">
              <span>{item.meal}</span>
              <span className="healthy-item-right">
                <span className="healthy-item-cal">{item.calories} cal</span>
                <button
                  className={isFavorite(item.meal) ? "btn-favorited" : "btn-favorite"}
                  onClick={() => handleFavorite(item)}
                  disabled={isFavorite(item.meal)}
                >
                  {isFavorite(item.meal) ? "✓ Saved" : "♡ Save"}
                </button>
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default RestaurantDetailPage;
