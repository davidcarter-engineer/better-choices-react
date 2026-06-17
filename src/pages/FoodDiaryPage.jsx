/*
  --- PAGE: FoodDiaryPage ---
  A form-based page for logging daily meals.
  Now uses Redux for diary entries so data persists across page navigation.

  --- Controlled Components ---
  Form inputs whose value is driven by local React state (useState).
  onChange updates state on every keystroke.

  --- useSelector ---
  Reads entries and totalCalories from the Redux diary slice.

  --- useDispatch ---
  Dispatches addMeal and removeMeal actions to update the store.
*/

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addMeal, removeMeal } from "../store/diarySlice";

function FoodDiaryPage() {
  // Local state for controlled form inputs
  const [mealName, setMealName] = useState("");
  const [foodItem, setFoodItem] = useState("");
  const [calories, setCalories] = useState("");
  const [error, setError] = useState("");

  // useSelector: read diary state from the Redux store
  const entries = useSelector((state) => state.diary.entries);
  const totalCalories = useSelector((state) => state.diary.totalCalories);

  // useDispatch: get dispatch function
  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();

    if (!mealName.trim() || !foodItem.trim() || !calories.trim()) {
      setError("All fields are required.");
      return;
    }

    if (isNaN(calories) || Number(calories) <= 0) {
      setError("Calories must be a positive number.");
      return;
    }

    setError("");

    // Dispatch addMeal action to the Redux store
    dispatch(addMeal({
      mealName: mealName.trim(),
      foodItem: foodItem.trim(),
      calories: Number(calories),
    }));

    // Reset form fields
    setMealName("");
    setFoodItem("");
    setCalories("");
  }

  function handleRemove(index) {
    dispatch(removeMeal(index));
  }

  return (
    <section className="container page-section">
      <h2>📓 Food Diary</h2>
      <p>Track what you eat each day to build healthier habits.</p>

      <form className="diary-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="mealName">Meal Name</label>
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

        {error && <p className="form-error">{error}</p>}

        <button type="submit" className="btn-save">Save Meal</button>
      </form>

      <div className="diary-total">
        <strong>Daily Total Calories:</strong> {totalCalories}
      </div>

      {entries.length > 0 && (
        <div className="diary-entries">
          <h3>Today's Meals</h3>
          {entries.map((entry, index) => (
            <div key={index} className="diary-entry-card">
              <h4>{entry.mealName}</h4>
              <p>🥗 {entry.foodItem}</p>
              <p>🔥 {entry.calories} calories</p>
              <button
                className="btn-remove"
                onClick={() => handleRemove(index)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default FoodDiaryPage;
