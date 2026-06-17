/*
  --- PAGE: FoodDiaryPage ---
  A form-based page for logging daily meals.

  --- Controlled Components ---
  In React, a "controlled component" is a form input whose value is
  driven by React state. The input displays whatever is in state,
  and the onChange handler updates state on every keystroke.
  This gives React full control over the form data.

  --- useState ---
  useState creates state variables that persist across re-renders.
  When state updates, React re-renders the component with the new values.
  We use it here for:
    - Individual form fields (mealName, foodItem, calories)
    - The diary entries array (entries)

  --- Form Submission ---
  We attach an onSubmit handler to the <form> element.
  e.preventDefault() stops the browser from reloading the page.
  After validation, we create a new entry and add it to state.

  --- Updating Arrays in React State ---
  Never mutate state directly (e.g., entries.push()).
  Instead, create a NEW array using the spread operator:
    setEntries([...entries, newEntry])
  This tells React that state changed and triggers a re-render.
*/

import { useState } from "react";

function FoodDiaryPage() {
  // Controlled component state — each input is tied to state
  const [mealName, setMealName] = useState("");
  const [foodItem, setFoodItem] = useState("");
  const [calories, setCalories] = useState("");

  // Array state to hold all diary entries
  const [entries, setEntries] = useState([]);

  // Validation error message
  const [error, setError] = useState("");

  // Form submission handler
  function handleSubmit(e) {
    // Prevent the browser from reloading the page
    e.preventDefault();

    // Validation: no empty fields
    if (!mealName.trim() || !foodItem.trim() || !calories.trim()) {
      setError("All fields are required.");
      return;
    }

    // Validation: calories must be a number
    if (isNaN(calories) || Number(calories) <= 0) {
      setError("Calories must be a positive number.");
      return;
    }

    // Clear any previous error
    setError("");

    // Create a new entry object
    const newEntry = {
      mealName: mealName.trim(),
      foodItem: foodItem.trim(),
      calories: Number(calories),
    };

    // Update array state using spread operator (never mutate directly)
    setEntries([...entries, newEntry]);

    // Reset form fields
    setMealName("");
    setFoodItem("");
    setCalories("");
  }

  // Calculate daily total calories from all entries
  const totalCalories = entries.reduce((sum, entry) => sum + entry.calories, 0);

  return (
    <section className="container page-section">
      <h2>📓 Food Diary</h2>
      <p>Track what you eat each day to build healthier habits.</p>

      {/* Diary Form */}
      <form className="diary-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="mealName">Meal Name</label>
          {/* Controlled input: value comes from state, onChange updates state */}
          <input
            id="mealName"
            type="text"
            placeholder="e.g., Breakfast"
            value={mealName}
            onChange={(e) => setMealName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="foodItem">Food Item</label>
          <input
            id="foodItem"
            type="text"
            placeholder="e.g., Grilled Chicken Sandwich"
            value={foodItem}
            onChange={(e) => setFoodItem(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="calories">Calories</label>
          <input
            id="calories"
            type="text"
            placeholder="e.g., 380"
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
          />
        </div>

        {/* Display validation error */}
        {error && <p className="form-error">{error}</p>}

        <button type="submit" className="btn-save">Save Meal</button>
      </form>

      {/* Daily Total */}
      <div className="diary-total">
        <strong>Daily Total Calories:</strong> {totalCalories}
      </div>

      {/* Diary Entries List */}
      {entries.length > 0 && (
        <div className="diary-entries">
          <h3>Today's Meals</h3>
          {entries.map((entry, index) => (
            <div key={index} className="diary-entry-card">
              <h4>{entry.mealName}</h4>
              <p>🥗 {entry.foodItem}</p>
              <p>🔥 {entry.calories} calories</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default FoodDiaryPage;
