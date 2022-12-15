import { configureStore } from "@reduxjs/toolkit";
import { authReducer, tasksReducer } from "./reducer";

const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: tasksReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});


export const serverUrl = "http://3.232.244.22/api";

export default store;
