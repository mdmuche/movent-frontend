import { createSlice } from "@reduxjs/toolkit";
import {
  fetchEvents,
  fetchEvent,
  fetchTrendingEvents,
  fetchRecommendations,
  fetchUpcomingEventsInHome,
  fetchUpcomingEvents,
  fetchEventCategories,
} from "../thunks/eventThunks";

const initialState = {
  categories: [],
  categoriesLoading: false,
  events: [],
  event: null,
  trendingEvents: [],
  recommendedEvents: [],
  upcomingEvents: [],
  upcomingEventsPagination: {},
  upcomingEventsLoading: false,
  upcomingEventsInHome: [],
  pagination: null,

  loading: false,
  error: null,
};

const eventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      // Categories
      .addCase(fetchEventCategories.pending, (state) => {
        state.categoriesLoading = true;
      })

      .addCase(fetchEventCategories.fulfilled, (state, action) => {
        state.categoriesLoading = false;
        state.categories = action.payload;
      })

      .addCase(fetchEventCategories.rejected, (state, action) => {
        state.categoriesLoading = false;
        state.error = action.payload;
      })

      // ALL EVENTS
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload.events;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // SINGLE EVENT
      .addCase(fetchEvent.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.event = action.payload;
      })
      .addCase(fetchEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // UPCOMING EVENTS
      .addCase(fetchUpcomingEvents.pending, (state) => {
        state.upcomingEventsLoading = true;
        state.error = null;
      })

      .addCase(fetchUpcomingEvents.fulfilled, (state, action) => {
        state.upcomingEvents = action.payload.events;
        state.upcomingEventsPagination = action.payload.pagination;
        state.upcomingEventsLoading = false;
      })

      .addCase(fetchUpcomingEvents.rejected, (state, action) => {
        state.upcomingEventsLoading = false;
        state.error = action.payload;
      })
      // TRENDING
      .addCase(fetchTrendingEvents.fulfilled, (state, action) => {
        state.trendingEvents = action.payload.events;
      })

      // RECOMMENDATIONS
      .addCase(fetchRecommendations.fulfilled, (state, action) => {
        state.recommendedEvents = action.payload.events;
      })

      // UPCOMING EVENTS IN HOME
      .addCase(fetchUpcomingEventsInHome.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUpcomingEventsInHome.fulfilled, (state, action) => {
        state.loading = false;
        state.upcomingEventsInHome = action.payload;
      })
      .addCase(fetchUpcomingEventsInHome.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default eventSlice.reducer;
