import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { ExpenseProvider } from "./context/ExpenseContext";
import NavToolbar from "./components/NavToolbar";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import ProfilePage from "./pages/Profile";

function App() {
  const {user} = useContext(AuthContext)
  return (
    <Router>
      <div className="App">
        <ExpenseProvider>
          {user?.email && <NavToolbar />}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>{" "}
        </ExpenseProvider>
      </div>
    </Router>
  );
}

export default App;
