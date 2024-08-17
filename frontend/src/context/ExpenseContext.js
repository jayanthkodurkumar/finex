import React, { createContext, useState, useEffect, useContext,  } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";


const ExpenseContext = createContext();


// Define the initial state
const initialState = {
  expenses: [],
  loading: false,
  error: null,
};

const ExpenseProvider = ({ children }) => {
  const [state, setState] = useState(initialState);
  const { user } = useContext(AuthContext); // Get user from AuthContext

  const authToken = localStorage.getItem("token");

  const fetchExpenses = async () => {
    if (user) {
      setState({ ...state, loading: true });
      try {
        // console.log(authToken)
        const response = await axios.get("http://localhost:5000/api/expenses", {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        setState({ ...state, expenses: response.data, loading: false });
      } catch (error) {
        setState({
          ...state,
          error: "Failed to fetch expenses",
          loading: false,
        });
      }
    }
  };

  const addExpense = async (expense) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/expenses",
        expense,
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );
      setState({ ...state, expenses: [...state.expenses, response.data] });
    } catch (error) {
      setState({ ...state, error: "Failed to add expense" });
    }
  };

  const deleteExpense = async (id) => {
    try {
      console.log(id);
      await axios.delete(`http://localhost:5000/api/expenses/${id}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setState({
        ...state,
        expenses: state.expenses.filter((expense) => expense._id !== id),
      });
    } catch (error) {
      setState({ ...state, error: "Failed to delete expense" });
    }
  };

  const updateExpense = async (id, updatedExpense) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/expenses/${id}`,
        updatedExpense,
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );
      setState({
        ...state,
        expenses: state.expenses.map((expense) =>
          expense._id === id ? response.data : expense
        ),
      });
    } catch (error) {
      setState({ ...state, error: "Failed to update expense" });
    }
  };

  // Step 3: Handle side effects using useEffect
  useEffect(() => {
    fetchExpenses();
  }, [user]);

  // Step 4: Return UI with all the above as props and {children}
  return (
    <ExpenseContext.Provider
      value={{
        expenses: state.expenses,
        loading: state.loading,
        error: state.error,
        addExpense,
        deleteExpense,
        updateExpense,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};

export { ExpenseContext, ExpenseProvider };
