import React from "react";
import { Card } from "antd";

const CourseCard = ({ course, onClick }) => {
  return (
    <Card
      title={course.title}
      hoverable
      style={{ marginBottom: 16 }}
      onClick={onClick}
    >
      <p>{course.description}</p>
    </Card>
  );
};

export default CourseCard;
