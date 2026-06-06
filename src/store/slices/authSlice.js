import { createSlice } from "@reduxjs/toolkit";

import {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
} from "../thunks/authThunks";

const initialState = {
  user: null,

  loading: false,

  isAuthenticated: false,

  authError: null,

  forgotPasswordStatus: "idle",
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    clearAuthError: (state) => {
      state.authError = null;
    },

    resetAuthStatus: (state) => {
      state.forgotPasswordStatus = "idle";
    },
  },

  extraReducers: (builder) => {
    builder

      // REGISTER
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.authError = null;
      })

      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.authError = action.payload;
      })

      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;

        state.isAuthenticated = true;

        state.user = action.payload.data;
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.authError = action.payload;
      })

      // LOGOUT
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })

      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;

        state.user = null;
        state.isAuthenticated = false;
        state.authError = null;
      })

      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.authError = action.payload;
      })

      // FORGOT PASSWORD
      .addCase(forgotPassword.pending, (state) => {
        state.forgotPasswordStatus = "loading";
      })

      .addCase(forgotPassword.fulfilled, (state) => {
        state.forgotPasswordStatus = "succeeded";
      })

      .addCase(forgotPassword.rejected, (state) => {
        state.forgotPasswordStatus = "failed";
      })

      // RESET PASSWORD
      .addCase(resetPassword.fulfilled, (state) => {
        state.forgotPasswordStatus = "reset_success";
      });
  },
});

export const { clearAuthError, resetAuthStatus } = authSlice.actions;

export default authSlice.reducer;
