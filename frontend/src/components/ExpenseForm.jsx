import React, { useState } from "react";
import API from "../api";

function ExpenseForm({ onExpenseAdded }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [liveMsg, setLiveMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const numericAmount = parseFloat(amount);

      if (Number.isNaN(numericAmount) || numericAmount <= 0) {
        alert("Please enter a valid positive amount");
        return;
      }

      await API.post("/expenses", {
        title: title.trim(),
        amount: numericAmount,
      });

      setTitle("");
      setAmount("");

      if (onExpenseAdded) onExpenseAdded();

      setLiveMsg("Expense added");
      setTimeout(() => setLiveMsg(""), 2000);
    } catch (err) {
      console.error(err);
      alert("Failed to add expense");
    }
  };

  return (
    <div aria-live="polite" className="w-full">

      <form onSubmit={handleSubmit}>
        <div className="space-y-4">

          {/* Title */}
          <div>
            <label
              htmlFor="exp-title"
              className="block text-sm text-slate-600 mb-1 font-medium"
            >
              Title
            </label>

            <input
              id="exp-title"
              type="text"
              placeholder="e.g., Groceries"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="
                w-full px-4 py-2.5
                rounded-lg
                border border-slate-300
                focus:outline-none
                focus:ring-2 focus:ring-blue-400
                focus:border-blue-400
                text-slate-800
              "
            />
          </div>

          {/* Amount */}
          <div>
            <label
              htmlFor="exp-amount"
              className="block text-sm text-slate-600 mb-1 font-medium"
            >
              Amount (₹)
            </label>

            <input
              id="exp-amount"
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              aria-label="Amount in rupees"
              className="
                w-full px-4 py-2.5
                rounded-lg
                border border-slate-300
                focus:outline-none
                focus:ring-2 focus:ring-blue-400
                focus:border-blue-400
                text-slate-800
              "
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="
              w-full
              py-3
              rounded-lg
              font-semibold
              text-white
              transition-all duration-200
              bg-[#0b2545]
              hover:bg-[#081a30]
              active:scale-[0.98]
              shadow-md
            "
          >
            Add Expense
          </button>

        </div>
      </form>

      {/* Screen reader live region */}
      <div className="sr-only" aria-live="polite">
        {liveMsg}
      </div>

    </div>
  );
}

export default ExpenseForm;
