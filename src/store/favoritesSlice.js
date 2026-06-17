/*
  --- SLICE: favoritesSlice ---

  --- What is a Slice? ---
  A slice is a piece of the Redux store that manages ONE part of state.
  It bundles together:
    - Initial state (the starting data)
    - Reducers (functions that update the state)
    - Actions (automatically generated from reducer names)

  --- Reducers ---
  Reducers describe HOW state changes in response to an action.
  Redux Toolkit uses Immer under the hood, so we can write code that
  "mutates" state directly (e.g., state.favorites.push()), and Immer
  will produce a new immutable copy behind the scenes.

  --- Actions ---
  Actions are objects that describe WHAT happened.
  Redux Toolkit auto-generates action creators from each reducer name.
  Example: favoritesSlice.actions.addFavorite
  Dispatching an action triggers the matching reducer.
*/

import { createSlice } from "@reduxjs/toolkit";

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    favorites: [],
  },
  reducers: {
    // Adds a restaurant to favorites
    addFavorite(state, action) {
      // action.payload = the restaurant object passed when dispatching
      // Only add if not already in favorites (prevent duplicates)
      const exists = state.favorites.find(
        (item) => item.name === action.payload.name
      );
      if (!exists) {
        state.favorites.push(action.payload);
      }
    },
    // Removes a restaurant from favorites by name
    removeFavorite(state, action) {
      // action.payload = the restaurant name to remove
      state.favorites = state.favorites.filter(
        (item) => item.name !== action.payload
      );
    },
  },
});

// Export actions so components can dispatch them
export const { addFavorite, removeFavorite } = favoritesSlice.actions;

// Export reducer so the store can use it
export default favoritesSlice.reducer;
