import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SharedLayout from "./components/SharedLayout";
import StudentDashboard from "./pages/StudentDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import ManageCourses from "./pages/ManageCourses";
import ManageResources from "./pages/ManageResources";
import StudentCourses from "./pages/StudentCourses";
import CourseDetails from "./pages/CourseDetails";
import ResourceDetails from "./pages/ResourceDetails";
const App = () => {
  return (
    <Router>
      <Routes>
        {/* Shared layout for students */}
        <Route path="/student" element={<SharedLayout role="student" />}>
          <Route path="dashboard" element={<StudentDashboard />} />
          <Route path="courses" element={<StudentCourses />} />
          <Route path="profile" element={<div>Student Profile</div>} />
          <Route path="activity" element={<div>Student Activity</div>} />
          <Route
            path="/student/courses/:courseId"
            element={<CourseDetails />}
          />
          <Route
            path="/student/resource/:resourceId"
            element={<ResourceDetails />}
          />
          <Route
            path="/student/courses/:courseId/resource/:resourceId"
            element={<ResourceDetails />}
          />
        </Route>

        {/* Shared layout for teachers */}
        <Route path="/teacher" element={<SharedLayout role="teacher" />}>
          <Route path="dashboard" element={<TeacherDashboard />} />
          <Route path="manage-courses" element={<ManageCourses />} />
          <Route path="manage-resources" element={<ManageResources />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
