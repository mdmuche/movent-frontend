import { createSlice } from "@reduxjs/toolkit";
import { subscribeNewsletter } from "../thunks/newsletterThunks";

const newsletterSlice = createSlice({
  name: "newsletter",
  initialState: {
    loading: false,
    success: false,
    message: "",
    error: null,
  },
  reducers: {
    clearNewsletterState: (state) => {
      state.loading = false;
      state.success = false;
      state.message = "";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(subscribeNewsletter.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(subscribeNewsletter.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
      })
      .addCase(subscribeNewsletter.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearNewsletterState } = newsletterSlice.actions;

export default newsletterSlice.reducer;
