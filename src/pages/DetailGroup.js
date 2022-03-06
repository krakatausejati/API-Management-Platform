import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Space, Table } from "antd";
import { Link, useLocation } from "react-router-dom";

function DetailGroup() {
  let data = useLocation();
  const breadcrumb = data.state.breadcrumb;
  const dataSource = [
    {
      key: "1",
      no: "1",
      endpoints:
        "https://api.management.nbi.com/{user}/{project_name}/{group_name}/(free}",
      project: "Project A",
      group: "Neural BI",
      description: "Get Data",
    },
    {
      key: "2",
      no: "2",
      endpoints:
        "https://api.management.nbi.com/{user}/{project_name}/{group_name}/(free}",
      project: "Project A",
      group: "Neural BI",
      description: "Get User",
    },
  ];

  const columns = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
    },
    {
      title: "Endpoints",
      dataIndex: "endpoints",
      key: "endpoints",
    },
    {
      title: "Project Name",
      dataIndex: "project",
      key: "project",
    },
    {
      title: "Group Name",
      dataIndex: "group",
      key: "group",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "",
      dataIndex: "detail",
      key: "detail",
      render: (text, record) => (
        <Space>
          <Link to={"/detail"}>
            <Button icon={<EyeOutlined />} type='primary' />
          </Link>
          <Link to={"/delete"}>
            <Button icon={<DeleteOutlined />} danger />
          </Link>
        </Space>
      ),
    },
  ];

  return (
    <>
      <div className='breadcrumb'>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to={`/${breadcrumb.toLowerCase()}`}>{breadcrumb}</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>{data.state.name}</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className='header-datatable'>
        <h1>List API of {data.state.name}</h1>
      </div>
      <div className='datatable datatable-group'>
        <Table dataSource={dataSource} columns={columns} />
      </div>
    </>
  );
}

export default DetailGroup;
