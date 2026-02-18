import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import MainLayout from "./layout/MainLayout";
import Login from "./components/Login";
import Signup from "./components/Signup";
import API from "./api";

import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";


function App() {
  const { token, isLoading } = useContext(AuthContext);

  const [refresh, setRefresh] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  /* ================= EXPENSE DATA ================= */
  const [expenses, setExpenses] = useState([]);

  /* ================= INCOME ================= */
  const [income, setIncome] = useState(
    Number(localStorage.getItem("income")) || 0
  );

  /* Save income locally */
  useEffect(() => {
    localStorage.setItem("income", income);
  }, [income]);

  /* Fetch expenses */
  const fetchExpenses = async () => {
    try {
      const res = await API.get("/expenses");
      setExpenses(res.data || []);
    } catch (err) {
      console.error("Failed to fetch expenses", err);
    }
  };

  useEffect(() => {
    if (token) {
      fetchExpenses();
    }
  }, [refresh, token]);

  /* ================= CALCULATIONS ================= */
  const totalExpenses = expenses.reduce(
    (sum, exp) => sum + Number(exp.amount),
    0
  );

  const balance = income - totalExpenses;

  /* ================= LOADING ================= */
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <p className="animate-pulse text-lg">Loading Budgetly...</p>
      </div>
    );
  }

  /* ================= AUTH SCREENS ================= */
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

  /* ================= APP ROUTES ================= */
  return (
    <MainLayout>
      <Routes>

        {/* HOME */}
        <Route
          path="/"
          element={
            <Home
              balance={balance}
              totalExpenses={totalExpenses}
            />
          }
        />

        {/* DASHBOARD */}
        <Route
          path="/dashboard"
          element={
            <Dashboard
              balance={balance}
              income={income}
              setIncome={setIncome}
              totalExpenses={totalExpenses}
              refresh={refresh}
              setRefresh={setRefresh}
            />
          }
        />
<Route
  path="/analytics"
  element={<Analytics expenses={expenses} />}
/>

<Route path="/settings" element={<Settings />} />



        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </MainLayout>
  );
}

export default App;
