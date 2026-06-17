/*
  --- index.js ---

  --- Redux Provider ---
  The Provider component from react-redux makes the Redux store
  available to every component in the app. Any component can now
  read from or dispatch actions to the store.
*/

import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store/store";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
