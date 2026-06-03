import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  registerRequest,
  verifyEmailRequest,
  loginRequest,
  logoutRequest,
  forgotPasswordRequest,
  resetPasswordRequest,
} from "../../api/authApi";

export const registerUser = createAsyncThunk(
  "auth/registerUser",

  async (formData, { rejectWithValue }) => {
    try {
      const response = await registerRequest(formData);

      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Registration failed",
      );
    }
  },
);

export const verifyEmail = createAsyncThunk(
  "auth/verifyEmail",
  async (token, { rejectWithValue }) => {
    try {
      const res = await verifyEmailRequest(token);
      return res;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Verification failed",
      );
    }
  },
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",

  async (formData, { rejectWithValue }) => {
    try {
      const response = await loginRequest(formData);

      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  },
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",

  async (_, { rejectWithValue }) => {
    try {
      await logoutRequest();

      return true;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Logout failed");
    }
  },
);

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",

  async (email, { rejectWithValue }) => {
    try {
      const response = await forgotPasswordRequest({
        email,
      });

      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed");
    }
  },
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",

  async ({ resetToken, password }, { rejectWithValue }) => {
    try {
      const response = await resetPasswordRequest(resetToken, {
        password,
      });

      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed");
    }
  },
);
