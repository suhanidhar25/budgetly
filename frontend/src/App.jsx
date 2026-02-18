import React, { useContext, useState } from "react";
import { AuthContext } from "./AuthContext";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import MainLayout from "./layout/MainLayout";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  const { token, isLoading } = useContext(AuthContext);

  const [refresh, setRefresh] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  /* ===== Loading Screen ===== */
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <p className="animate-pulse text-lg">Loading Budgetly...</p>
      </div>
    );
  }

  /* ===== Auth Screens ===== */
  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        {showSignup ? (
          <Signup goToLogin={() => setShowSignup(false)} />
        ) : (
          <Login goToSignup={() => setShowSignup(true)} />
        )}
      </div>
    );
  }

  /* ===== Dashboard ===== */
  return (
    <MainLayout>
  <div className="space-y-8 lg:space-y-10">


    {/* ===== PAGE TITLE ===== */}
    <div className="text-white">
      <h1 className="text-xl sm:text-2xl font-semibold">
        Expense Dashboard
      </h1>
      <p className="text-white/60 text-sm">
        Track and manage your spending
      </p>
    </div>

    {/* ===== SUMMARY CARDS (NEW SECTION) ===== */}
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

      <div className="dashboard-card text-white p-6 lg:p-7">
        <p className="text-sm text-white/60">Total Balance</p>
        <h2 className="text-3xl font-bold mt-1">₹12,450</h2>
      </div>

      <div className="dashboard-card text-white p-5">
        <p className="text-sm text-white/60">Income</p>
        <h2 className="text-2xl font-semibold text-green-400 mt-1">
          + ₹20,000
        </h2>
      </div>

      <div className="dashboard-card text-white p-5">
        <p className="text-sm text-white/60">Expenses</p>
        <h2 className="text-2xl font-semibold text-red-400 mt-1">
          − ₹7,550
        </h2>
      </div>

    </div>

    {/* ===== MAIN DASHBOARD GRID ===== */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">


      {/* LEFT — FORM */}
      <div className="lg:col-span-1 dashboard-card">
        <div className="dashboard-card-header text-white">
          Add Expense
        </div>
        <div className="dashboard-card-body">
          <ExpenseForm
            onExpenseAdded={() => setRefresh(!refresh)}
          />
        </div>
      </div>

      {/* RIGHT — EXPENSE LIST */}
      <div className="lg:col-span-2 dashboard-card">
        <div className="dashboard-card-header text-white">
          Recent Transactions
        </div>
        <div className="dashboard-card-body">
          <ExpenseList refresh={refresh} />
        </div>
      </div>

    </div>

  </div>
</MainLayout>

  );
}

export default App;
