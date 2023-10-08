import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";

import { configureStore } from "@reduxjs/toolkit";
import { Provider as ReduxProvider } from "react-redux";
import UserReducer from "./reducers/UserReducer";

export const store = configureStore({
  reducer: {
    api_Fetch: UserReducer,
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ReduxProvider store={store}>
    <App />
  </ReduxProvider>
);
