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
      <div className="space-y-6">

        {/* Page Heading */}
        <div className="text-white">
          <h1 className="text-2xl font-semibold">
            Expense Dashboard
          </h1>
          <p className="text-white/60 text-sm">
            Track and manage your spending
          </p>
        </div>

        {/* Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Form Section */}
          <div className="lg:col-span-1">
            <ExpenseForm
              onExpenseAdded={() => setRefresh(!refresh)}
            />
          </div>

          {/* List Section */}
          <div className="lg:col-span-2">
            <ExpenseList refresh={refresh} />
          </div>

        </div>
      </div>
    </MainLayout>
  );
}

export default App;
