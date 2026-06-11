import { createSlice } from "@reduxjs/toolkit";

import {
  initiateCheckout,
  applyPromoCode,
  verifyPayment,
  cancelCheckout,
} from "../thunks/checkoutThunks";

const initialState = {
  checkoutSession: null,
  payment: null,

  loading: false,
  error: null,
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // INITIATE CHECKOUT
      .addCase(initiateCheckout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(initiateCheckout.fulfilled, (state, action) => {
        state.loading = false;
        state.checkoutSession = action.payload.data;
      })

      .addCase(initiateCheckout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // APPLY PROMO
      .addCase(applyPromoCode.fulfilled, (state, action) => {
        state.checkoutSession = {
          ...state.checkoutSession,
          ...action.payload.data,
        };
      })

      // VERIFY PAYMENT
      .addCase(verifyPayment.fulfilled, (state, action) => {
        state.payment = action.payload.data;
      })

      // CANCEL
      .addCase(cancelCheckout.fulfilled, (state) => {
        state.checkoutSession = null;
      });
  },
});

export default checkoutSlice.reducer;
