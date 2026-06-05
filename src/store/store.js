import { configureStore } from "@reduxjs/toolkit";

import authreducer from "./slices/authSlice";
import userReducer from "./slices/userSlice";
import organizerReducer from "./slices/organizerSlice";
import eventReducer from "./slices/eventSlice";
import newsletterReducer from "./slices/newsletterSlice";

export const store = configureStore({
  reducer: {
    events: eventReducer,
    auth: authreducer,
    user: userReducer,
    organizer: organizerReducer,
    newsletter: newsletterReducer,
  },
});
