import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { ExpenseProvider } from "./context/ExpenseContext";

function App() {
  return (
    <Router>
      <div className="App">
        <ExpenseProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>{" "}
        </ExpenseProvider>
      </div>
    </Router>
  );
}

export default App;
