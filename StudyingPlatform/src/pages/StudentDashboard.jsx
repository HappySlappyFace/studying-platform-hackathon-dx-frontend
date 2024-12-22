import React, { useEffect, useState } from "react";
import { Row, Col, message } from "antd";
import { getCourses } from "../api/api";
import CourseCard from "../components/CourseCard.jsx";
import { useNavigate } from "react-router-dom";

const StudentDashboard = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await getCourses();
        setCourses(data);
      } catch (error) {
        message.error("Failed to fetch courses.");
      }
    };

    fetchCourses();
  }, []);

  const handleCourseClick = (courseId) => {
    navigate(`/student/courses/${courseId}`);
  };

  return (
    <div>
      <h1>Student Dashboard</h1>
      <Row gutter={[16, 16]}>
        {courses.map((course) => (
          <Col key={course.id} xs={24} sm={12} md={8} lg={6}>
            <CourseCard
              course={course}
              onClick={() => handleCourseClick(course.id)}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default StudentDashboard;
