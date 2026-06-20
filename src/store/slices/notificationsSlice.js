import { createSlice } from "@reduxjs/toolkit";
import {
    getNotifications,
    getUnreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification,
} from "../thunks/notificationsThunks";

const initialState = {
    notifications: [],
    pagination: null,
    unreadCount: 0,

    loading: false,
    actionLoading: false,
    error: null,
};

const notificationsSlice = createSlice({
    name: "notifications",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            // GET NOTIFICATIONS
            .addCase(getNotifications.pending, (state) => {
                state.loading = true;
            })
            .addCase(getNotifications.fulfilled, (state, action) => {
                state.loading = false;
                state.notifications = action.payload.data.notifications;
                state.pagination = action.payload.data.pagination;
            })
            .addCase(getNotifications.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // UNREAD COUNT
            .addCase(getUnreadCount.fulfilled, (state, action) => {
                state.unreadCount = action.payload.data.count;
            })

            // MARK AS READ
            .addCase(markAsRead.fulfilled, (state, action) => {
                const updated = action.payload.data;

                state.notifications = state.notifications.map((n) =>
                    n._id === updated._id ? updated : n,
                );
            })

            // MARK ALL AS READ
            .addCase(markAllAsRead.fulfilled, (state) => {
                state.notifications = state.notifications.map((n) => ({
                    ...n,
                    isRead: true,
                }));
                state.unreadCount = 0;
            })

            // DELETE
            .addCase(deleteNotification.fulfilled, (state, action) => {
                state.notifications = state.notifications.filter(
                    (n) => n._id !== action.payload.notificationId,
                );
            });
    },
});

export default notificationsSlice.reducer;