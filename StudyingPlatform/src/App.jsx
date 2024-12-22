import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthProvider from "./context/AuthContext";
import LoginPage from "./pages/LoginPage";
import TeacherDashboard from "./pages/TeacherDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import CourseDetails from "./pages/CourseDetails";
import "antd/dist/reset.css"; // or import 'antd/dist/antd.css'; depending on version
import "./styles/global.css";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Teacher */}
          <Route path="/teacher/dashboard" element={<TeacherDashboard />}>
            {/* Nested Teacher Routes if needed */}
            {/* <Route path="manage-courses" element={<ManageCourses />} /> */}
            {/* <Route path="manage-resources" element={<ManageResources />} /> */}
          </Route>

          {/* Student */}
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route
            path="/student/courses/:courseId"
            element={<CourseDetails />}
          />

          {/* 404 Fallback */}
          <Route path="*" element={<div>Page not found</div>} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
