import api from "./axios";

export const registerRequest = async (data) => {
  const response = await api.post("/v1/auth/register", data);

  return response.data;
};

export const verifyEmailRequest = async (token) => {
  const response = await api.get(`/v1/auth/verify-email/${token}`);
  return response.data;
};

export const loginRequest = async (data) => {
  const response = await api.post("/v1/auth/login", data);

  return response.data;
};

export const logoutRequest = async () => {
  const response = await api.post("/v1/auth/logout");

  return response.data;
};

export const forgotPasswordRequest = async (data) => {
  const response = await api.post("/v1/auth/forgot-password", data);

  return response.data;
};

export const resetPasswordRequest = async (resetToken, data) => {
  const response = await api.post(
    `/v1/auth/reset-password/${resetToken}`,
    data,
  );

  return response.data;
};

export const refreshTokenRequest = async () => {
  const response = await api.post("/v1/auth/refresh-token");

  return response.data;
};
