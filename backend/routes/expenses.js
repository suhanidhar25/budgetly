const express = require("express");
const router = express.Router();
const db = require("../db");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, async (req, res) => {
  try {
    const [expenses] = await db.query(
      "SELECT * FROM expenses WHERE user_id = ? ORDER BY created_at DESC",
      [req.user.id]
    );
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, amount, category } = req.body;

    await db.query(
      "INSERT INTO expenses (user_id, title, amount, category) VALUES (?, ?, ?, ?)",
      [req.user.id, title, amount, category]
    );

    res.json({ message: "Expense added successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;