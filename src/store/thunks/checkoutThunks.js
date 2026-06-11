import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  initiateCheckoutRequest,
  applyPromoCodeRequest,
  verifyPaymentRequest,
  cancelCheckoutRequest,
} from "../../api/checkoutApi";

// INITIATE CHECKOUT
export const initiateCheckout = createAsyncThunk(
  "checkout/initiateCheckout",
  async ({ slug, data }, { rejectWithValue }) => {
    try {
      const res = await initiateCheckoutRequest(slug, data);

      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Checkout failed",
      );
    }
  },
);

// APPLY PROMO
export const applyPromoCode = createAsyncThunk(
  "checkout/applyPromoCode",
  async ({ slug, promoCode, quantity }, { rejectWithValue }) => {
    try {
      const res = await applyPromoCodeRequest(slug, {
        code: promoCode,
        quantity,
      });

      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to apply promo code",
      );
    }
  },
);

// VERIFY PAYMENT
export const verifyPayment = createAsyncThunk(
  "checkout/verifyPayment",
  async (reference, { rejectWithValue }) => {
    try {
      const res = await verifyPaymentRequest(reference);

      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Payment verification failed",
      );
    }
  },
);

// CANCEL CHECKOUT
export const cancelCheckout = createAsyncThunk(
  "checkout/cancelCheckout",
  async (reference, { rejectWithValue }) => {
    try {
      const res = await cancelCheckoutRequest(reference);

      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to cancel checkout",
      );
    }
  },
);
