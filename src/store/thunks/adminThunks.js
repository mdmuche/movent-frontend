import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  getPlatformOverviewRequest,
  getEventQueueRequest,
  getAllUsersRequest,
  exportReportRequest,
  getSystemSettingsRequest,
  updateSystemSettingsRequest,
  getAuditLogsRequest,
  approveRejectEventRequest,
  flagUserRequest,
  suspendUserRequest,
  makeOrganizerRequest,
} from "../../api/adminApi";

const downloadFile = (blob, filename) => {
  const url = window.URL.createObjectURL(new Blob([blob]));
  const link = document.createElement("a");

  link.href = url;
  link.setAttribute("download", filename);

  document.body.appendChild(link);
  link.click();
  link.remove();
};

// PLATFORM OVERVIEW
export const getPlatformOverview = createAsyncThunk(
  "admin/getPlatformOverview",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getPlatformOverviewRequest();

      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch platform overview",
      );
    }
  },
);

// approve or reject an event
export const approveRejectEvent = createAsyncThunk(
  "admin/approveRejectEvent",
  async ({ eventId, action, reason }, { rejectWithValue }) => {
    try {
      const res = await approveRejectEventRequest(eventId, {
        action,
        reason,
      });

      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
        "Failed to process event approval",
      );
    }
  },
);

// EVENT QUEUE
export const getEventQueue = createAsyncThunk(
  "admin/getEventQueue",
  async (params, { rejectWithValue }) => {
    try {
      const res = await getEventQueueRequest(params);

      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch event queue",
      );
    }
  },
);

// USERS
export const getAllUsers = createAsyncThunk(
  "admin/getAllUsers",
  async (params, { rejectWithValue }) => {
    try {
      const res = await getAllUsersRequest(params);

      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch users",
      );
    }
  },
);

// REPORTS
export const exportReport = createAsyncThunk(
  "admin/exportReport",
  async (format, { rejectWithValue }) => {
    try {
      const res = await exportReportRequest(format);

      let filename = "movent-report";

      if (format === "csv") filename += ".csv";
      if (format === "xlsx") filename += ".xlsx";
      if (format === "pdf") filename += ".pdf";

      downloadFile(res.data, filename);

      return true;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Export failed");
    }
  },
);

// ----------------------------
// GET SYSTEM SETTINGS
// ----------------------------
export const getSystemSettings = createAsyncThunk(
  "admin/getSystemSettings",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await getSystemSettingsRequest();
      return data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  },
);

// ----------------------------
// UPDATE SYSTEM SETTINGS
// ----------------------------
export const updateSystemSettings = createAsyncThunk(
  "admin/updateSystemSettings",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await updateSystemSettingsRequest(payload);
      return data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  },
);

// ----------------------------
// GET AUDIT LOGS
// ----------------------------
export const getAuditLogs = createAsyncThunk(
  "admin/getAuditLogs",
  async (params, { rejectWithValue }) => {
    try {
      const res = await getAuditLogsRequest();

      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch audit logs",
      );
    }
  },
);

export const flagUser = createAsyncThunk(
  "admin/flagUser",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await flagUserRequest(userId);

      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to flag user",
      );
    }
  },
);

export const suspendUser = createAsyncThunk(
  "admin/suspendUser",
  async ({ userId, data }, { rejectWithValue }) => {
    try {
      const res = await suspendUserRequest(userId, data);

      return {
        userId,
        ...res.data,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to suspend user",
      );
    }
  },
);

export const makeOrganizer = createAsyncThunk(
  "admin/makeOrganizer",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await makeOrganizerRequest(userId);

      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to make organizer",
      );
    }
  },
);
