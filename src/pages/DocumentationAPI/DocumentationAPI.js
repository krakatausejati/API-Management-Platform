import React from "react";
import { Link } from "react-router-dom";
import {
  Breadcrumb,
  Table,
  Form,
  Input,
} from "antd";
import "./detail-api.css";
import moment from "moment";
import useAPIHistory from "../../hooks/useAPIHistory";
import useAPIDetail from "../../hooks/useAPIDetail";
import { useParams } from "react-router-dom";
import { Collapse } from 'antd';

const { Panel } = Collapse;

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;


function DocumentationAPI() {
  let { idApi  } = useParams();
	const id = parseInt(idApi, 10);
  const history = useAPIHistory(idApi);
  const apiDetail = useAPIDetail(idApi);
  
  const dataSource = history.map((historyItem, index) => ({
		key: `${historyItem.idHistory}`,
		no: `${index + 1}`,
		ip: `${historyItem.requestAddress}`,
		datetime: `${moment
			.utc(historyItem.requestDate)
			.local()
			.format("DD MMMM YYYY, HH:m:s a")}`,
    status: `${historyItem.requestStatus}`,
    messages: `${historyItem.messages}`,
    executionTime : `${historyItem.executionTime}`,
	}));
  const columns = [
    {
      title: "Name",
      dataIndex: "no",
      key: "no",
    },
    {
      title: "Description",
      dataIndex: "ip",
      key: "ip",
    },
  ];

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to={"/dashboard"}>Dashboard</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>API - Documentation </Breadcrumb.Item>
      </Breadcrumb>
      <div className="identity-api-wrapper">
        <h2>Detail API</h2>
        <Form layout="vertical">
          <Form.Item label="Endpoints" className="endpoints">
              <Input
                disabled
                value={
                  apiDetail.apiEndpoint
                }
              />
          </Form.Item>
        </Form>
      </div>
      <div className="identity-api-wrapper">
        <h2>Ini merupakan halaman dokumentasi penggunaan api endpoints(blablabla).</h2>
      </div>    
        <Collapse accordion>
        <Panel header="GET"  key="1">
            <Table dataSource={dataSource} columns={columns} />
        </Panel>
        <Panel header="POST" key="2">
            <Table dataSource={dataSource} columns={columns} />
        </Panel>
        </Collapse>
    </>
  );
}

export default DocumentationAPI;
