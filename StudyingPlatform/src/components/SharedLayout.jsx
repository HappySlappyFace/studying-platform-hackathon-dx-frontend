import React from "react";
import { Layout, Menu } from "antd";
import { useNavigate, Outlet } from "react-router-dom";
import {
  LineChartOutlined,
  BookOutlined,
  UserOutlined,
  TeamOutlined,
  SettingOutlined,
} from "@ant-design/icons";
// import "./SharedLayout.css";

const { Sider, Content } = Layout;

const SharedLayout = ({ role }) => {
  const navigate = useNavigate();

  // Define role-based menu items
  const menuItems = [
    { key: "dashboard", icon: <LineChartOutlined />, label: "Dashboard" },
    { key: "courses", icon: <BookOutlined />, label: "Courses" },
    ...(role === "teacher"
      ? [
          { key: "tasks", icon: <TeamOutlined />, label: "Manage Tasks" },
          { key: "settings", icon: <SettingOutlined />, label: "Settings" },
        ]
      : [
          { key: "profile", icon: <UserOutlined />, label: "Profile" },
          { key: "activity", icon: <SettingOutlined />, label: "Activity" },
        ]),
  ];

  // Handle navigation
  const handleMenuClick = (key) => {
    navigate(`/${role}/${key}`);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sider
        width={240}
        style={{
          background: "#001529",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
        }}
      >
        <div
          className="logo"
          style={{ color: "white", padding: "16px", fontSize: "20px" }}
        >
          e-Learning
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["dashboard"]}
          items={menuItems}
          onClick={({ key }) => handleMenuClick(key)}
        />
      </Sider>

      {/* Main Content */}
      <Layout style={{ marginLeft: 240 }}>
        <Content style={{ padding: "24px", background: "#f0f2f5" }}>
          <Outlet /> {/* Dynamically renders child routes */}
        </Content>
      </Layout>
    </Layout>
  );
};

export default SharedLayout;
