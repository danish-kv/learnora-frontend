import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.jsx";
import "./index.css";
import store, { persistor } from "./redux/store.js";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  // {/* </React.StrictMode> */}
);
