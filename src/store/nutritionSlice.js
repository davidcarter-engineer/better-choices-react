/*
  --- SLICE: nutritionSlice ---
  Manages nutrition search state: results, loading, and error.

  --- Client-Server Communication ---
  When the user searches for a food, the browser (client) sends an HTTP
  request to the USDA FoodData Central API (server). The server processes
  the request and sends back a JSON response with nutrition data.
  This is called client-server communication.

  --- API Requests ---
  We use the fetch() function to make HTTP requests to the USDA API.
  fetch() returns a Promise, so we use async/await to wait for the response.
  The API URL includes:
    - The endpoint (what resource we want)
    - Query parameters (search term, API key, page size)

  --- createAsyncThunk ---
  Redux Toolkit's createAsyncThunk handles async operations (like API calls).
  It automatically dispatches three action types:
    - pending:   dispatched when the request STARTS  → we set loading = true
    - fulfilled: dispatched when the request SUCCEEDS → we store the results
    - rejected:  dispatched when the request FAILS   → we store the error

  This pattern keeps loading states and errors in the Redux store so
  any component can react to them.

  --- async/await ---
  async/await is modern JavaScript syntax for working with Promises.
  "await" pauses execution until the Promise resolves, making async
  code look and read like synchronous code.
*/

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// USDA FoodData Central API key (free demo key)
const API_KEY = "DEMO_KEY";
const BASE_URL = "https://api.nal.usda.gov/fdc/v1/foods/search";

/*
  --- Async Thunk: searchNutrition ---
  This async action:
  1. Takes a food name as input
  2. Sends a GET request to the USDA API
  3. Parses the JSON response
  4. Extracts and returns nutrition data (calories, protein, carbs, fat)

  createAsyncThunk("sliceName/actionName", async function)
*/
export const searchNutrition = createAsyncThunk(
  "nutrition/searchNutrition",
  async (foodName, { rejectWithValue }) => {
    try {
      // Build the API URL with query parameters
      const url = `${BASE_URL}?api_key=${API_KEY}&query=${encodeURIComponent(foodName)}&pageSize=5`;

      // fetch() sends the HTTP GET request to the USDA server
      const response = await fetch(url);

      // Check if the server returned an error status
      if (!response.ok) {
        throw new Error("API request failed. Please try again.");
      }

      // Parse the JSON response body
      const data = await response.json();

      // If no foods found, return a user-friendly error
      if (!data.foods || data.foods.length === 0) {
        return rejectWithValue("No results found. Try a different food name.");
      }

      // Extract relevant nutrition data from each result
      const results = data.foods.map((food) => {
        // Helper to find a nutrient by its name
        const getNutrient = (name) => {
          const nutrient = food.foodNutrients.find(
            (n) => n.nutrientName === name
          );
          return nutrient ? Math.round(nutrient.value) : 0;
        };

        return {
          name: food.description,
          calories: getNutrient("Energy"),
          protein: getNutrient("Protein"),
          carbs: getNutrient("Carbohydrate, by difference"),
          fat: getNutrient("Total lipid (fat)"),
        };
      });

      return results;
    } catch (error) {
      // rejectWithValue sends the error message to the rejected case
      return rejectWithValue(
        error.message || "Network error. Check your connection."
      );
    }
  }
);

const nutritionSlice = createSlice({
  name: "nutrition",
  initialState: {
    searchResults: [],
    loading: false,
    error: null,
  },
  reducers: {
    // Clear previous results when starting a new search
    clearResults(state) {
      state.searchResults = [];
      state.error = null;
    },
  },
  /*
    --- extraReducers ---
    Handles the three lifecycle actions dispatched by createAsyncThunk:
    - pending: request started
    - fulfilled: request succeeded
    - rejected: request failed
  */
  extraReducers: (builder) => {
    builder
      // Loading state: request is in progress
      .addCase(searchNutrition.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.searchResults = [];
      })
      // Success state: store the results
      .addCase(searchNutrition.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload;
      })
      // Error state: store the error message
      .addCase(searchNutrition.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearResults } = nutritionSlice.actions;
export default nutritionSlice.reducer;
