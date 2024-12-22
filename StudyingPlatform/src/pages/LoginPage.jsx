import React, { useState, useContext } from "react";
import { Form, Input, Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import { login } from "../api/api";
import { AuthContext } from "../context/AuthContext";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const { login: setRole } = useContext(AuthContext);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const { data } = await login(values);

      // Save token and role to localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);

      // Update context
      setRole(data.role);

      // Redirect based on role
      if (data.role === "ROLE_TEACHER") {
        navigate("/teacher/dashboard");
      } else {
        navigate("/student/dashboard");
      }
      message.success("Logged in successfully");
    } catch (error) {
      message.error("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 300, margin: "100px auto" }}>
      <h2>Login</h2>
      <Form onFinish={onFinish} layout="vertical">
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Button type="primary" htmlType="submit" block loading={loading}>
          Login
        </Button>
      </Form>
    </div>
  );
};

export default LoginPage;
