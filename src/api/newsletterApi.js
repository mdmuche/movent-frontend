import api from "./axios";

export const subscribeNewsletter = (email) =>
  api.post("/v1/newsletter/subscribe", { email });
