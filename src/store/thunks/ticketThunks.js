import { createAsyncThunk } from "@reduxjs/toolkit";

import { getMyTicketsRequest } from "../../api/ticketApi";

export const fetchMyTickets = createAsyncThunk(
  "ticket/fetchMyTickets",
  async ({ page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
      const { data } = await getMyTicketsRequest({
        page,
        limit,
      });

      return data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch tickets",
      );
    }
  },
);
