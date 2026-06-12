import { createSlice } from "@reduxjs/toolkit";
import { cancelTicket, fetchMyTickets } from "../thunks/ticketThunks";

const initialState = {
  tickets: [],
  pagination: null,
  loading: false,
  error: null,
};

const ticketSlice = createSlice({
  name: "ticket",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(fetchMyTickets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchMyTickets.fulfilled, (state, action) => {
        state.loading = false;
        state.tickets = action.payload.tickets;
        state.pagination = action.payload.pagination;
      })

      .addCase(fetchMyTickets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // cancel ticket
      .addCase(cancelTicket.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(cancelTicket.fulfilled, (state, action) => {
        state.loading = false;

        // remove or update cancelled ticket in state
        const cancelledId = action.payload?.data?._id;

        state.tickets = state.tickets.map((t) =>
          t._id === cancelledId ? { ...t, paymentStatus: "cancelled" } : t,
        );
      })

      .addCase(cancelTicket.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default ticketSlice.reducer;
