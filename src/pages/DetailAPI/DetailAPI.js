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
import moment from "moment";
import { APIService } from "../../services/APIService";
import useAPIHistory from "../../hooks/useAPIHistory";

function DetailAPI() {
  const history = useAPIHistory();
  
  const dataSource = history.map((historyItem, index) => ({
		key: `${index}`,
		no: `${index + 1}`,
		ip: `${historyItem.requestAddress}`,
		datetime: `${moment
			.utc(historyItem.requestDate)
			.local()
			.format("DD MMMM YYYY, HH:m:s a")}`,
    status: `${historyItem.requestStatus}`,
	}));

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
      key: "datetime",
    },
    
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status, index) => (
        <>
          {status <= 300 
          ? (
            <Tag color={"#3F8600"} key={index}>
            {"SUCCESS"}
            </Tag>
            ) : 
            <Tag color={"#CF1322"} key={index}>
            {"FAIL"}
            </Tag>}
        </>
      ),
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
