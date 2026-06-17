/*
  --- Redux Store ---
  The store is the single source of truth for the entire application's state.
  It holds ALL shared data in one central place so any component can access it.

  configureStore combines all slice reducers into one root reducer
  and sets up Redux DevTools automatically for debugging.

  Each key in the reducer object becomes a "section" of state:
    - state.favorites (managed by favoritesSlice)
    - state.diary (managed by diarySlice)
    - state.nutrition (managed by nutritionSlice)
*/

import { configureStore } from "@reduxjs/toolkit";
import favoritesReducer from "./favoritesSlice";
import diaryReducer from "./diarySlice";
import nutritionReducer from "./nutritionSlice";

const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    diary: diaryReducer,
    nutrition: nutritionReducer,
  },
});

export default store;
