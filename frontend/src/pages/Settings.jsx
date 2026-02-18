import React, { useContext } from "react";
import { motion } from "framer-motion";
import { AuthContext } from "../AuthContext";
import { ProfileContext } from "../ProfileContext";
import { ThemeContext } from "../ThemeContext";


export default function Settings() {
  const { logout } = useContext(AuthContext);
  const { profile, setProfile } = useContext(ProfileContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  /* update profile fields */
  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* PAGE TITLE */}
      <h1 className="text-2xl font-semibold text-white">
        Settings
      </h1>

      <div className="dashboard-card p-6 text-white space-y-4">
  <h2 className="text-lg font-semibold">Appearance</h2>

  <button
    onClick={toggleTheme}
    className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20"
  >
    Switch to {theme === "dark" ? "Light" : "Dark"} Mode
  </button>
</div>


      {/* ================= PROFILE ================= */}
      <div className="dashboard-card p-6 text-white space-y-4">
        <h2 className="text-lg font-semibold">Profile</h2>

        {/* NAME */}
        <div>
          <label className="text-sm text-white/60">Name</label>
          <input
            name="name"
            value={profile.name}
            onChange={handleChange}
            className="w-full mt-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* EMAIL */}
        <div>
          <label className="text-sm text-white/60">Email</label>
          <input
            name="email"
            value={profile.email}
            onChange={handleChange}
            className="w-full mt-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>

      {/* ================= PREFERENCES ================= */}
      <div className="dashboard-card p-6 text-white space-y-4">
        <h2 className="text-lg font-semibold">Preferences</h2>

        {/* CURRENCY */}
        <div>
          <label className="text-sm text-white/60">Currency</label>
          <select
            name="currency"
            value={profile.currency}
            onChange={handleChange}
            className="w-full mt-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 focus:outline-none"
          >
            <option value="INR">INR (₹)</option>
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
          </select>
        </div>
      </div>

      {/* ================= ACCOUNT ================= */}
      <div className="dashboard-card p-6 text-white space-y-4">
        <h2 className="text-lg font-semibold">Account</h2>

        <button
          onClick={logout}
          className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 font-semibold transition"
        >
          Logout
        </button>
      </div>
    </motion.div>
  );
}
