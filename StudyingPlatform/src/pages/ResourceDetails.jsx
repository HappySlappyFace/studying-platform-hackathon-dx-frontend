import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography, Spin, message } from "antd";
import { getVideoUrl } from "../api/api";

const { Title, Paragraph } = Typography;

const ResourceDetails = () => {
  const { resourceId } = useParams();
  const [videoUrl, setVideoUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideoUrl = async () => {
      try {
        const { data } = await getVideoUrl(resourceId);
        setVideoUrl(data);
      } catch (error) {
        message.error("Failed to load video URL.");
      } finally {
        setLoading(false);
      }
    };

    fetchVideoUrl();
  }, [resourceId]);

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!videoUrl) {
    return <Paragraph>Video not available.</Paragraph>;
  }

  return (
    <div style={{ padding: "24px" }}>
      <Title level={2}>Resource Video</Title>
      <div>
        <video
          controls
          style={{ width: "100%", maxHeight: "500px", borderRadius: "8px" }}
          src={videoUrl} // Use the dynamically fetched URL
        />
      </div>
    </div>
  );
};

export default ResourceDetails;
