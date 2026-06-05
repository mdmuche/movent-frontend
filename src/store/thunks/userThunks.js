import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getUserProfile,
  updateUserProfile,
  getDashboard,
  getSavedEvents,
  toggleSavedEvent,
  getUserActivity,
  updateUserNotifications,
  updateUserLanguage,
  closeUserAccount,
} from "../../api/userApi";

// Fetch user profile
export const fetchUserProfile = createAsyncThunk(
  "user/fetchProfile",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await getUserProfile();
      return data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch profile",
      );
    }
  },
);
// Fetch user dashboard data
export const fetchDashboard = createAsyncThunk(
  "user/fetchDashboard",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await getDashboard();
      return data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  },
);

// Fetch user saved events
export const fetchSavedEvents = createAsyncThunk(
  "user/fetchSavedEvents",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await getSavedEvents();
      return data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  },
);

// Toggle save/unsave event
export const toggleSaveEvent = createAsyncThunk(
  "user/toggleSaveEvent",
  async (eventId, { rejectWithValue }) => {
    try {
      const { data } = await toggleSavedEvent(eventId);
      return data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  },
);

// Fetch user activity
export const fetchUserActivity = createAsyncThunk(
  "user/fetchActivity",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await getUserActivity();
      return data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  },
);

export const updateProfile = createAsyncThunk(
  "user/updateProfile",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await updateUserProfile(payload);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  },
);

// Update notification preferences
export const updateNotifications = createAsyncThunk(
  "user/updateNotifications",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await updateUserNotifications(payload);
      return data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  },
);

// Update language preference
export const updateLanguage = createAsyncThunk(
  "user/updateLanguage",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await updateUserLanguage(payload);
      return data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  },
);

// Close account
export const closeAccount = createAsyncThunk(
  "user/closeAccount",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await closeUserAccount();
      return data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  },
);
