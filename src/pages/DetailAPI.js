import React from "react";
import { Link } from "react-router-dom";
import {
  Breadcrumb,
  Table,
  Card,
  Statistic,
  Button,
  Form,
  Input,
  Tag,
} from "antd";
import { ExportOutlined } from "@ant-design/icons";
import "./detail-api.css";

function DetailAPI() {
  const columns = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
    },
    {
      title: "IP Address",
      dataIndex: "ip",
      key: "ip",
    },
    {
      title: "Datetime",
      dataIndex: "datetime",
      key: "project",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (tags) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? "#3F8600" : "#CF1322";
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
  ];

  const dataSource = [
    {
      key: "1",
      no: "1",
      ip: "192.168.38.1",
      datetime: "12-02-2022 21:04:25 ",
      status: ["success"],
    },
    {
      key: "2",
      no: "2",
      ip: "192.168.46.1",
      datetime: "12-04-2022 21:24:25 ",
      status: ["fail"],
    },
  ];

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to={"/dashboard"}>Dashboard</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>API - {"{name API}"}</Breadcrumb.Item>
      </Breadcrumb>
      <div className="identity-api-wrapper">
        <h2>Detail API</h2>
        <Form layout="vertical">
          <Form.Item label="Endpoints" className="endpoints">
            <Input
              disabled
              defaultValue={
                "https://api.management.nbi.com/{user}/{project_name}/{group_name}/(free}"
              }
            />
          </Form.Item>
          <div className="identity-api">
            <Form.Item label="Description">
              <Input defaultValue={"Get Data"} />
            </Form.Item>
            <Form.Item label="Project Name">
              <Input defaultValue={"Project A"} />
            </Form.Item>
            <Form.Item label="Group Name">
              <Input defaultValue={"Neural BI"} />
            </Form.Item>
          </div>
        </Form>
      </div>
      <div className="summary-api">
        <div className="sum-request">
          <Card>
            <Statistic title="Access" value={123} />
            <p>requests</p>
          </Card>
        </div>
        <div className="longest-duration">
          <Card>
            <Statistic title="Longest Duration" value={10} />
            <p>seconds</p>
          </Card>
        </div>
        <div className="longest-duration">
          <Card>
            <Statistic title="Quickest Duration" value={2} />
            <p>seconds</p>
          </Card>
        </div>
        <div className="sum-result">
          <Card>
            <Statistic title="Summary Result" value={2} />
            <p>requests</p>
          </Card>
        </div>
      </div>
      <div className="recent-access" style={{ marginTop: "1.5rem" }}>
        <div
          className="header-access"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1rem",
          }}
        >
          <h1 style={{ margin: 0 }}>Recent Access</h1>
          <div
            className="right"
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Button icon={<ExportOutlined />} type="primary" block>
              Export Log
            </Button>
          </div>
        </div>
        <Table dataSource={dataSource} columns={columns} />
      </div>
    </>
  );
}

export default DetailAPI;
