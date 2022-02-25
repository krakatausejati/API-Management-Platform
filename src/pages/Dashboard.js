import { Table, Breadcrumb, Button, Input, Statistic, Card } from "antd";
import { PlusOutlined, CaretDownOutlined } from "@ant-design/icons";
import { Line } from "@ant-design/charts";
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
      detail: "...",
    },
    {
      key: "2",
      no: "2",
      endpoints:
        "https://api.management.nbi.com/{user}/{project_name}/{group_name}/(free}",
      project: "Project A",
      group: "Neural BI",
      description: "Get User",
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
    },
  ];

  const { Search } = Input;

  const onSearch = (value) => console.log(value);

  const data = [
    { year: "1991", value: 3 },
    { year: "1992", value: 4 },
    { year: "1993", value: 3.5 },
    { year: "1994", value: 5 },
    { year: "1995", value: 4.9 },
    { year: "1996", value: 6 },
    { year: "1997", value: 7 },
    { year: "1998", value: 9 },
    { year: "1999", value: 13 },
  ];

  const config = {
    data,
    width: 300,
    height: 200,
    autoFit: false,
    xField: "year",
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
      <div className="summary-total">
        <div className="sum-request">
          <Card>
            <Line
              {...config}
              onReady={(chartInstance) => (chart = chartInstance)}
            />
          </Card>
        </div>
        <div className="sum-success">
          <Card>
            <Statistic
              title="Total of Success"
              value={123}
              valueStyle={{ color: "#3f8600" }}
            />
            <p>requests</p>
          </Card>
        </div>
        <div className="sum-fail">
          <Card>
            <Statistic
              title="Total of Fail"
              value={76}
              valueStyle={{ color: "#cf1322" }}
            />
            <p>requests</p>
          </Card>
        </div>
      </div>
      <div className="header-datatable">
        <h1>Your API's</h1>
        <div className="right">
          <div className="search-field">
            <Search placeholder="search API's" onSearch={onSearch} />
          </div>
          <div className="sort-field">
            <Button block>
              sort by <CaretDownOutlined />
            </Button>
          </div>
          <div className="add-field">
            <Link to="/create-api">
              <Button icon={<PlusOutlined />} type="primary" block>
                Create API
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="datatable-api">
        <Table dataSource={dataSource} columns={columns} />
      </div>
    </>
  );
}

export default Dashboard;
