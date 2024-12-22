import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Upload, message } from "antd";
import { getResources, uploadResource } from "../api/api";

const ManageResources = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileList, setFileList] = useState([]);

  const fetchResources = async () => {
    setLoading(true);
    try {
      const { data } = await getResources(1); // Replace 1 with the actual courseId
      setResources(data);
    } catch (error) {
      message.error("Failed to fetch resources.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  const handleUpload = async () => {
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append("file", file.originFileObj);
    });
    try {
      await uploadResource(formData);
      message.success("Resource uploaded successfully!");
      fetchResources();
      setIsModalOpen(false);
      setFileList([]);
    } catch (error) {
      message.error("Failed to upload resource.");
    }
  };

  const columns = [
    { title: "Resource ID", dataIndex: "id", key: "id" },
    { title: "Resource Name", dataIndex: "name", key: "name" },
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
      <h1>Manage Resources</h1>
      <Button type="primary" onClick={() => setIsModalOpen(true)}>
        Upload Resource
      </Button>
      <Table
        columns={columns}
        dataSource={resources}
        rowKey="id"
        loading={loading}
        style={{ marginTop: 16 }}
      />
      <Modal
        title="Upload New Resource"
        visible={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleUpload}
      >
        <Upload
          fileList={fileList}
          beforeUpload={(file) => {
            setFileList([...fileList, file]);
            return false;
          }}
          onRemove={(file) => {
            setFileList(fileList.filter((f) => f !== file));
          }}
        >
          <Button type="primary">Select File</Button>
        </Upload>
      </Modal>
    </div>
  );
};

export default ManageResources;
