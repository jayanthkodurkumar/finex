import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';  
import axios from "axios";

// Create the AuthContext
const AuthContext = createContext();

// Create the AuthProvider component
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  

  // Load user and token from local storage when the app starts
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      setUser(storedUser);
      setToken(storedToken);
    }
  }, []);

  // Handle user login
  const login = async (email, password) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        {
          email,
          password,
        }
      );

      const { data } = response;
      const userData = { email: data.email }; // Adjust based on your API response
      const tokenData = data.token; // JWT token from your API

      setUser(userData);
      setToken(tokenData);
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", tokenData);
      
    } catch (error) {
      console.error("Login failed:", error);
      // Handle login error (e.g., show an error message to the user)
    }
  };

  // Handle user logout
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
