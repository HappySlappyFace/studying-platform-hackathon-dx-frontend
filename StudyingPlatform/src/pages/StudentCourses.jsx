import React, { useEffect, useState } from "react";
import { Card, Row, Col, Spin, message } from "antd";
import { useNavigate } from "react-router-dom";
import { getCourses } from "../api/api";

const { Meta } = Card;

const StudentCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const { data } = await getCourses(); // Fetch courses from the backend
      setCourses(data);
    } catch (error) {
      message.error("Failed to fetch courses.");
    } finally {
      setLoading(false);
    }
  };

  const handleCardClick = (courseId) => {
    navigate(`/student/courses/${courseId}`);
  };

  return (
    <div>
      <h1>Available Courses</h1>
      <p>Explore and enroll in the courses that suit your interests.</p>

      {loading ? (
        <Spin size="large" style={{ display: "block", margin: "20px auto" }} />
      ) : (
        <Row gutter={[16, 16]}>
          {courses.map((course) => (
            <Col key={course.id} xs={24} sm={12} md={8} lg={6}>
              <Card
                hoverable
                style={{
                  height: "300px", // Fixed height for all cards
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
                cover={
                  <img
                    alt={course.title}
                    src={course.image || "https://via.placeholder.com/300"}
                    style={{
                      height: "150px",
                      objectFit: "cover",
                      borderTopLeftRadius: "8px",
                      borderTopRightRadius: "8px",
                    }}
                  />
                }
                onClick={() => handleCardClick(course.id)} // Navigate on click
              >
                <Meta
                  title={course.title}
                  description={
                    course.description.length > 60
                      ? `${course.description.substring(0, 60)}...`
                      : course.description
                  }
                />
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default StudentCourses;
