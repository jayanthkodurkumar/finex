const Expense = require("../models/Expense");

// Add a new expense
const addExpense = async (req, res) => {
  const { description, amount, category } = req.body;

  const expense = new Expense({
    user: req.user._id,
    description,
    amount,
    category,
  });

  const createdExpense = await expense.save();
  res.status(201).json(createdExpense);
};

// Get all expenses for the logged-in user
const getExpenses = async (req, res) => {
  const expenses = await Expense.find({ user: req.user._id });
  res.json(expenses);
};

// Update an expense
const updateExpense = async (req, res) => {
  const expense = await Expense.findById(req.params.id);

  if (expense && expense.user.toString() === req.user._id.toString()) {
    expense.description = req.body.description || expense.description;
    expense.amount = req.body.amount || expense.amount;
    expense.category = req.body.category || expense.category;

    const updatedExpense = await expense.save();
    res.json(updatedExpense);
  } else {
    res.status(404).json({ message: "Expense not found or user not authorized" });
  }
};

// Delete an expense
const deleteExpense = async (req, res) => {
  const expense = await Expense.findById(req.params.id);

  if (expense && expense.user.toString() === req.user._id.toString()) {
    await expense.deleteOne({_id:req.params.id});
    res.json({ message: "Expense removed" });
  } else {
    res.status(404).json({ message: "Expense not found or user not authorized" });
  }
};

module.exports = {
  addExpense,
  getExpenses,
  updateExpense,
  deleteExpense,
};
