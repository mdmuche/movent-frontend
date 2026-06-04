import { createAsyncThunk } from "@reduxjs/toolkit";

import { createEventRequest } from "../../api/organizerApi";

export const createEvent = createAsyncThunk(
  "organizer/createEvent",

  async (formData, { rejectWithValue }) => {
    try {
      const response = await createEventRequest(formData);

      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create event",
      );
    }
  },
);
