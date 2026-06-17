/*
  --- PAGE: NutritionLookupPage ---
  Searches the USDA FoodData Central API for nutrition information.

  --- Client-Server Communication Flow ---
  1. User types a food name and clicks "Search"
  2. Component dispatches the searchNutrition async thunk
  3. Redux dispatches "pending" → component shows "Loading..."
  4. fetch() sends an HTTP GET request to the USDA API (server)
  5. Server responds with JSON nutrition data
  6. Redux dispatches "fulfilled" → component displays results
     OR dispatches "rejected" → component displays error message

  --- useSelector ---
  Reads searchResults, loading, and error from the Redux nutrition slice.

  --- useDispatch ---
  Dispatches the searchNutrition async thunk when the user submits the form.
*/

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { searchNutrition, clearResults } from "../store/nutritionSlice";

function NutritionLookupPage() {
  // Local state for the controlled search input
  const [foodName, setFoodName] = useState("");

  // useSelector: read nutrition state from the Redux store
  const { searchResults, loading, error } = useSelector(
    (state) => state.nutrition
  );

  // useDispatch: get dispatch function to send async actions
  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();

    if (!foodName.trim()) return;

    // Dispatch the async thunk — Redux handles pending/fulfilled/rejected
    dispatch(searchNutrition(foodName.trim()));
  }

  function handleClear() {
    setFoodName("");
    dispatch(clearResults());
  }

  return (
    <section className="container page-section">
      <h2>🔍 Nutrition Lookup</h2>
      <p>Search the USDA database for nutritional information about any food.</p>

      {/* Search Form */}
      <form className="nutrition-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="foodName">Food Name</label>
          <input
            id="foodName"
            type="text"
            placeholder="e.g., grilled chicken breast"
            value={foodName}
            onChange={(e) => setFoodName(e.target.value)}
          />
        </div>
        <div className="nutrition-form-actions">
          <button type="submit" className="btn-save" disabled={loading}>
            {loading ? "Searching..." : "Search"}
          </button>
          {searchResults.length > 0 && (
            <button type="button" className="btn-clear" onClick={handleClear}>
              Clear
            </button>
          )}
        </div>
      </form>

      {/* Loading State */}
      {loading && <p className="nutrition-loading">Loading...</p>}

      {/* Error State */}
      {error && <p className="form-error nutrition-error">{error}</p>}

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div className="nutrition-results">
          <h3>Results</h3>
          {searchResults.map((food, index) => (
            <div key={index} className="nutrition-card">
              <h4>{food.name}</h4>
              <div className="nutrition-details">
                <span>🔥 Calories: {food.calories}</span>
                <span>💪 Protein: {food.protein}g</span>
                <span>🍞 Carbs: {food.carbs}g</span>
                <span>🧈 Fat: {food.fat}g</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default NutritionLookupPage;
