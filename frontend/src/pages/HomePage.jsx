import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { ExpenseContext } from "../context/ExpenseContext";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";

const HomePage = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      navigate("/login");
    }
  }, [navigate]);

  const { expenses, addExpense, loading, error, deleteExpense, updateExpense } =
    useContext(ExpenseContext);

  const [newExpenseData, setNewExpenseData] = useState({
    description: "",
    amount: "",
    category: "",
  });

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
    <>
      <Container className="my-5">
        <Row className="mb-4">
          <Col md={6} className="mx-auto">
            <h2 className="mb-4 text-center">Add Expense</h2>
            <Form onSubmit={handleAddExpense}>
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  size="lg"
                  name="description"
                  value={newExpenseData.description}
                  placeholder="Description"
                  onChange={handleNewExpenseChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Amount</Form.Label>
                <Form.Control
                  type="number"
                  size="lg"
                  name="amount"
                  value={newExpenseData.amount}
                  onChange={handleNewExpenseChange}
                  placeholder="Amount"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type="text"
                  name="category"
                  size="lg"
                  value={newExpenseData.category}
                  onChange={handleNewExpenseChange}
                  placeholder="Category"
                  required
                />
              </Form.Group>
              <div className="d-flex justify-content-center mt-5">
                <Button type="submit" variant="success" className="text-center">
                  Add Expense
                </Button>
              </div>
            </Form>
          </Col>
        </Row>

        <h2 className="mt-5 mb-4 text-center">Your Expenses</h2>
        {!expenses || expenses.length === 0 ? (
          <div>No expenses found. Please add some expenses.</div>
        ) : (
          <Table striped bordered hover responsive className="text-center">
            <thead>
              <tr>
                <th>Description</th>
                <th>Amount</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense) => (
                <tr key={expense._id}>
                  {editingId === expense._id ? (
                    <>
                      <td>
                        <Form.Control
                          type="text"
                          name="description"
                          value={formData.description}
                          onChange={handleInputChange}
                          placeholder="Description"
                          required
                        />
                      </td>
                      <td>
                        <Form.Control
                          type="number"
                          name="amount"
                          value={formData.amount}
                          onChange={handleInputChange}
                          placeholder="Amount"
                          required
                        />
                      </td>
                      <td>
                        <Form.Control
                          type="text"
                          name="category"
                          value={formData.category}
                          onChange={handleInputChange}
                          placeholder="Category"
                          required
                        />
                      </td>
                      <td>
                        <Button
                          variant="success"
                          onClick={handleUpdate}
                          className="me-2"
                        >
                          Save
                        </Button>
                        <Button
                          variant="danger"
                          onClick={() => setEditingId(null)}
                        >
                          Cancel
                        </Button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{expense.description}</td>
                      <td>${expense.amount}</td>
                      <td>{expense.category}</td>
                      <td>
                        <Button
                          variant="warning"
                          className="me-2"
                          onClick={() => startEditing(expense)}
                        >
                          Update
                        </Button>
                        <Button
                          variant="danger"
                          onClick={() => deleteExpense(expense._id)}
                        >
                          Delete
                        </Button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </Table>
        )}
        
      </Container>
    </>
  );
};

export default HomePage;
