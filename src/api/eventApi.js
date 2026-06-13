import api from "./axios";

const eventUrl = "/v1/event";

// Public
export const getEventCategories = () => api.get(eventUrl + "/categories");

export const getAllEvents = (params) => {
  const cleanParams = Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== ""),
  );

  return api.get(eventUrl + "/", { params: cleanParams });
};

export const getEvent = (slug) => api.get(eventUrl + `/${slug}`);

export const getTrendingEvents = (params) =>
  api.get(eventUrl + "/trending", { params });

// This is for the home page, it returns only 3 upcoming events with limited details
export const getUpcomingEventsInHome = () =>
  api.get(eventUrl + "", {
    params: {
      status: "upcoming",
      limit: 3,
      sort: "latest",
    },
  });

// Protected
export const getRecommendations = (params) =>
  api.get(eventUrl + "/recommendations", {
    params,
  });

export const getUpcomingEvents = (params) =>
  api.get(eventUrl + "/upcoming", {
    params,
  });
