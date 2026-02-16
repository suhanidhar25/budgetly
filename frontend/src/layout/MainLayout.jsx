import React, { useContext } from "react";
import { AuthContext } from "../AuthContext";


export default function MainLayout({ children, onLogout }) {
      const { logout } = useContext(AuthContext);
  return (
    <div className="min-h-screen flex flex-col text-white">

      {/* ================= NAVBAR ================= */}
      <nav className="w-full bg-black/20 backdrop-blur border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">

          {/* Left */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center">
              💳
            </div>
            <span className="font-semibold tracking-wide">
              Dashboard
            </span>
          </div>

          {/* Right */}
          <button
            onClick={logout}
            className="
              px-4 py-2 rounded-lg
              bg-red-500/90
              hover:bg-red-600
              text-sm font-semibold
              transition
            "
          >
            Logout
          </button>
        </div>
      </nav>

      {/* ================= HERO HEADER ================= */}
      <header className="text-center mt-12 mb-10 px-4">
        <h1 className="text-4xl font-bold tracking-tight">
          Budgetly
        </h1>

        <p className="text-blue-300 mt-2">
          Expense Tracker
        </p>

        <p className="text-sm text-blue-200">
          Manage and track your expenses with clarity
        </p>
      </header>

      {/* ================= MAIN CONTENT ================= */}
      <main className="w-full max-w-5xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-start">

        {children}
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="text-center text-blue-300 text-sm py-8">
        <p className="text-sm text-blue-300 font-light">Built by Suhani Dhar</p>
          <p className="text-xs text-blue-400 mt-1">
            © 2025 Expense Tracker. All rights reserved.
          </p>
      </footer>
    </div>
  );
}
