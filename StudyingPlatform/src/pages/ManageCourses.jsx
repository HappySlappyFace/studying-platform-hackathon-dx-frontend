import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, message } from "antd";
import { getCourses, createCourse, getTeacherCourses } from "../api/api";

const ManageCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const { data } = await getTeacherCourses();
      setCourses(data);
    } catch (error) {
      message.error("Failed to fetch courses.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddCourse = async (values) => {
    try {
      await createCourse(values);
      message.success("Course added successfully!");
      fetchCourses();
      setIsModalOpen(false);
      form.resetFields();
    } catch (error) {
      message.error("Failed to add course.");
    }
  };

  const columns = [
    { title: "Course ID", dataIndex: "id", key: "id" },
    { title: "Course Name", dataIndex: "title", key: "title" },
    { title: "Description", dataIndex: "description", key: "description" },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Button type="link" danger>
          Delete
        </Button>
      ),
    },
  ];

  return (
    <div>
      <h1>Manage Courses</h1>
      <Button type="primary" onClick={() => setIsModalOpen(true)}>
        Add Course
      </Button>
      <Table
        columns={columns}
        dataSource={courses}
        rowKey="id"
        loading={loading}
        style={{ marginTop: 16 }}
      />
      <Modal
        title="Add New Course"
        visible={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleAddCourse} layout="vertical">
          <Form.Item
            name="title"
            label="Course Name"
            rules={[
              { required: true, message: "Please enter the course name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[
              { required: true, message: "Please enter the description!" },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Add Course
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default ManageCourses;
