import api from "./axios";

const organizerUrl = "/v1/organizer";

export const createEventRequest = (data) =>
  api.post(organizerUrl + "/events", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const getOrganizerDashboard = () => api.get(organizerUrl + "/dashboard");

export const getOrganizerAnalytics = () => api.get(organizerUrl + "/analytics");
