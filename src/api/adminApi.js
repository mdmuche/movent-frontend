import api from "./axios";

const adminUrl = "/v1/admin";

// Dashboard
export const getPlatformOverviewRequest = () => api.get(`${adminUrl}/overview`);

export const getEventQueueRequest = (params) =>
  api.get(`${adminUrl}/event-queue`, { params });

export const getAllUsersRequest = (params) =>
  api.get(`${adminUrl}/users`, { params });

// Settings
export const getSystemSettingsRequest = () => api.get(`${adminUrl}/settings`);

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

// User Management
export const makeOrganizerRequest = (userId) =>
  api.patch(`${adminUrl}/users/${userId}/make-organizer`);

export const flagUserRequest = (userId) =>
  api.patch(`${adminUrl}/users/${userId}/flag`);

export const suspendUserRequest = (userId, data) =>
  api.patch(`${adminUrl}/users/${userId}/suspend`, data);

// Promo Codes
export const createPromoCodeRequest = (data) =>
  api.post(`${adminUrl}/promo-codes`, data);

export const getAllPromoCodesRequest = (params) =>
  api.get(`${adminUrl}/promo-codes`, { params });
