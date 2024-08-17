import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from "react-router-dom";
import { ExpenseContext } from '../context/ExpenseContext';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";

const HomePage = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
   
  useEffect( () => {
    // Check if user exists in localStorage or context
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      
      navigate("/login");
    }
  }, []);


  

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

  if (!expenses || expenses.length === 0) {
    return <div>No expenses found. Please add some expenses.</div>;
  }

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <>
    {}
      <Container className="my-5">
        <Row className="mb-4">
          <Col md={6}>
            <h2 className="mb-4">Add Expense</h2>
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
              <Button type="submit" variant="success" className="btn-block">
                Add Expense
              </Button>
            </Form>
          </Col>
        </Row>

        <h2 className="mb-4">Expenses</h2>
        <ListGroup>
          {expenses.map((expense) => (
            <ListGroup.Item
              key={expense._id}
              className="d-flex justify-content-between align-items-center"
            >
              {editingId === expense._id ? (
                <Form onSubmit={handleUpdate} className="w-100">
                  <Row>
                    <Col md={4}>
                      <Form.Control
                        type="text"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Description"
                        required
                      />
                    </Col>
                    <Col md={3}>
                      <Form.Control
                        type="number"
                        name="amount"
                        value={formData.amount}
                        onChange={handleInputChange}
                        placeholder="Amount"
                        required
                      />
                    </Col>
                    <Col md={3}>
                      <Form.Control
                        type="text"
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        placeholder="Category"
                        required
                      />
                    </Col>
                    <Col md={2}>
                      <Button variant="success" type="submit" className="mr-2">
                        Save
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => setEditingId(null)}
                      >
                        Cancel
                      </Button>
                    </Col>
                  </Row>
                </Form>
              ) : (
                <>
                  <div>
                    {expense.description} - ${expense.amount} (
                    {expense.category})
                  </div>
                  <div>
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
                  </div>
                </>
              )}
            </ListGroup.Item>
          ))}
        </ListGroup>
        <Button variant="danger" className="mt-4" onClick={handleLogout}>
          Sign Out
        </Button>
      </Container>
    </>
  );
}

export default HomePage