import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from "react-router-dom";
import { ExpenseContext } from '../context/ExpenseContext';

const HomePage = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const { expenses,addExpense, loading, error, deleteExpense, updateExpense } =
    useContext(ExpenseContext);
  //  console.log(expenses)
  const [newExpenseData, setNewExpenseData] = useState({
    description: "",
    amount: "",
    category: "",
  }); // For adding new expenses

  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    category: "",
  });

  const startEditing = (expense) => {
    setEditingId(expense._id);
    setFormData({
      description: expense.description,
      amount: expense.amount,
      category: expense.category,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


const handleNewExpenseChange = (e) => {
  const { name, value } = e.target;
  setNewExpenseData((prevData) => ({
    ...prevData,
    [name]: value,
  }));
};



  const handleAddExpense = (e) => {
    e.preventDefault();
    addExpense(newExpenseData);
    setNewExpenseData({ description: "", amount: "", category: "" });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    updateExpense(editingId, formData);
    setEditingId(null);
    setFormData({ description: "", amount: "", category: "" });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div>
      <form onSubmit={handleAddExpense}>
        <input
          type="text"
          name="description"
          value={newExpenseData.description}
          onChange={handleNewExpenseChange}
          placeholder="Description"
          required
        />
        <input
          type="number"
          name="amount"
          value={newExpenseData.amount}
          onChange={handleNewExpenseChange}
          placeholder="Amount"
          required
        />
        <input
          type="text"
          name="category"
          value={newExpenseData.category}
          onChange={handleNewExpenseChange}
          placeholder="Category"
          required
        />
        <button type="submit">Add Expense</button>
      </form>

      <h2>Expenses</h2>

      <ul>
        {expenses.map((expense) => (
          <li key={expense._id}>
            {editingId === expense._id ? (
              <form onSubmit={handleUpdate}>
                <input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Description"
                />
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                  placeholder="Amount"
                />
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  placeholder="Category"
                />
                <button type="submit">Save</button>
                <button onClick={() => setEditingId(null)}>Cancel</button>
              </form>
            ) : (
              <>
                {expense.description} - ${expense.amount} ({expense.category})
                <button onClick={() => deleteExpense(expense._id)}>
                  Delete
                </button>
                <button onClick={() => startEditing(expense)}>Update</button>
              </>
            )}
          </li>
        ))}
      </ul>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default HomePage