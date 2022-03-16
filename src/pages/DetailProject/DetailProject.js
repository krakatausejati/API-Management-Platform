import React, { useState } from "react";
import { Table, Breadcrumb, Button, Input, Form, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";

function DetailProject() {
  let data = useLocation();
  const breadcrumb = data.state.breadcrumb;
  const dataSource = [
    {
      key: "1",
      no: "1",
      name: "BI",
      sum_api: "12",
      created_at: "12-02-2022 21:04:25",
      created_by: "syihab",
      detail: "...",
    },
    {
      key: "2",
      no: "2",
      name: "Senopati",
      sum_api: "9",
      created_at: "12-02-2022 21:04:25",
      created_by: "atauu",
      detail: "...",
    },
  ];

  const columns = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (data) => (
        <>
          <Link
            to={{
              pathname: "/detail-group",
              state: { breadcrumb: "Group", name: data },
            }}
          >
            {data}
          </Link>
        </>
      ),
    },
    {
      title: "Total of API",
      dataIndex: "sum_api",
      key: "sum_api",
    },
    {
      title: "Created at",
      dataIndex: "created_at",
      key: "created_at",
    },
    {
      title: "Project Owner",
      dataIndex: "created_by",
      key: "created_by",
    },
    {
      title: "",
      dataIndex: "detail",
      key: "detail",
    },
  ];

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      {/* Modal */}
      <Modal
        title='Add Group'
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key='add-group' onClick={handleOk} type='primary'>
            Add Group
          </Button>,
        ]}
      >
        <Form layout='vertical'>
          <Form.Item label='Group Name' style={{ width: "100%" }}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      {/* Modal */}

      <div className='breadcrumb'>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to={`/${breadcrumb.toLowerCase()}`}>{breadcrumb}</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>{data.state.name}</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className='header-datatable'>
        <h1>List Group of {data.state.name}</h1>
        <div className='add-field'>
          <Button
            icon={<PlusOutlined />}
            type='primary'
            block
            onClick={showModal}
          >
            Create Group
          </Button>
        </div>
      </div>
      <div className='datatable datatable-group'>
        <Table dataSource={dataSource} columns={columns} />
      </div>
    </>
  );
}

export default DetailProject;
