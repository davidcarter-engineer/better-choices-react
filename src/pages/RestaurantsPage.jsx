/*
  --- PAGE: RestaurantsPage ---
  Displays all restaurant cards and lets users save favorites.

  --- useDispatch ---
  A React-Redux hook that returns the store's dispatch function.
  We call dispatch(actionCreator(payload)) to send an action
  to the Redux store, which triggers the matching reducer.

  --- useSelector ---
  A React-Redux hook that reads data FROM the Redux store.
  It takes a selector function: (state) => state.sliceName.value
  The component re-renders whenever the selected value changes.
*/

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite } from "../store/favoritesSlice";
import restaurantsData from "../data/restaurants";
import RestaurantCard from "../components/RestaurantCard";

function RestaurantsPage() {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    setRestaurants(restaurantsData);
  }, []);

  // useDispatch: get the dispatch function to send actions to the store
  const dispatch = useDispatch();

  // useSelector: read favorites from the store to check which are saved
  const favorites = useSelector((state) => state.favorites.favorites);

  // Handler to dispatch the addFavorite action
  function handleAddFavorite(restaurant) {
    dispatch(addFavorite(restaurant));
  }

  // Check if a restaurant is already in favorites
  function isFavorite(name) {
    return favorites.some((item) => item.name === name);
  }

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
              onFavorite={() => handleAddFavorite(restaurant)}
              isFavorite={isFavorite(restaurant.name)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default RestaurantsPage;
