/*
  --- PAGE: HomePage ---
  This page displays the landing content:
  Hero, About, and a "Healthy Pick of the Day" section.

  --- useState ---
  useState is a React Hook that lets a component "remember" data.
  It returns an array with two items:
    1. The current state value
    2. A function to update that value
  When the state changes, React re-renders the component.

  --- useEffect ---
  useEffect is a React Hook that runs code AFTER the component renders.
  It is used for "side effects" like loading data, timers, or subscriptions.
  The second argument (dependency array) controls WHEN it runs:
    [] = run once when the component first mounts (loads)
    [value] = run again whenever "value" changes
*/

import { useState, useEffect } from "react";
import Hero from "../components/Hero";
import About from "../components/About";
import restaurantsData from "../data/restaurants";

function HomePage() {
  // useState: create a state variable to hold the daily pick
  const [healthyPick, setHealthyPick] = useState(null);

  // useEffect: select a random healthy pick when the page loads
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * restaurantsData.length);
    setHealthyPick(restaurantsData[randomIndex]);
  }, []); // Empty array = runs only once on mount

  return (
    <>
      <Hero />
      <About />
      <section className="healthy-pick">
        <div className="container">
          <h3>🌿 Healthy Pick of the Day</h3>
          {healthyPick && (
            <div className="pick-card">
              <h4>{healthyPick.name}</h4>
              <p>🥗 Try: {healthyPick.recommendedMeal}</p>
              <p>🔥 {healthyPick.calories} calories</p>
              <p>⭐ Healthy Score: {healthyPick.healthyScore}/10</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default HomePage;
