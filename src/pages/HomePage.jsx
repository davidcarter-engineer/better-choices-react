/*
  --- PAGE: HomePage ---
  This page displays the landing content:
  Hero, rotating image gallery, and a "Healthy Pick of the Day" section.

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

  The rotating image uses setInterval inside useEffect.
  We return a cleanup function to clear the interval when
  the component unmounts (prevents memory leaks).
*/

import { useState, useEffect } from "react";
import Hero from "../components/Hero";
import restaurantsData from "../data/restaurants";

// Array of image paths from the public/images folder
const images = [
  "/images/fastfood_chikfila.png",
  "/images/fastfood_chipotle.jpg",
  "/images/fastfood_mcdonalds.png",
  "/images/fastfood_subway.png",
  "/images/fastfood_tacobell.jpeg",
  "/images/fastfood_wendys.svg",
];

function HomePage() {
  const [healthyPick, setHealthyPick] = useState(null);

  // State to track which image is currently displayed
  const [currentImage, setCurrentImage] = useState(0);

  // State to track if the slideshow is playing or paused
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * restaurantsData.length);
    setHealthyPick(restaurantsData[randomIndex]);
  }, []);

  // useEffect with setInterval: rotate image every 3 seconds (only when playing)
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000);

    // Cleanup: clear the interval when paused or component unmounts
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <>
      <Hero />
      <section className="image-rotator">
        <div className="container">
          <div className="rotator-wrapper">
            <img
              src={images[currentImage]}
              alt="Fast food restaurant"
              className="rotator-image"
            />
            <button
              className="rotator-btn"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? "⏸ Pause" : "▶ Play"}
            </button>
          </div>
        </div>
      </section>
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
