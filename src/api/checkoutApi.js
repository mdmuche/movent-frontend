import api from "./axios";

const checkoutUrl = "/v1/checkout";

export const initiateCheckoutRequest = (slug, data) =>
  api.post(`${checkoutUrl}/initiate/${slug}`, data);

export const applyPromoCodeRequest = (slug, data) =>
  api.post(`${checkoutUrl}/promo/${slug}/apply`, data);

export const verifyPaymentRequest = (reference) =>
  api.get(`${checkoutUrl}/verify/${reference}`);

export const getPaymentDetailsRequest = (reference) =>
  api.get(`${checkoutUrl}/${reference}`);

export const cancelCheckoutRequest = (reference) =>
  api.patch(`${checkoutUrl}/cancel/${reference}`);
