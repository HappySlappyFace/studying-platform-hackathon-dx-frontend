import React from "react";
import { Card, Button } from "antd";

const ResourceCard = ({ resource, onMarkCompleted, completed, onClick }) => {
  return (
    <Card
      title={resource.title}
      style={{ marginBottom: 16, cursor: "pointer" }}
      onClick={onClick} // Make the card clickable
    >
      <p>{resource.description}</p>
      <Button
        type="primary"
        onClick={(e) => {
          e.stopPropagation(); // Prevent triggering the card's onClick
          onMarkCompleted();
        }}
        disabled={completed}
      >
        {completed ? "Completed" : "Mark as Completed"}
      </Button>
    </Card>
  );
};

export default ResourceCard;
