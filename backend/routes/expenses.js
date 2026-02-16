const express = require("express");
const db = require("../db");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// GET expenses
router.get("/", authMiddleware, async (req, res) => {
  const [rows] = await db.query(
    "SELECT * FROM expenses WHERE user_id=? ORDER BY created_at DESC",
    [req.user.id]
  );

  res.json(rows);
});

// ADD expense
router.post("/", authMiddleware, async (req, res) => {
  const { title, amount } = req.body;

  await db.query(
    "INSERT INTO expenses (user_id, title, amount) VALUES (?, ?, ?)",
    [req.user.id, title, amount]
  );

  res.json({ message: "Expense added" });
});

// DELETE expense
router.delete("/:id", authMiddleware, async (req, res) => {
  await db.query(
    "DELETE FROM expenses WHERE id=? AND user_id=?",
    [req.params.id, req.user.id]
  );

  res.json({ message: "Expense deleted" });
});

module.exports = router;
