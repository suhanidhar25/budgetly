import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import MainLayout from "./layout/MainLayout";
import Login from "./components/Login";
import Signup from "./components/Signup";
import API from "./api";

function App() {
  const { token, isLoading } = useContext(AuthContext);

  const [refresh, setRefresh] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  /* ================= EXPENSE DATA ================= */
  const [expenses, setExpenses] = useState([]);

  /* ================= DYNAMIC INCOME ================= */
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

  /* ================= AUTH ================= */
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

  /* ================= DASHBOARD ================= */
  return (
    <MainLayout>
      <div className="space-y-8 lg:space-y-10">

        {/* PAGE TITLE */}
        <div className="text-white">
          <h1 className="text-xl sm:text-2xl font-semibold">
            Expense Dashboard
          </h1>
          <p className="text-white/60 text-sm">
            Track and manage your spending
          </p>
        </div>

        {/* SUMMARY CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

          {/* BALANCE */}
          <div className="dashboard-card text-white p-6 lg:p-7">
            <p className="text-sm text-white/60">Total Balance</p>
            <h2
              className={`text-3xl font-bold mt-1 ${
                balance < 0 ? "text-red-400" : "text-green-400"
              }`}
            >
              ₹{balance.toLocaleString("en-IN")}
            </h2>
          </div>

          {/* INCOME */}
          <div className="dashboard-card text-white p-6">
            <p className="text-sm text-white/60">Income</p>

            <input
              type="number"
              value={income}
              onChange={(e) => setIncome(Number(e.target.value))}
              className="
                mt-2 w-full
                bg-white/10
                border border-white/20
                rounded-lg
                px-3 py-2
                text-white
                focus:outline-none
                focus:ring-2 focus:ring-blue-400
              "
              placeholder="Enter income"
            />
          </div>

          {/* EXPENSES */}
          <div className="dashboard-card text-white p-6">
            <p className="text-sm text-white/60">Expenses</p>
            <h2 className="text-3xl font-bold text-red-400 mt-1">
              ₹{totalExpenses.toLocaleString("en-IN")}
            </h2>
          </div>

        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

          {/* FORM */}
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

          {/* LIST */}
          <div className="lg:col-span-2 dashboard-card">
            <div className="dashboard-card-header text-white">
              Recent Transactions
            </div>

            <div className="dashboard-card-body max-h-[420px] overflow-y-auto">
              <ExpenseList refresh={refresh} />
            </div>
          </div>

        </div>

      </div>
    </MainLayout>
  );
}

export default App;
