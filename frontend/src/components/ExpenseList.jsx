import React, { useEffect, useState } from "react";
import API from "../api";
import { motion, AnimatePresence } from "framer-motion";

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

          <AnimatePresence>
            {expenses.map((exp) => (

              <motion.div
                key={exp.id}
                role="listitem"
                initial={{ opacity: 0, y: 40 }}
animate={{ opacity: 1, y: 0 }}
exit={{ opacity: 0, x: -80 }}
transition={{ duration: 0.4, ease: "easeOut" }}

                layout
                className="
                  flex flex-col sm:flex-row
                  sm:items-center
                  justify-between
                  gap-3
                  bg-white
                  rounded-lg
                  px-4 py-3
                  border border-slate-200
                  shadow-sm
                  hover:shadow-md
                  transition
                "
              >
                {/* LEFT */}
                <div className="font-semibold text-slate-800 wrap-break-word">
                  {exp.title}
                </div>

                {/* RIGHT */}
                <div className="flex items-center justify-between sm:justify-end gap-4">
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

              </motion.div>

            ))}
          </AnimatePresence>

        </div>
      )}

    </div>
  );
}

export default ExpenseList;
