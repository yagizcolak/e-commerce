import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import AuthProvider from "./features/auth/context/AuthProvider";
import CustomThemeProvider from "./context/ColorModeContext";
import CurrencyProvider from "./context/CurrencyContext";
import { NotificationProvider } from "./context/NotificationContext";
import App from "./App";
import "./api/mockApi";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <CustomThemeProvider>
      <BrowserRouter>
        <CurrencyProvider>
          <NotificationProvider>
            <AuthProvider>
              <CssBaseline />
              <App />
            </AuthProvider>
          </NotificationProvider>
        </CurrencyProvider>
      </BrowserRouter>
    </CustomThemeProvider>
  </React.StrictMode>
);
