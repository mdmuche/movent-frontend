import { createSlice } from "@reduxjs/toolkit";

import { createEvent } from "../thunks/organizerThunks";

const initialState = {
  loading: false,
  error: null,
  success: false,
};

const organizerSlice = createSlice({
  name: "organizer",

  initialState,

  reducers: {
    resetOrganizerState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(createEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(createEvent.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })

      .addCase(createEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetOrganizerState } = organizerSlice.actions;

export default organizerSlice.reducer;
