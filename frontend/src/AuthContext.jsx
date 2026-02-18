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
  const storedToken = localStorage.getItem("token");

  if (storedToken) {
    setToken(storedToken);
  }

  setIsLoading(false); // ✅ VERY IMPORTANT
}, []);


  

  // LOGIN ✅
  const login = (token) => {
  localStorage.setItem("token", token);
  setToken(token);
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
