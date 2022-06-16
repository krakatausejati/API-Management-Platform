import React from "react";
import { Link } from "react-router-dom";
import {
  Breadcrumb,
  Form,
  Input,
  Divider,
  Table
} from "antd";
import "./documentation-api.css";
import useAPIDetail from "../../hooks/useAPIDetail";
import useAPIDocumentation from "../../hooks/useAPIDocumentation";
import { useParams } from "react-router-dom";
import { Collapse } from 'antd';
import ReactJson from 'react-json-view';
import exampleJson from "./exampleJSON"

const { Panel } = Collapse;

function DocumentationAPI() {
  let { idApi  } = useParams();
  const apiDocumentation = useAPIDocumentation(idApi);
  const apiDetail = useAPIDetail(idApi);

  const dataSource = [
    {
      key: '1',
      name: 'Condition',
      type: 'array',
      example: "'field_name' : 'value'",
      description: 'The following operand can be used in Condition : and, or, between, in, nin, gt, It, gte, lte, eq, neq',
    },
    {
      key: '2',
      name: 'Sort',
      type: 'String',
      example: "'field_name' : 'ASC'",
      description: 'Selected field to used for sort',
    },
    {
      key: '3',
      name: 'Limit',
      type: 'Integer',
      example: 100,
      description: 'Limit total row of data',
    },
    {
      key: '4',
      name: 'Skip',
      type: 'Integer',
      example: 0,
      description: 'Skip some row from the first row',
    },
    {
      key: '5',
      name: 'output',
      type: 'String',
      example: 'JSON',
      description: 'The following output can be used : JSON, CSV',
    },
  ];
  
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Example',
      dataIndex: 'example',
      key: 'example',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
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
        <h2>This is the documentation page for using the API endpoints {apiDetail.description}.</h2>
      </div>    
        <Collapse accordion>
          <Panel header= "Request Method POST" key="1">
            <Collapse defaultActiveKey="1">
              <Panel header= "Parameter" key="1">
                  <ReactJson 
                  name = "request body example"
                  theme = "monokai"
                  displayDataTypes = {false}
                  onEdit = {false}
                  onAdd = {false}
                  src={exampleJson} />
                <h3>Request</h3>
                  <Table 
                  pagination={false}
                  dataSource={dataSource} 
                  columns={columns} />
                </Panel>
                <Panel header= "Output Model Example" key="2">
                  <h3>Output Example</h3>
                  <ReactJson 
                  name = "example"
                  theme = "monokai"
                  displayDataTypes = {true}
                  enableClipboard = {false}
                  src={apiDocumentation} />
                </Panel>
            </Collapse>
          </Panel>
        </Collapse>
    </>
  );
}

export default DocumentationAPI;
