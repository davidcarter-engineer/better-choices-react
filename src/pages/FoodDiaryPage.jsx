/*
  --- PAGE: FoodDiaryPage ---
  A form-based page for logging daily meals with:
  - Calendar for navigating and viewing past entries
  - Quick calorie lookup tool
  - Entries stored by date and persisted in localStorage
*/

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchDiaryEntries, addMealAPI, removeMealAPI } from "../store/diarySlice";
import DiaryCalendar from "../components/DiaryCalendar";

const API_KEY = "DEMO_KEY";
const BASE_URL = "https://api.nal.usda.gov/fdc/v1/foods/search";

// Tips for making common foods healthier
const healthierTips = [
  "Try grilling instead of frying to cut fat and calories.",
  "Ask for sauces and dressings on the side so you control how much you use.",
  "Swap white bread or buns for a lettuce wrap or whole grain option.",
  "Skip the cheese to save 100+ calories without losing much flavor.",
  "Choose water or unsweetened tea instead of soda to avoid empty calories.",
  "Add extra veggies — they fill you up with fewer calories.",
  "Go for a smaller portion size — you'll still enjoy it with fewer calories.",
  "Remove the top bun to cut carbs and calories in half.",
];

function FoodDiaryPage() {
  const [mealName, setMealName] = useState("");
  const [foodItem, setFoodItem] = useState("");
  const [calories, setCalories] = useState("");
  const [error, setError] = useState("");

  // Calorie lookup state
  const [lookupQuery, setLookupQuery] = useState("");
  const [lookupResults, setLookupResults] = useState([]);
  const [lookupLoading, setLookupLoading] = useState(false);
  const [lookupError, setLookupError] = useState("");

  // Read from Redux store
  const selectedDate = useSelector((state) => state.diary.selectedDate);
  const entries = useSelector((state) => state.diary.entries);
  const dispatch = useDispatch();

  // Fetch diary entries from API on mount
  useEffect(() => {
    dispatch(fetchDiaryEntries());
  }, [dispatch]);

  // Filter entries for the selected date
  const dailyEntries = entries.filter((e) => e.date === selectedDate);
  const totalCalories = dailyEntries.reduce((sum, entry) => sum + entry.calories, 0);

  // Format the selected date for display
  function formatDisplayDate(dateStr) {
    const [y, m, d] = dateStr.split("-");
    const date = new Date(y, m - 1, d);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

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

    dispatch(addMealAPI({
      date: selectedDate,
      mealName: mealName.trim(),
      foodItem: foodItem.trim(),
      calories: Number(calories),
    }));

    setMealName("");
    setFoodItem("");
    setCalories("");
  }

  function handleRemove(id) {
    dispatch(removeMealAPI(id));
  }

  async function handleLookup(e) {
    e.preventDefault();
    if (!lookupQuery.trim()) return;

    setLookupLoading(true);
    setLookupError("");
    setLookupResults([]);

    try {
      const url = `${BASE_URL}?api_key=${API_KEY}&query=${encodeURIComponent(lookupQuery)}&pageSize=5`;
      const response = await fetch(url);

      if (!response.ok) throw new Error("Request failed");

      const data = await response.json();

      if (!data.foods || data.foods.length === 0) {
        setLookupError("No results found. Try a different food.");
        setLookupLoading(false);
        return;
      }

      const results = data.foods.map((food) => {
        const energy = food.foodNutrients.find((n) => n.nutrientName === "Energy");
        return {
          name: food.description,
          calories: energy ? Math.round(energy.value) : 0,
        };
      });

      setLookupResults(results);
    } catch {
      setLookupError("Lookup failed. Please try again.");
    }
    setLookupLoading(false);
  }

  function handleUseResult(result) {
    setFoodItem(result.name);
    setCalories(String(result.calories));
  }

  // Healthier suggestion state: keyed by entry index
  const [suggestions, setSuggestions] = useState({});
  const [suggestionLoading, setSuggestionLoading] = useState({});

  async function handleHealthierSuggestion(index, foodName) {
    // If already loaded, just toggle visibility
    if (suggestions[index]) {
      setSuggestions((prev) => {
        const copy = { ...prev };
        delete copy[index];
        return copy;
      });
      return;
    }

    setSuggestionLoading((prev) => ({ ...prev, [index]: true }));

    try {
      // Search for healthier version of the food
      const query = `${foodName} grilled low fat`;
      const url = `${BASE_URL}?api_key=${API_KEY}&query=${encodeURIComponent(query)}&pageSize=3`;
      const response = await fetch(url);
      const data = await response.json();

      let alternative = null;
      if (data.foods && data.foods.length > 0) {
        // Find a result with fewer calories than the original
        const originalEntry = entries[index];
        for (const food of data.foods) {
          const energy = food.foodNutrients.find((n) => n.nutrientName === "Energy");
          const cal = energy ? Math.round(energy.value) : 0;
          if (cal > 0 && cal < originalEntry.calories) {
            alternative = { name: food.description, calories: cal };
            break;
          }
        }
        // If nothing lower, just use the first result
        if (!alternative) {
          const food = data.foods[0];
          const energy = food.foodNutrients.find((n) => n.nutrientName === "Energy");
          alternative = {
            name: food.description,
            calories: energy ? Math.round(energy.value) : 0,
          };
        }
      }

      // Pick a random tip
      const tip = healthierTips[Math.floor(Math.random() * healthierTips.length)];

      setSuggestions((prev) => ({
        ...prev,
        [index]: { alternative, tip },
      }));
    } catch {
      setSuggestions((prev) => ({
        ...prev,
        [index]: { alternative: null, tip: "Try searching for a grilled or baked version of this food for fewer calories." },
      }));
    }

    setSuggestionLoading((prev) => ({ ...prev, [index]: false }));
  }

  return (
    <section className="container page-section">
      <h2>📓 Food Diary</h2>
      <p>Track what you eat each day to build healthier habits.</p>

      {/* Calendar */}
      <DiaryCalendar />

      {/* Selected date label */}
      <h3 className="diary-date-label">{formatDisplayDate(selectedDate)}</h3>

      <div className="diary-layout">
        {/* Diary Form */}
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

        {/* Quick Calorie Lookup */}
        <div className="calorie-lookup">
          <h4>🔍 Quick Calorie Lookup</h4>
          <form onSubmit={handleLookup}>
            <div className="form-group">
              <input
                type="text"
                placeholder="Search a food..."
                value={lookupQuery}
                onChange={(e) => setLookupQuery(e.target.value)}
              />
            </div>
            <button type="submit" className="btn-save" disabled={lookupLoading}>
              {lookupLoading ? "Searching..." : "Look Up"}
            </button>
          </form>

          {lookupError && <p className="form-error">{lookupError}</p>}

          {lookupResults.length > 0 && (
            <div className="lookup-results">
              {lookupResults.map((result, index) => (
                <div key={index} className="lookup-result-item">
                  <span className="lookup-result-name">{result.name}</span>
                  <span className="lookup-result-cal">{result.calories} cal</span>
                  <button
                    type="button"
                    className="btn-use"
                    onClick={() => handleUseResult(result)}
                  >
                    Use
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Daily Summary */}
      <div className="diary-total">
        <strong>Daily Total Calories:</strong> {totalCalories}
      </div>

      {/* Entries for selected date */}
      {dailyEntries.length > 0 && (
        <div className="diary-entries">
          <h3>Meals</h3>
          {dailyEntries.map((entry, index) => (
            <div key={entry._id} className="diary-entry-card">
              <h4>{entry.mealName}</h4>
              <p>🥗 {entry.foodItem}</p>
              <p>🔥 {entry.calories} calories</p>
              <div className="entry-actions">
                <button
                  className="btn-suggestion"
                  onClick={() => handleHealthierSuggestion(index, entry.foodItem)}
                  disabled={suggestionLoading[index]}
                >
                  {suggestionLoading[index]
                    ? "Loading..."
                    : suggestions[index]
                    ? "Hide Suggestion"
                    : "🌱 Healthier Suggestion?"}
                </button>
                <button
                  className="btn-remove"
                  onClick={() => handleRemove(entry._id)}
                >
                  Remove
                </button>
              </div>
              {suggestions[index] && (
                <div className="suggestion-panel">
                  {suggestions[index].alternative && (
                    <p className="suggestion-alt">
                      <strong>Try instead:</strong> {suggestions[index].alternative.name} — {suggestions[index].alternative.calories} cal
                    </p>
                  )}
                  <p className="suggestion-tip">
                    <strong>💡 Tip:</strong> {suggestions[index].tip}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {dailyEntries.length === 0 && (
        <p className="placeholder-note">No meals logged for this day.</p>
      )}
    </section>
  );
}

export default FoodDiaryPage;
