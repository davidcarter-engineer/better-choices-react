/*
  --- SLICE: diarySlice ---
  Manages the Food Diary state: entries and totalCalories.

  --- Reducers ---
  addMeal: Adds a new meal entry and updates totalCalories.
  removeMeal: Removes an entry by index and recalculates totalCalories.

  Redux Toolkit lets us "mutate" state directly inside reducers.
  Under the hood, Immer creates a new immutable state copy.
*/

import { createSlice } from "@reduxjs/toolkit";

const diarySlice = createSlice({
  name: "diary",
  initialState: {
    entries: [],
    totalCalories: 0,
  },
  reducers: {
    // Adds a meal entry and updates the calorie total
    addMeal(state, action) {
      // action.payload = { mealName, foodItem, calories }
      state.entries.push(action.payload);
      state.totalCalories += action.payload.calories;
    },
    // Removes a meal by index and recalculates total
    removeMeal(state, action) {
      // action.payload = index of the entry to remove
      const removed = state.entries[action.payload];
      state.entries.splice(action.payload, 1);
      state.totalCalories -= removed.calories;
    },
  },
});

// Export actions for dispatching from components
export const { addMeal, removeMeal } = diarySlice.actions;

// Export reducer for the store
export default diarySlice.reducer;
