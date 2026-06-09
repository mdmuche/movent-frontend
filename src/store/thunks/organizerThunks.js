import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  createEventRequest,
  getOrganizerDashboard,
  getOrganizerAnalytics,
} from "../../api/organizerApi";

export const createEvent = createAsyncThunk(
  "organizer/createEvent",

  async (formData, { rejectWithValue }) => {
    try {
      const response = await createEventRequest(formData);

      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create event",
      );
    }
  },
);

export const fetchOrganizerDashboard = createAsyncThunk(
  "organizer/fetchDashboard",
  async (_, thunkAPI) => {
    try {
      const res = await getOrganizerDashboard();
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch dashboard",
      );
    }
  },
);

export const fetchOrganizerAnalytics = createAsyncThunk(
  "organizer/fetchOrganizerAnalytics",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await getOrganizerAnalytics();
      return data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch analytics",
      );
    }
  },
);
