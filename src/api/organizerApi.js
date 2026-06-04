import API from "./axios";

export const createEventRequest = (data) =>
  API.post("/v1/organizer/events", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
