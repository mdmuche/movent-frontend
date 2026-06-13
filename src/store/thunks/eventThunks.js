import { createAsyncThunk } from "@reduxjs/toolkit";
import * as eventApi from "../../api/eventApi";

// Categories
export const fetchEventCategories = createAsyncThunk(
  "event/fetchEventCategories",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await eventApi.getEventCategories();
      return data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch categories",
      );
    }
  },
);
// All events
export const fetchEvents = createAsyncThunk(
  "events/fetchEvents",
  async (params, thunkAPI) => {
    try {
      const res = await eventApi.getAllEvents(params);

      return res.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch events",
      );
    }
  },
);

// Single event
export const fetchEvent = createAsyncThunk(
  "events/fetchEvent",
  async (slug, thunkAPI) => {
    try {
      const res = await eventApi.getEvent(slug);

      return res.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch event",
      );
    }
  },
);

// Trending events
export const fetchTrendingEvents = createAsyncThunk(
  "events/fetchTrendingEvents",
  async (params, thunkAPI) => {
    try {
      const res = await eventApi.getTrendingEvents(params);

      return res.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch trending events",
      );
    }
  },
);

// upcoming events in home
export const fetchUpcomingEventsInHome = createAsyncThunk(
  "events/fetchUpcomingEventsInHome",
  async (_, thunkAPI) => {
    try {
      const res = await eventApi.getUpcomingEventsInHome();

      return res.data.data.events;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch upcoming events",
      );
    }
  },
);

// Recommended events
export const fetchRecommendations = createAsyncThunk(
  "events/fetchRecommendations",
  async (params, thunkAPI) => {
    try {
      const res = await eventApi.getRecommendations(params);

      return res.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch recommendations",
      );
    }
  },
);

// Upcoming events
export const fetchUpcomingEvents = createAsyncThunk(
  "events/fetchUpcomingEvents",
  async (params, thunkAPI) => {
    try {
      const res = await eventApi.getUpcomingEvents(params);

      return res.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch upcoming events",
      );
    }
  },
);
