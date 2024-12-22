import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCourseProgress } from "../api/api";
import { message, Typography, Row, Col, Spin, Divider } from "antd";
import ResourceCard from "../components/ResourceCard";

const { Title, Paragraph } = Typography;

const CourseDetails = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProgressForCourse = async () => {
      try {
        const { data } = await getCourseProgress(courseId);
        const formattedResources = data.map((progress) => ({
          ...progress.resource,
          completed: progress.completed,
        }));
        setResources(formattedResources);
      } catch (error) {
        message.error("Failed to fetch course progress.");
      } finally {
        setLoading(false);
      }
    };

    fetchProgressForCourse();
  }, [courseId]);

  const handleResourceClick = (resourceId) => {
    navigate(`/student/courses/${courseId}/resource/${resourceId}`); // Ensure courseId is passed
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={{ padding: "24px" }}>
      <Title level={2}>Course Resources</Title>
      <Divider orientation="left">Resources</Divider>
      <Row gutter={[16, 16]}>
        {resources.length > 0 ? (
          resources.map((resource) => (
            <Col key={resource.id} xs={24} sm={12} md={8}>
              <ResourceCard
                resource={resource}
                completed={resource.completed}
                onMarkCompleted={() => {}}
                onClick={() => handleResourceClick(resource.id)} // Navigate on click
              />
            </Col>
          ))
        ) : (
          <Paragraph>No resources available for this course.</Paragraph>
        )}
      </Row>
    </div>
  );
};

export default CourseDetails;
