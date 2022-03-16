import { Line } from "@ant-design/charts";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Card, Space, Statistic, Table } from "antd";
import { Link } from "react-router-dom";
import "./dashboard.css";

function Dashboard() {
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
      project: "Project B",
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
      render: (data) => (
        <>
          <Link
            to={{
              pathname: "/detail-project",
              state: { breadcrumb: "Dashboard", name: data },
            }}
          >
            {data}
          </Link>
        </>
      ),
    },
    {
      title: "Group Name",
      dataIndex: "group",
      key: "group",
      render: (data) => (
        <>
          <Link
            to={{
              pathname: "/detail-group",
              state: { breadcrumb: "Dashboard" },
            }}
          >
            {data}
          </Link>
        </>
      ),
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
      render: () => (
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

  const data = [
    { day: "monday", value: 3 },
    { day: "tuesday", value: 4 },
    { day: "wednesday", value: 3.5 },
    { day: "thursday", value: 5 },
    { day: "friday", value: 4.9 },
    { day: "saturday", value: 6 },
    { day: "sunday", value: 7 },
  ];

  const config = {
    data,
    width: 300,
    height: 200,
    autoFit: false,
    xField: "day",
    yField: "value",
    point: {
      size: 5,
      shape: "diamond",
    },
    label: {
      style: {
        fill: "#aaa",
      },
    },
  };

  let chart;

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
      </Breadcrumb>
      <div className='summary-total'>
        <div className='sum-request'>
          <Card>
            <Line
              {...config}
              onReady={(chartInstance) => (chart = chartInstance)}
            />
          </Card>
        </div>
        <div className='sum-success'>
          <Card>
            <Statistic
              title='Total of Success'
              value={123}
              valueStyle={{ color: "#3f8600" }}
            />
            <p>requests</p>
          </Card>
        </div>
        <div className='sum-fail'>
          <Card>
            <Statistic
              title='Total of Fail'
              value={76}
              valueStyle={{ color: "#cf1322" }}
            />
            <p>requests</p>
          </Card>
        </div>
      </div>
      <div className='header-datatable'>
        <h1>Your API's</h1>
      </div>
      <div className='datatable datatable-api'>
        <Table dataSource={dataSource} columns={columns} />
      </div>
    </>
  );
}

export default Dashboard;
