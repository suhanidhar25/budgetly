import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext({
  token: null,
  isLoading: true,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load token when app starts
  useEffect(() => {
  const savedToken = localStorage.getItem("token");

  if (savedToken) {
    setToken(savedToken);
  }

  // always stop loading
  setTimeout(() => {
    setIsLoading(false);
  }, 100);
}, []);

  // LOGIN ✅
  const login = (token) => {
    setToken(token);
    localStorage.setItem("token", token);
  };

  // LOGOUT ✅
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);

  };

  return (
    <AuthContext.Provider value={{ token, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
