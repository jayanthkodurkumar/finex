const express = require("express");
const {
  addExpense,
  getExpenses,
  updateExpense,
  deleteExpense,
} = require("../controller/expenseController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

// Add expense
router.post("/", protect, addExpense);

// get expense
router.get("/", protect, getExpenses);

// update expense
router.put("/:id", protect, updateExpense);

// delete expense
router.delete("/:id", protect, deleteExpense);

module.exports = router;
