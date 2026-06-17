/*
  --- SLICE: diarySlice ---
  Manages the Food Diary state organized by date.
  Uses localStorage to persist data across browser sessions.

  State shape:
  {
    entriesByDate: { "2025-01-15": [{ mealName, foodItem, calories }], ... },
    selectedDate: "2025-01-15"
  }
*/

import { createSlice } from "@reduxjs/toolkit";

// Load saved diary data from localStorage
function loadFromStorage() {
  try {
    const saved = localStorage.getItem("betterChoicesDiary");
    return saved ? JSON.parse(saved) : {};
  } catch {
    return {};
  }
}

// Save diary data to localStorage
function saveToStorage(entriesByDate) {
  try {
    localStorage.setItem("betterChoicesDiary", JSON.stringify(entriesByDate));
  } catch {
    // Storage full or unavailable — fail silently
  }
}

// Today's date in YYYY-MM-DD format
const today = new Date().toISOString().split("T")[0];

const diarySlice = createSlice({
  name: "diary",
  initialState: {
    entriesByDate: loadFromStorage(),
    selectedDate: today,
  },
  reducers: {
    // Sets the currently selected date (when user clicks a calendar day)
    setSelectedDate(state, action) {
      state.selectedDate = action.payload;
    },
    // Adds a meal to the selected date
    addMeal(state, action) {
      const date = state.selectedDate;
      if (!state.entriesByDate[date]) {
        state.entriesByDate[date] = [];
      }
      state.entriesByDate[date].push(action.payload);
      saveToStorage(state.entriesByDate);
    },
    // Removes a meal by index from the selected date
    removeMeal(state, action) {
      const date = state.selectedDate;
      if (state.entriesByDate[date]) {
        state.entriesByDate[date].splice(action.payload, 1);
        // Clean up empty dates
        if (state.entriesByDate[date].length === 0) {
          delete state.entriesByDate[date];
        }
        saveToStorage(state.entriesByDate);
      }
    },
  },
});

export const { setSelectedDate, addMeal, removeMeal } = diarySlice.actions;
export default diarySlice.reducer;
