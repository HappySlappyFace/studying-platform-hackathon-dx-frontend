import React from "react";
import { Layout, Menu } from "antd";
import { Outlet, useNavigate } from "react-router-dom";

const { Sider, Content } = Layout;

const TeacherDashboard = () => {
  const navigate = useNavigate();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider>
        <Menu theme="dark" mode="inline">
          <Menu.Item
            key="1"
            onClick={() => navigate("/teacher/manage-courses")}
          >
            Manage Courses
          </Menu.Item>
          <Menu.Item
            key="2"
            onClick={() => navigate("/teacher/manage-resources")}
          >
            Manage Resources
          </Menu.Item>
          <Menu.Item key="3" disabled>
            View Analytics (WIP)
          </Menu.Item>
          <Menu.Item key="4" disabled>
            Notifications (WIP)
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Content style={{ padding: "24px" }}>
          <h1>Welcome to the Teacher Dashboard</h1>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default TeacherDashboard;
