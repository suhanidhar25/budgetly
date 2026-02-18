import React, { createContext, useState, useEffect } from "react";

export const ProfileContext = createContext();

export function ProfileProvider({ children }) {

  const [profile, setProfile] = useState({
    name: localStorage.getItem("name") || "User",
    email: localStorage.getItem("email") || "",
    currency: localStorage.getItem("currency") || "INR",
  });

  /* sync with localStorage */
  useEffect(() => {
    localStorage.setItem("name", profile.name);
    localStorage.setItem("email", profile.email);
    localStorage.setItem("currency", profile.currency);
  }, [profile]);

  return (
    <ProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </ProfileContext.Provider>
  );
}
