import React, { useContext } from "react";
import { AuthContext } from "../AuthContext";
import { Link, useLocation } from "react-router-dom";

export default function MainLayout({ children }) {
  const { logout } = useContext(AuthContext);
  const location = useLocation();

  const navLink = (path) =>
    `px-3 py-2 rounded-lg transition ${
      location.pathname === path
        ? "bg-white/10 text-white"
        : "text-white/70 hover:text-white hover:bg-white/5"
    }`;

  return (
    <div className="min-h-screen flex flex-col text-white overflow-x-hidden">

      {/* ================= NAVBAR ================= */}
      <nav className="w-full bg-black/20 backdrop-blur border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">

          {/* TOP ROW */}
          <div className="flex flex-wrap items-center justify-between gap-3">

            {/* LEFT */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center">
                💳
              </div>
              <span className="font-semibold tracking-wide">
                Budgetly
              </span>
            </div>

            {/* NAV LINKS */}
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <Link to="/" className={navLink("/")}>Home</Link>
              <Link to="/dashboard" className={navLink("/dashboard")}>Dashboard</Link>
              <Link to="/analytics" className={navLink("/analytics")}>Analytics</Link>
              <Link to="/settings" className={navLink("/settings")}>Settings</Link>

             
            </div>

          </div>
        </div>
      </nav>

      {/* ================= MAIN ================= */}
      <main
        className="
          w-full
          max-w-7xl
          mx-auto
          px-4
          sm:px-6
          lg:px-8
          py-6
          flex-1
        "
      >
        {children}
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="text-center text-blue-300 text-sm py-6">
        <p>Built by Suhani Dhar</p>
        <p className="text-xs text-blue-400 mt-1">
          © 2025 Expense Tracker
        </p>
      </footer>

    </div>
  );
}
