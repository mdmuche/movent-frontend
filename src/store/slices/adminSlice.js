import { createSlice } from "@reduxjs/toolkit";

import {
  getPlatformOverview,
  getEventQueue,
  getAllUsers,
  exportReport,
} from "../thunks/adminThunks";

const initialState = {
  overview: null,

  eventQueue: [],
  eventQueuePagination: null,

  users: [],
  usersPagination: null,

  loading: false,
  exportLoading: false,
  error: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      // OVERVIEW
      .addCase(getPlatformOverview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPlatformOverview.fulfilled, (state, action) => {
        state.loading = false;
        state.overview = action.payload.data;
      })
      .addCase(getPlatformOverview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // EVENT QUEUE
      .addCase(getEventQueue.pending, (state) => {
        state.loading = true;
      })
      .addCase(getEventQueue.fulfilled, (state, action) => {
        state.loading = false;

        state.eventQueue = action.payload.data?.events || [];
        state.eventQueuePagination = action.payload.data?.pagination || null;
      })
      .addCase(getEventQueue.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // USERS
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;

        state.users = action.payload.data?.users || [];
        state.usersPagination = action.payload.data?.pagination || null;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // REPORTS
      .addCase(exportReport.pending, (state) => {
        state.exportLoading = true;
      })
      .addCase(exportReport.fulfilled, (state) => {
        state.exportLoading = false;
      })
      .addCase(exportReport.rejected, (state, action) => {
        state.exportLoading = false;
        state.error = action.payload;
      });
  },
});

export default adminSlice.reducer;
