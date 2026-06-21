/*
  --- SLICE: favoritesSlice ---
  Manages favorites state backed by the Better Choices API.

  All favorites are stored in MongoDB and fetched/saved via:
    GET  /api/favorites       — load user's favorites
    POST /api/favorites       — save a new favorite
    DELETE /api/favorites/:id  — remove a favorite

  The JWT token from localStorage is included in all requests.
  localStorage is no longer used to store favorites data.
*/

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = "http://localhost:5001";

function getToken() {
  return localStorage.getItem("token");
}

// GET /api/favorites — fetch all favorites for the authenticated user
export const fetchFavorites = createAsyncThunk(
  "favorites/fetchFavorites",
  async (_, { rejectWithValue }) => {
    const token = getToken();
    if (!token) return [];

    console.log("GET /api/favorites");
    try {
      const res = await fetch(`${API_URL}/api/favorites`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      console.log("GET /api/favorites response:", res.status, data);
      if (!res.ok) return rejectWithValue(data.message);
      return data;
    } catch (err) {
      console.error("GET /api/favorites error:", err);
      return rejectWithValue("Failed to fetch favorites");
    }
  }
);

// POST /api/favorites — save a new favorite
export const addFavoriteAPI = createAsyncThunk(
  "favorites/addFavoriteAPI",
  async (favoriteData, { rejectWithValue }) => {
    const token = getToken();
    if (!token) return rejectWithValue("Not authenticated");

    console.log("POST /api/favorites", favoriteData);
    try {
      const res = await fetch(`${API_URL}/api/favorites`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(favoriteData),
      });
      const data = await res.json();
      console.log("POST /api/favorites response:", res.status, data);
      if (!res.ok) return rejectWithValue(data.message);
      return data;
    } catch (err) {
      console.error("POST /api/favorites error:", err);
      return rejectWithValue("Failed to save favorite");
    }
  }
);

// DELETE /api/favorites/:id — remove a favorite
export const removeFavoriteAPI = createAsyncThunk(
  "favorites/removeFavoriteAPI",
  async (id, { rejectWithValue }) => {
    const token = getToken();
    if (!token) return rejectWithValue("Not authenticated");

    console.log("DELETE /api/favorites/" + id);
    try {
      const res = await fetch(`${API_URL}/api/favorites/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      console.log("DELETE /api/favorites response:", res.status, data);
      if (!res.ok) return rejectWithValue(data.message);
      return id;
    } catch (err) {
      console.error("DELETE /api/favorites error:", err);
      return rejectWithValue("Failed to remove favorite");
    }
  }
);

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    favorites: [],
    loading: false,
  },
  reducers: {
    clearFavorites(state) {
      state.favorites = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.favorites = action.payload;
        state.loading = false;
      })
      .addCase(fetchFavorites.rejected, (state) => {
        state.loading = false;
      })
      .addCase(addFavoriteAPI.fulfilled, (state, action) => {
        state.favorites.push(action.payload);
      })
      .addCase(removeFavoriteAPI.fulfilled, (state, action) => {
        state.favorites = state.favorites.filter(
          (item) => item._id !== action.payload
        );
      });
  },
});

export const { clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
