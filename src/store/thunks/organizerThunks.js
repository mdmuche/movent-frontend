import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  createEventRequest,
  getOrganizerDashboard,
  getOrganizerAnalytics,
  updateEventRequest,
  deleteEventRequest,
  getSingleEventRequest,
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

export const getSingleEvent = createAsyncThunk(
  "organizer/getSingleEvent",
  async (id, thunkAPI) => {
    try {
      const res = await getSingleEventRequest(id);
      return res.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch event",
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

// UPDATE EVENT
export const updateEvent = createAsyncThunk(
  "organizer/updateEvent",
  async ({ id, data }, thunkAPI) => {
    try {
      const res = await updateEventRequest(id, data);
      return res.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update event",
      );
    }
  },
);

// DELETE EVENT
export const deleteEvent = createAsyncThunk(
  "organizer/deleteEvent",
  async (id, thunkAPI) => {
    try {
      await deleteEventRequest(id);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to delete event",
      );
    }
  },
);
