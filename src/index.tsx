import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import AuthProvider from "./context/AuthContext";
import CustomThemeProvider from "./context/ColorModeContext";
import CurrencyProvider from "./context/CurrencyContext";
import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <CustomThemeProvider>
      <BrowserRouter>
        <CurrencyProvider>
          <AuthProvider>
            <CssBaseline />
            <App />
          </AuthProvider>
        </CurrencyProvider>
      </BrowserRouter>
    </CustomThemeProvider>
  </React.StrictMode>
);