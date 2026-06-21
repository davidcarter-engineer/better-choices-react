/*
  --- SLICE: diarySlice ---
  Manages Food Diary state backed by the Better Choices API (MongoDB).
  Entries sync between web and mobile for the same user account.

  API Endpoints:
    GET    /api/diary       — fetch all entries
    POST   /api/diary       — add a new entry
    DELETE /api/diary/:id   — remove an entry
*/

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = "http://localhost:5001";

function getToken() {
  return localStorage.getItem("token");
}

// Fetch all diary entries for the authenticated user
export const fetchDiaryEntries = createAsyncThunk(
  "diary/fetchEntries",
  async (_, { rejectWithValue }) => {
    const token = getToken();
    if (!token) return [];

    try {
      const res = await fetch(`${API_URL}/api/diary`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) return rejectWithValue(data.message);
      return data;
    } catch (err) {
      return rejectWithValue("Failed to fetch diary");
    }
  }
);

// Add a new diary entry
export const addMealAPI = createAsyncThunk(
  "diary/addMeal",
  async (mealData, { rejectWithValue }) => {
    const token = getToken();
    if (!token) return rejectWithValue("Not authenticated");

    try {
      const res = await fetch(`${API_URL}/api/diary`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(mealData),
      });
      const data = await res.json();
      if (!res.ok) return rejectWithValue(data.message);
      return data;
    } catch (err) {
      return rejectWithValue("Failed to save meal");
    }
  }
);

// Remove a diary entry
export const removeMealAPI = createAsyncThunk(
  "diary/removeMeal",
  async (id, { rejectWithValue }) => {
    const token = getToken();
    if (!token) return rejectWithValue("Not authenticated");

    try {
      const res = await fetch(`${API_URL}/api/diary/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) return rejectWithValue(data.message);
      return id;
    } catch (err) {
      return rejectWithValue("Failed to remove meal");
    }
  }
);

const today = new Date().toISOString().split("T")[0];

const diarySlice = createSlice({
  name: "diary",
  initialState: {
    entries: [],
    selectedDate: today,
    loading: false,
  },
  reducers: {
    setSelectedDate(state, action) {
      state.selectedDate = action.payload;
    },
    clearDiary(state) {
      state.entries = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDiaryEntries.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDiaryEntries.fulfilled, (state, action) => {
        state.entries = action.payload;
        state.loading = false;
      })
      .addCase(fetchDiaryEntries.rejected, (state) => {
        state.loading = false;
      })
      .addCase(addMealAPI.fulfilled, (state, action) => {
        state.entries.push(action.payload);
      })
      .addCase(removeMealAPI.fulfilled, (state, action) => {
        state.entries = state.entries.filter((e) => e._id !== action.payload);
      });
  },
});

export const { setSelectedDate, clearDiary } = diarySlice.actions;
export default diarySlice.reducer;
