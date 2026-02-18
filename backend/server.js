const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const expenseRoutes = require("./routes/expenses");

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://budgetly-sigma.vercel.app"
    ],
    credentials: true,
  })
);


app.use(cors());
app.use(express.json());

app.get("/", (req, res) => { res.send("Backend is running ✅"); });

app.use("/api/auth", authRoutes);
app.use("/api/expenses", expenseRoutes);

const db = require("./db");

db.query("SELECT 1")
  .then(() => console.log("✅ DB CONNECTED"))
  .catch(err => console.log("❌ DB ERROR:", err));


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
