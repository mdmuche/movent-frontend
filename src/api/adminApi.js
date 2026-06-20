import api from "./axios";

const adminUrl = "/v1/admin";

// Dashboard
export const getPlatformOverviewRequest = () => api.get(`${adminUrl}/overview`);

// Approve or reject an event
export const approveRejectEventRequest = (eventId, data) =>
  api.patch(`${adminUrl}/events/${eventId}/approve-reject`, data);

// Event Queue
export const getEventQueueRequest = (params) =>
  api.get(`${adminUrl}/event-queue`, { params });

// Get all users
export const getAllUsersRequest = (params) =>
  api.get(`${adminUrl}/users`, { params });

// Settings
export const getSystemSettingsRequest = () => api.get(`${adminUrl}/settings`);

// Update system settings
export const updateSystemSettingsRequest = (data) =>
  api.patch(`${adminUrl}/settings`, data);

// Audit Logs
export const getAuditLogsRequest = (params) =>
  api.get(`${adminUrl}/audit-logs`, { params });

// Reports
export const exportReportRequest = (format) =>
  api.get(`${adminUrl}/reports/export?format=${format}`, {
    responseType: "blob",
  });


// make an organizer
export const makeOrganizerRequest = (userId) =>
  api.patch(`${adminUrl}/users/${userId}/make-organizer`);

// flag a user
export const flagUserRequest = (userId) =>
  api.patch(`${adminUrl}/users/${userId}/flag`);

// suspend a user
export const suspendUserRequest = (userId, data) =>
  api.patch(`${adminUrl}/users/${userId}/suspend`, data);

// create a promo code
export const createPromoCodeRequest = (data) =>
  api.post(`${adminUrl}/promo-codes`, data);

// get all promo codes
export const getAllPromoCodesRequest = (params) =>
  api.get(`${adminUrl}/promo-codes`, { params });
