import { configureStore } from "@reduxjs/toolkit";

import authreducer from "./slices/authSlice";
import organizerReducer from "./slices/organizerSlice";
import eventReducer from "./slices/eventSlice";
import newsletterReducer from "./slices/newsletterSlice";

export const store = configureStore({
  reducer: {
    events: eventReducer,
    auth: authreducer,
    organizer: organizerReducer,
    newsletter: newsletterReducer,
  },
});
