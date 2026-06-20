import api from "./axios";

const notificationUrl = "/v1/notification";

// GET user notifications
export const getNotificationsRequest = (params) =>
    api.get(notificationUrl, { params });

// unread count
export const getUnreadCountRequest = () =>
    api.get(`${notificationUrl}/unread-count`);

// mark single as read
export const markAsReadRequest = (notificationId) =>
    api.patch(`${notificationUrl}/${notificationId}/read`);

// mark all as read
export const markAllAsReadRequest = () =>
    api.patch(`${notificationUrl}/mark-all-read`);

// delete notification
export const deleteNotificationRequest = (notificationId) =>
    api.delete(`${notificationUrl}/${notificationId}`);