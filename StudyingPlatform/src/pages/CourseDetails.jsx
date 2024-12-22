import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getCourseDetails,
  getResources,
  markResourceCompleted,
} from "../api/api";
import { message } from "antd";
import ResourceCard from "../components/ResourceCard";

const CourseDetails = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [resources, setResources] = useState([]);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const { data } = await getCourseDetails(courseId);
        setCourse(data);
      } catch (error) {
        message.error("Failed to fetch course details.");
      }
    };

    const fetchCourseResources = async () => {
      try {
        const { data } = await getResources(courseId);
        setResources(data);
      } catch (error) {
        message.error("Failed to fetch resources.");
      }
    };

    fetchCourseDetails();
    fetchCourseResources();
  }, [courseId]);

  const handleMarkCompleted = async (resourceId) => {
    try {
      await markResourceCompleted(courseId, resourceId); // Pass values directly
      message.success("Resource marked as completed!");
    } catch (error) {
      message.error("Failed to mark resource as completed.");
    }
  };

  if (!course) {
    return <div>Loading course details...</div>;
  }

  return (
    <div>
      <h1>{course.title}</h1>
      <p>{course.description}</p>

      <h2>Resources</h2>
      {resources.map((res) => (
        <ResourceCard
          key={res.id}
          resource={res}
          onMarkCompleted={handleMarkCompleted}
        />
      ))}
    </div>
  );
};

export default CourseDetails;
