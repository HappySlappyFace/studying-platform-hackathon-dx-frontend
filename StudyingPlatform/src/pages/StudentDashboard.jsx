import React from "react";
import { Card, Progress, Row, Col, Typography, Divider } from "antd";

const { Title, Text } = Typography;

const StudentDashboard = () => {
  return (
    <div>
      <Title level={3}>Welcome back, Student</Title>
      <Text>Your current courses and progress.</Text>

      <Row gutter={[16, 16]} style={{ marginTop: "24px" }}>
        <Col span={8}>
          <Card>
            <Text>Complete Course</Text>
            <Title level={4}>28</Title>
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Text>In Progress Course</Text>
            <Title level={4}>14</Title>
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Text>Upcoming</Text>
            <Title level={4}>91</Title>
          </Card>
        </Col>
      </Row>

      <Divider orientation="left" style={{ marginTop: "32px" }}>
        My Homework
      </Divider>
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Text>Web Design</Text>
          <Progress percent={55} />
        </Col>
        <Col span={6}>
          <Text>Ads Facebook</Text>
          <Progress percent={75} />
        </Col>
        <Col span={6}>
          <Text>Graphic Design</Text>
          <Progress percent={70} />
        </Col>
        <Col span={6}>
          <Text>Content Creator</Text>
          <Progress percent={90} />
        </Col>
      </Row>
    </div>
  );
};

export default StudentDashboard;
