import React, { useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";

export default function Analytics({ expenses }) {

  /* ---------- CATEGORY DETECTOR ---------- */
  const getCategory = (title = "") => {
    const t = title.toLowerCase();

    if (t.includes("food") || t.includes("pizza") || t.includes("restaurant"))
      return "Food";

    if (t.includes("uber") || t.includes("taxi") || t.includes("bus"))
      return "Transport";

    if (t.includes("shop") || t.includes("amazon"))
      return "Shopping";

    if (t.includes("bill") || t.includes("electric") || t.includes("rent"))
      return "Bills";

    return "Other";
  };

  /* ---------- GROUP EXPENSES ---------- */
  const chartData = useMemo(() => {
    const grouped = {};

    expenses.forEach((exp) => {
      const category = getCategory(exp.title);

      grouped[category] =
        (grouped[category] || 0) + Number(exp.amount);
    });

    return Object.entries(grouped).map(([name, value]) => ({
      name,
      value,
    }));
  }, [expenses]);

  const COLORS = [
    "#60a5fa",
    "#34d399",
    "#f87171",
    "#fbbf24",
    "#a78bfa",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <h1 className="text-2xl font-semibold text-white">
        Spending Analytics
      </h1>

      <div className="dashboard-card p-6 h-[420px]">

        {chartData.length === 0 ? (
          <p className="text-white/60 text-center mt-20">
            Add expenses to see analytics 📊
          </p>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                outerRadius={130}
                label
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        )}

      </div>
    </motion.div>
  );
}
