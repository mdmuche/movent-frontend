import { configureStore } from "@reduxjs/toolkit";

import authreducer from "./slices/authSlice";
import userReducer from "./slices/userSlice";
import checkoutReducer from "./slices/checkoutSlice";
import ticketReducer from "./slices/ticketSlice";
import organizerReducer from "./slices/organizerSlice";
import notificationReducer from "./slices/notificationsSlice";
import eventReducer from "./slices/eventSlice";
import newsletterReducer from "./slices/newsletterSlice";
import adminReducer from "./slices/adminSlice";

export const store = configureStore({
  reducer: {
    events: eventReducer,
    auth: authreducer,
    user: userReducer,
    checkout: checkoutReducer,
    ticket: ticketReducer,
    organizer: organizerReducer,
    notifications: notificationReducer,
    newsletter: newsletterReducer,
    admin: adminReducer,
  },
});
