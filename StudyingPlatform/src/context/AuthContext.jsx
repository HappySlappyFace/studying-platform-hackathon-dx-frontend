import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [role, setRole] = useState(null);

  useEffect(() => {
    // Retrieve token or role from localStorage if needed
    const token = localStorage.getItem("token");
    if (!token) {
      setRole(null);
      return;
    }
    // In a real app, decode token or fetch user info to determine role
    // For now, we’ll just store it in localStorage after login
    // Example: localStorage.setItem('role', data.role)
    // Then read it here:
    const storedRole = localStorage.getItem("role");
    if (storedRole) {
      setRole(storedRole);
    }
  }, []);

  const login = (newRole) => {
    setRole(newRole);
    localStorage.setItem("role", newRole);
  };

  const logout = () => {
    setRole(null);
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  };

  return (
    <AuthContext.Provider value={{ role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
