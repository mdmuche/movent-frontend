import api from "./axios";

// Public
export const getAllEvents = (params) => {
  const cleanParams = Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== ""),
  );

  return api.get("/v1/event", { params: cleanParams });
};

export const getEvent = () => api.get(`/v1/event/:slug`);

export const getTrendingEvents = (params) =>
  api.get("/v1/event/trending", { params });

// This is for the home page, it returns only 3 upcoming events with limited details
export const getUpcomingEventsInHome = () =>
  api.get("/v1/event", {
    params: {
      status: "upcoming",
      limit: 3,
      sort: "latest",
    },
  });

// Protected
export const getRecommendations = (params) =>
  api.get("/v1/event/recommendations", {
    params,
  });

export const getUpcomingEvents = (params) =>
  api.get("/v1/event/upcoming", {
    params,
  });
