import { createAsyncThunk } from "@reduxjs/toolkit";

import { cancelTicketRequest, getMyTicketsRequest } from "../../api/ticketApi";

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

// CANCEL TICKET
export const cancelTicket = createAsyncThunk(
  "ticket/cancelTicket",
  async (ticketId, { rejectWithValue }) => {
    try {
      const res = await cancelTicketRequest(ticketId);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to cancel ticket",
      );
    }
  },
);
