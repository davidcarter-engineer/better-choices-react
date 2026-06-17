/*
  --- PAGE: RestaurantsPage ---
  Displays the full list of featured restaurants.
*/

import FeaturedRestaurants from "../components/FeaturedRestaurants";

function RestaurantsPage() {
  return (
    <section className="container">
      <h2>Restaurants</h2>
      <p>Browse healthier fast food options from popular restaurants.</p>
      <FeaturedRestaurants />
    </section>
  );
}

export default RestaurantsPage;
