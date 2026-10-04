import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "sonner";

import App from "./App";
import "./index.css";

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>
    <App />

    {/* ========================================
        Global Toast Notifications
        ======================================== */}

    <Toaster
      position="top-right"
      richColors
      closeButton
      duration={4000}
      expand={false}
      toastOptions={{
        style: {
          borderRadius: "14px",
          fontSize: "14px",
        },
      }}
    />
  </React.StrictMode>
);