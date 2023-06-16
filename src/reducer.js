import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  items: [],
  error: null
};

export const fetchItems = createAsyncThunk(
  "fetchItems",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch("http://localhost:1234/itemlist");
      const data = await res.json();
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const addItems = createAsyncThunk(
  "addItems",
  async (itemData, { rejectWithValue }) => {
    try {
      const res = await fetch("http://localhost:1234/itemlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(itemData)
      });
      const data = await res.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteItem = createAsyncThunk(
  "deleteItem",
  async (id, { rejectWithValue }) => {
    try {
      await fetch(`http://localhost:1234/itemlist/${id}`, {
        method: "DELETE"
      });
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const itemsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchItems.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchItems.fulfilled, (state, action) => {
      state.loading = false;
      state.items = action.payload;
    })
    .addCase(fetchItems.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(addItems.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(addItems.fulfilled, (state, action) => {
      state.loading = false;
      state.items.push(action.payload);
    })
    .addCase(addItems.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(deleteItem.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(deleteItem.fulfilled, (state, action) => {
      state.loading = false;
      state.items = state.items.filter((item) => item.id !== action.payload);
    })
    .addCase(deleteItem.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
});

export default itemsReducer;
