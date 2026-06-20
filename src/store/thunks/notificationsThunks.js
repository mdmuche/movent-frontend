import { createAsyncThunk } from "@reduxjs/toolkit";

import {
    getNotificationsRequest,
    getUnreadCountRequest,
    markAsReadRequest,
    markAllAsReadRequest,
    deleteNotificationRequest,
} from "../../api/notificationsApi";

// GET notifications
export const getNotifications = createAsyncThunk(
    "notifications/getNotifications",
    async (params, { rejectWithValue }) => {
        try {
            const res = await getNotificationsRequest(params);
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message);
        }
    },
);

// UNREAD COUNT
export const getUnreadCount = createAsyncThunk(
    "notifications/getUnreadCount",
    async (_, { rejectWithValue }) => {
        try {
            const res = await getUnreadCountRequest();
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message);
        }
    },
);

// MARK AS READ
export const markAsRead = createAsyncThunk(
    "notifications/markAsRead",
    async (notificationId, { rejectWithValue }) => {
        try {
            const res = await markAsReadRequest(notificationId);
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message);
        }
    },
);

// MARK ALL AS READ
export const markAllAsRead = createAsyncThunk(
    "notifications/markAllAsRead",
    async (_, { rejectWithValue }) => {
        try {
            const res = await markAllAsReadRequest();
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message);
        }
    },
);

// DELETE NOTIFICATION
export const deleteNotification = createAsyncThunk(
    "notifications/deleteNotification",
    async (notificationId, { rejectWithValue }) => {
        try {
            const res = await deleteNotificationRequest(notificationId);
            return { notificationId, ...res.data };
        } catch (err) {
            return rejectWithValue(err.response?.data?.message);
        }
    },
);