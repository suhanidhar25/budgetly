import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Home({ balance, totalExpenses }) {

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good Morning ☀️" :
    hour < 18 ? "Good Afternoon 🌤️" :
    "Good Evening 🌙";

    /* -------- SMART INSIGHTS -------- */

const insight = React.useMemo(() => {
  if (!totalExpenses || totalExpenses === 0) {
    return "Start adding expenses to see insights 📊";
  }

  if (balance < 0) {
    return "⚠ You have exceeded your balance!";
  }

  if (totalExpenses > balance * 0.8) {
    return "⚠ You are close to overspending this month.";
  }

  if (totalExpenses < balance * 0.3) {
    return "✅ Great job! Your spending is well controlled.";
  }

  return "📊 Your spending looks balanced.";
}, [totalExpenses, balance]);


  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Greeting */}
      <div>
        <h1 className="text-3xl font-bold text-white">
          {greeting}
        </h1>
        <p className="text-white/60 mt-1">
          Here's your financial snapshot
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid sm:grid-cols-2 gap-6">

        <div className="dashboard-card p-6 text-white">
          <p className="text-white/60 text-sm">Current Balance</p>
          <h2 className="text-3xl font-bold text-green-400 mt-2">
            ₹{balance.toLocaleString("en-IN")}
          </h2>
        </div>

        <div className="dashboard-card p-6 text-white">
          <p className="text-white/60 text-sm">Total Expenses</p>
          <h2 className="text-3xl font-bold text-red-400 mt-2">
            ₹{totalExpenses.toLocaleString("en-IN")}
          </h2>
        </div>

      </div>

      {/* SMART INSIGHT CARD */}
<div className="dashboard-card p-6 text-white">
  <h2 className="text-lg font-semibold mb-2">
    Smart Insight
  </h2>

  <p className="text-white/80">
    {insight}
  </p>
</div>


      {/* Quick Action */}
      <Link
        to="/dashboard"
        className="inline-block primary-btn text-center"
      >
        Go to Dashboard →
      </Link>

    </motion.div>
  );
}
