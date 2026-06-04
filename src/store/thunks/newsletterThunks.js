import { createAsyncThunk } from "@reduxjs/toolkit";
import { subscribeNewsletter as subscribeNewsletterApi } from "../../api/newsletterApi";

export const subscribeNewsletter = createAsyncThunk(
  "newsletter/subscribe",
  async (email, { rejectWithValue }) => {
    try {
      const response = await subscribeNewsletterApi(email);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Subscription failed",
      );
    }
  },
);
