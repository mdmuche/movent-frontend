import { createSlice } from "@reduxjs/toolkit";

import {
  getPlatformOverview,
  getEventQueue,
  getAllUsers,
  exportReport,
  getSystemSettings,
  updateSystemSettings,
  getAuditLogs,
  approveRejectEvent,
  flagUser,
  suspendUser,
  makeOrganizer,
} from "../thunks/adminThunks";

const initialState = {
  overview: null,

  eventQueue: [],
  eventQueuePagination: null,

  users: [],
  usersPagination: null,

  systemSettings: null,
  settingsDraft: null,

  auditLogs: [],
  auditPagination: null,

  loading: false,
  exportLoading: false,
  settingsLoading: false,
  settingsUpdateLoading: false,
  auditLoading: false,
  error: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setSettingsDraft: (state, action) => {
      state.settingsDraft = {
        ...state.settingsDraft,
        ...action.payload,
      };
    },
  },

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
      // approve reject event
      .addCase(approveRejectEvent.pending, (state) => {
        state.loading = true;
      })

      .addCase(approveRejectEvent.fulfilled, (state, action) => {
        state.loading = false;

        const updatedEvent = action.payload.data;

        state.eventQueue = state.eventQueue.filter(
          (event) => event._id !== updatedEvent._id,
        );
      })

      .addCase(approveRejectEvent.rejected, (state, action) => {
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
      })

      // GET SETTINGS
      .addCase(getSystemSettings.pending, (state) => {
        state.settingsLoading = true;
      })
      .addCase(getSystemSettings.fulfilled, (state, action) => {
        state.settingsLoading = false;
        state.systemSettings = action.payload;
        state.settingsDraft = action.payload.data;
      })
      .addCase(getSystemSettings.rejected, (state) => {
        state.settingsLoading = false;
      })

      // UPDATE SETTINGS
      .addCase(updateSystemSettings.pending, (state) => {
        state.settingsUpdateLoading = true;
      })
      .addCase(updateSystemSettings.fulfilled, (state, action) => {
        state.settingsUpdateLoading = false;
        state.systemSettings = action.payload;
        state.settingsDraft = action.payload.data;
      })
      .addCase(updateSystemSettings.rejected, (state) => {
        state.settingsUpdateLoading = false;
      })

      // GET AUDIT LOGS
      .addCase(getAuditLogs.pending, (state) => {
        state.auditLoading = true;
      })
      .addCase(getAuditLogs.fulfilled, (state, action) => {
        state.auditLoading = false;
        state.auditLogs = action.payload.data.logs;
        state.auditPagination = action.payload.data.pagination;
      })
      .addCase(getAuditLogs.rejected, (state) => {
        state.auditLoading = false;
      })

      // FLAG USER
      .addCase(flagUser.fulfilled, (state, action) => {
        const updatedUser = action.payload.data;

        state.users = state.users.map((user) =>
          user._id === updatedUser._id ? updatedUser : user,
        );
      })

      // SUSPEND USER
      .addCase(suspendUser.fulfilled, (state, action) => {
        const updatedUser = action.payload.data;

        state.users = state.users.map((user) =>
          user._id === updatedUser._id ? updatedUser : user,
        );
      })

      // MAKE ORGANIZER
      .addCase(makeOrganizer.fulfilled, (state, action) => {
        const updatedUser = action.payload.data;

        state.users = state.users.map((user) =>
          user._id === updatedUser._id ? updatedUser : user,
        );
      });
  },
});

export const { setSettingsDraft } = adminSlice.actions;

export default adminSlice.reducer;
