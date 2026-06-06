import api from "./axios";

// PROFILE
export const getUserProfile = () => api.get("/v1/user/profile");

export const updateUserProfile = (payload) =>
  api.patch("/v1/user/profile", payload);

// DASHBOARD
export const getDashboard = () => api.get("/v1/user/dashboard");

// SAVED EVENTS
export const getSavedEvents = () => api.get("/v1/user/saved-events");

export const toggleSavedEvent = (eventId) =>
  api.post(`/v1/user/saved-events/${eventId}`);

// ACTIVITY
export const getUserActivity = () => api.get("/v1/user/activity");

// SETTINGS
export const updateUserNotifications = (payload) =>
  api.patch("/v1/user/notification/preferences", payload);

export const updateUserLanguage = (payload) =>
  api.patch("/v1/user/language/preference", payload);

// ACCOUNT
export const closeUserAccount = () => api.delete("/v1/user/account");

// PROFILE PICTURE
export const updateUserProfilePicture = (file) => {
  const formData = new FormData();
  formData.append("profilePicture", file);

  return api.patch("/v1/user/profile/picture", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
