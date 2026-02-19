import React, { createContext, useState, useEffect } from "react";
import API from "./api";

export const AuthContext = createContext({
  token: null,
  isAuthenticated: false,
  isLoading: true,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  /* ================= LOAD TOKEN ON APP START ================= */
  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      setToken(storedToken);

      // attach token to axios automatically
      API.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${storedToken}`;
    }

    setIsLoading(false);
  }, []);

  /* ================= LOGIN ================= */
  const login = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);

    // auto attach token to every request
    API.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${newToken}`;
  };

  /* ================= LOGOUT ================= */
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);

    // remove auth header
    delete API.defaults.headers.common["Authorization"];
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        isAuthenticated: !!token,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
