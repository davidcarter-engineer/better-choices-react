/*
  --- PAGE: HomePage ---
  This page displays the original landing content:
  Hero, About, and Featured Restaurants sections.
*/

import Hero from "../components/Hero";
import About from "../components/About";
import FeaturedRestaurants from "../components/FeaturedRestaurants";

function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <FeaturedRestaurants />
    </>
  );
}

export default HomePage;
