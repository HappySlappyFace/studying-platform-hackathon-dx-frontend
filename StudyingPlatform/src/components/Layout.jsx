import React from "react";
import { Layout as AntLayout } from "antd";
import "../styles/global.css";

const { Header, Content, Sider } = AntLayout;

const Layout = ({ children, siderContent }) => {
  return (
    <AntLayout style={{ minHeight: "100vh" }}>
      {siderContent && (
        <Sider width={200} style={{ background: "#fff" }}>
          {siderContent}
        </Sider>
      )}
      <AntLayout>
        <Header style={{ background: "#001529", color: "#fff" }}>
          <h1 style={{ color: "#fff" }}>My Learning Platform</h1>
        </Header>
        <Content style={{ margin: "24px" }}>{children}</Content>
      </AntLayout>
    </AntLayout>
  );
};

export default Layout;
