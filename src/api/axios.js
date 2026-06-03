import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // cookies (access + refresh tokens)
});

// Refresh control
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve();
    }
  });

  failedQueue = [];
};

// REQUEST INTERCEPTOR
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error),
);

// RESPONSE INTERCEPTOR
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If unauthorized
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // If already refreshing → queue requests
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(() => api(originalRequest));
      }

      isRefreshing = true;

      try {
        // IMPORTANT: call refresh endpoint directly (NO imports from redux/api files)
        await axios.post(
          `${import.meta.env.VITE_API_URL}/v1/auth/refresh-token`,
          {},
          { withCredentials: true },
        );

        isRefreshing = false;
        processQueue(null);

        return api(originalRequest);
      } catch (err) {
        isRefreshing = false;
        processQueue(err);

        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
