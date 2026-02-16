import React, { useEffect, useState } from "react";
import API from "../api";

function ExpenseList({ refresh }) {
  const [expenses, setExpenses] = useState([]);

  const fetchExpenses = async () => {
    try {
      const res = await API.get("/expenses");
      setExpenses(res.data || []);
    } catch (err) {
      console.error(err);
      alert("Failed to load expenses");
    }
  };

  const deleteExpense = async (id) => {
    try {
      await API.delete(`/expenses/${id}`);
      fetchExpenses();
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, [refresh]);

  const formatCurrency = (val) =>
    (Number(val) || 0).toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    });

  return (
  <div className="w-full">

    {/* CARD CONTAINER */}
    <div className="dashboard-card">

      {/* Card Header */}
      <div className="dashboard-card-header">
        Recent Expenses
      </div>

      {/* Card Body */}
      <div className="dashboard-card-body">

        {expenses.length === 0 ? (
          <div className="text-center py-10 text-slate-500">
            <div className="text-4xl mb-3">📋</div>
            <p className="font-medium">No expenses recorded yet</p>
            <p className="text-sm">
              Start by adding your first expense above
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {expenses.map((exp) => (
              <div
                key={exp.id}
                role="listitem"
                className="
                  flex flex-wrap items-center justify-between
                  bg-white
                  rounded-lg
                  px-4 py-3
                  border border-slate-200
                  shadow-sm
                  hover:shadow-md
                  transition
                "
              >
                {/* LEFT SIDE */}
                <div>
                  <div className="font-semibold text-slate-800">
                    {exp.title}
                  </div>
                </div>

                {/* RIGHT SIDE */}
                <div className="flex items-center gap-4 mt-2 sm:mt-0">

                  <div className="font-bold text-blue-700">
                    {formatCurrency(exp.amount)}
                  </div>

                  <button
                    onClick={() => deleteExpense(exp.id)}
                    aria-label={`Delete ${exp.title}`}
                    className="
                      px-3 py-1.5
                      rounded-md
                      text-sm font-semibold
                      bg-red-500
                      text-white
                      hover:bg-red-600
                      transition
                    "
                  >
                    Delete
                  </button>

                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>

  </div>
);

}

export default ExpenseList;
