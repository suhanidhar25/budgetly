import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import { ProfileProvider } from "./ProfileContext";
import { ThemeProvider } from "./ThemeContext";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ProfileProvider>
        <AuthProvider>
          <ThemeProvider>
        <App />
          </ThemeProvider>
      </AuthProvider>
      </ProfileProvider>
    </BrowserRouter>
  </React.StrictMode>
);
