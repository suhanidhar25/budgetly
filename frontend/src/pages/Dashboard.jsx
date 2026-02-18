import React from "react";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import { motion } from "framer-motion";
import CountUp from "react-countup";

export default function Dashboard({
  balance,
  income,
  setIncome,
  totalExpenses,
  refresh,
  setRefresh,
}) {
  return (
    <motion.div className="space-y-8">

      {/* TITLE */}
      <div>
        <h1 className="text-xl sm:text-2xl font-semibold">
          Expense Dashboard
        </h1>
        <p className="text-white/60 text-sm">
          Track and manage your spending
        </p>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* BALANCE */}
        <div className="dashboard-card text-white p-6">
          <p className="text-sm text-white/60">Balance</p>
          <h2 className="text-3xl font-bold text-green-400">
            <CountUp
              end={balance}
              duration={0.6}
              separator=","
              prefix="₹"
            />
          </h2>
        </div>

        {/* INCOME */}
        <div className="dashboard-card text-white p-6">
          <p className="text-sm text-white/60">Income</p>

          <input
            type="number"
            value={income}
            onChange={(e) => setIncome(Number(e.target.value))}
            className="mt-2 w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white"
          />
        </div>

        {/* EXPENSES */}
        <div className="dashboard-card text-white p-6">
          <p className="text-sm text-white/60">Expenses</p>
          <h2 className="text-3xl font-bold text-red-400">
            <CountUp
              end={totalExpenses}
              duration={0.6}
              separator=","
              prefix="₹"
            />
          </h2>
        </div>
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

        <div className="lg:col-span-1 dashboard-card">
          <div className="dashboard-card-header">Add Expense</div>
          <div className="dashboard-card-body">
            <ExpenseForm
              onExpenseAdded={() => setRefresh(!refresh)}
            />
          </div>
        </div>

        <div className="lg:col-span-2 dashboard-card">
          <div className="dashboard-card-header">
            Recent Transactions
          </div>
          <div className="dashboard-card-body max-h-[420px] overflow-y-auto">
            <ExpenseList refresh={refresh} />
          </div>
        </div>

      </div>

    </motion.div>
  );
}
