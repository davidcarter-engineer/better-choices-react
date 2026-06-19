import { Link } from "react-router-dom";
import restaurantsData from "../data/restaurants";

function RestaurantsPage() {
  return (
    <section className="featured-restaurants">
      <div className="container">
        <h2>Restaurants</h2>
        <p>Click a restaurant to see the top 10 healthiest items.</p>
        <div className="restaurant-grid">
          {restaurantsData.map((restaurant) => (
            <Link
              key={restaurant.slug}
              to={`/restaurants/${restaurant.slug}`}
              className="restaurant-link-card"
            >
              <img
                src={restaurant.image}
                alt={restaurant.name}
                className="restaurant-link-img"
              />
              <h4>{restaurant.name}</h4>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default RestaurantsPage;
