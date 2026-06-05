import { createSlice } from "@reduxjs/toolkit";

import {
  fetchDashboard,
  fetchSavedEvents,
  fetchUserActivity,
  fetchUserProfile,
  toggleSaveEvent,
  updateProfile,
  updateNotifications,
  updateLanguage,
  closeAccount,
} from "../thunks/userThunks";

const initialState = {
  profile: null,
  profileDraft: {
    fullName: "",
    email: "",
    bio: "",
  },
  dashboard: null,
  savedEvents: [],
  activity: [],
  loading: false,
  actionLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    setProfileDraft: (state, action) => {
      state.profileDraft = {
        ...state.profileDraft,
        ...action.payload,
      };
    },

    resetProfileDraft: (state) => {
      if (state.profile?.user) {
        state.profileDraft = {
          fullName: state.profile.user.fullName || "",
          email: state.profile.user.email || "",
          bio: state.profile.user.bio || "",
        };
      }
    },
    clearUserState: (state) => {
      state.profile = null;
      state.dashboard = null;
      state.savedEvents = [];
      state.activity = [];
      state.loading = false;
      state.actionLoading = false;
      state.error = null;
    },

    clearUserError: (state) => {
      state.error = null;
    },

    resetActionLoading: (state) => {
      state.actionLoading = false;
    },
  },

  extraReducers: (builder) => {
    builder

      // ======================
      // PROFILE
      // ======================
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;

        state.profileDraft = {
          fullName: action.payload.user?.fullName || "",
          email: action.payload.user?.email || "",
          bio: action.payload.user?.bio || "",
        };
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ======================
      // DASHBOARD
      // ======================
      .addCase(fetchDashboard.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.dashboard = action.payload;
      })
      .addCase(fetchDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ======================
      // SAVED EVENTS
      // ======================
      .addCase(fetchSavedEvents.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSavedEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.savedEvents = action.payload;
      })
      .addCase(fetchSavedEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // toggle save
      .addCase(toggleSaveEvent.fulfilled, (state, action) => {
        state.savedEvents = action.payload;
      })

      // ======================
      // ACTIVITY
      // ======================
      .addCase(fetchUserActivity.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserActivity.fulfilled, (state, action) => {
        state.loading = false;
        state.activity = action.payload;
      })
      .addCase(fetchUserActivity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ======================
      // UPDATE PROFILE
      // ======================
      .addCase(updateProfile.pending, (state) => {
        state.actionLoading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.actionLoading = false;
        state.profile = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      })

      // ======================
      // NOTIFICATIONS
      // ======================
      .addCase(updateNotifications.pending, (state) => {
        state.actionLoading = true;
      })
      .addCase(updateNotifications.fulfilled, (state, action) => {
        state.actionLoading = false;
        if (state.profile) {
          state.profile.notificationPreferences = action.payload;
        }
      })
      .addCase(updateNotifications.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      })

      // ======================
      // LANGUAGE
      // ======================
      .addCase(updateLanguage.pending, (state) => {
        state.actionLoading = true;
      })
      .addCase(updateLanguage.fulfilled, (state, action) => {
        state.actionLoading = false;
        if (state.profile) {
          state.profile.language = action.payload;
        }
      })
      .addCase(updateLanguage.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      })

      // ======================
      // CLOSE ACCOUNT
      // ======================
      .addCase(closeAccount.pending, (state) => {
        state.actionLoading = true;
      })
      .addCase(closeAccount.fulfilled, (state) => {
        state.actionLoading = false;
        state.profile = null;
        state.dashboard = null;
        state.savedEvents = [];
        state.activity = [];
      })
      .addCase(closeAccount.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      });
  },
});

export const {
  clearUserState,
  clearUserError,
  resetActionLoading,
  setProfileDraft,
  resetProfileDraft,
} = userSlice.actions;

export default userSlice.reducer;
