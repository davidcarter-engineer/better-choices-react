/*
  --- PAGE: RestaurantsPage ---
  Displays all restaurant cards using state and effect hooks.

  --- useState ---
  useState creates a state variable to hold data that can change.
  Here we store the restaurant list in state so React knows to
  re-render when the data is loaded.

  Example:
  const [restaurants, setRestaurants] = useState([]);
  - restaurants = the current value (starts as an empty array)
  - setRestaurants = function to update the value

  --- useEffect ---
  useEffect runs code after the component renders (mounts).
  We use it here to simulate loading data when the page first appears.
  The empty dependency array [] means "run this only once."

  Example:
  useEffect(() => {
    setRestaurants(restaurantsData);
  }, []);
*/

import { useState, useEffect } from "react";
import restaurantsData from "../data/restaurants";
import RestaurantCard from "../components/RestaurantCard";

function RestaurantsPage() {
  // useState: initialize restaurants as an empty array
  const [restaurants, setRestaurants] = useState([]);

  // useEffect: load restaurant data when the component mounts
  useEffect(() => {
    setRestaurants(restaurantsData);
  }, []); // Empty dependency array = run once on mount

  return (
    <section className="featured-restaurants">
      <div className="container">
        <h2>Restaurants</h2>
        <p>Browse healthier fast food options from popular restaurants.</p>
        <div className="restaurant-grid">
          {restaurants.map((restaurant, index) => (
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

export default RestaurantsPage;
