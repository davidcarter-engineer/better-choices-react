/*
  --- COMPONENT: FeaturedRestaurants ---
  This component imports the restaurant data and renders a RestaurantCard
  for each restaurant using the .map() method.

  .map() loops through an array and returns a new array of JSX elements.
  React then displays each element on the page.

  The "key" prop is required when rendering lists — it helps React
  track which items changed, were added, or removed.
*/

import restaurants from "../data/restaurants";
import RestaurantCard from "./RestaurantCard";

function FeaturedRestaurants() {
  return (
    <section className="featured-restaurants" id="restaurants">
      <div className="container">
        <h3>Featured Restaurants</h3>
        <div className="restaurant-grid">
          {/* Loop through the restaurants array and render a card for each one */}
          {restaurants.map((restaurant, index) => (
            // Pass each property as a prop to RestaurantCard
            <RestaurantCard
              key={index}
              name={restaurant.name}
              healthyScore={restaurant.healthyScore}
              recommendedMeal={restaurant.recommendedMeal}
              calories={restaurant.calories}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedRestaurants;
