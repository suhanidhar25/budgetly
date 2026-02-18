import React, { useContext } from "react";
import { AuthContext } from "../AuthContext";

export default function MainLayout({ children }) {
  const { logout } = useContext(AuthContext);

  return (
    <div className="min-h-screen flex flex-col text-white">

      {/* ================= NAVBAR ================= */}
      <nav className="w-full bg-black/20 backdrop-blur border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center">
              💳
            </div>
            <span className="font-semibold tracking-wide">
              Dashboard
            </span>
          </div>

          <button
            onClick={logout}
            className="px-4 py-2 rounded-lg bg-red-500/90 hover:bg-red-600 text-sm font-semibold transition"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* ================= MAIN CONTENT ================= */}
      <main className="w-full max-w-[1200px]
 mx-auto px-4 sm:px-6 lg:px-8 flex-1">

        {/* HERO MOVED INSIDE CONTAINER ✅ */}
        <div className="text-center mt-10 mb-10">
          <h1 className="text-4xl font-bold tracking-tight">
            Budgetly
          </h1>

          <p className="text-blue-300 mt-2">
            Expense Tracker
          </p>

          <p className="text-sm text-blue-200">
            Manage and track your expenses with clarity
          </p>
        </div>

        {children}
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="text-center text-blue-300 text-sm py-8">
        <p className="font-light">Built by Suhani Dhar</p>
        <p className="text-xs text-blue-400 mt-1">
          © 2025 Expense Tracker. All rights reserved.
        </p>
      </footer>

    </div>
  );
}
