import React from "react";
import { Card, Button } from "antd";

const ResourceCard = ({ resource, onMarkCompleted }) => {
  return (
    <Card title={resource.title} style={{ marginBottom: 16 }}>
      <p>{resource.description}</p>
      <Button type="primary" onClick={() => onMarkCompleted(resource.id)}>
        Mark as Completed
      </Button>
    </Card>
  );
};

export default ResourceCard;
