import { createSlice } from "@reduxjs/toolkit";
import {
  createEvent,
  fetchOrganizerAnalytics,
  fetchOrganizerDashboard,
} from "../thunks/organizerThunks";

const initialState = {
  loading: false,

  // dashboard data
  dashboard: null,
  dashboardLoading: false,

  // organizer analytics
  analytics: null,
  analyticsLoading: false,
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
      // CREATE EVENT
      .addCase(createEvent.pending, (state) => {
        state.loading = true;
      })
      .addCase(createEvent.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(createEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ORGANIZER DASHBOARD OVERVIEW
      .addCase(fetchOrganizerDashboard.pending, (state) => {
        state.dashboardLoading = true;
      })
      .addCase(fetchOrganizerDashboard.fulfilled, (state, action) => {
        state.dashboardLoading = false;
        state.dashboard = action.payload;
      })
      .addCase(fetchOrganizerDashboard.rejected, (state, action) => {
        state.dashboardLoading = false;
        state.error = action.payload;
      })
      // organizer analytics
      .addCase(fetchOrganizerAnalytics.pending, (state) => {
        state.analyticsLoading = true;
      })

      .addCase(fetchOrganizerAnalytics.fulfilled, (state, action) => {
        state.analyticsLoading = false;
        state.analytics = action.payload;
      })

      .addCase(fetchOrganizerAnalytics.rejected, (state, action) => {
        state.analyticsLoading = false;
        state.error = action.payload;
      });
  },
});

export const { resetOrganizerState } = organizerSlice.actions;

export default organizerSlice.reducer;
