import api from "./axios";

const organizerUrl = "/v1/organizer";

// CREATE
export const createEventRequest = (data) =>
  api.post(organizerUrl + "/events", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

//READ
export const getSingleEventRequest = (id) =>
  api.get(`${organizerUrl}/events/${id}`);

// READ
export const getOrganizerDashboard = (params) =>
  api.get(organizerUrl + "/dashboard", { params });

export const getOrganizerAnalytics = () => api.get(organizerUrl + "/analytics");

// UPDATE EVENT
export const updateEventRequest = (id, data) =>
  api.put(organizerUrl + `/events/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

// DELETE EVENT
export const deleteEventRequest = (id) =>
  api.delete(organizerUrl + `/events/${id}`);
