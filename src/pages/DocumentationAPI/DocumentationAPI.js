import React from "react";
import { Link } from "react-router-dom";
import {
  Breadcrumb,
  Form,
  Input,
  Divider
} from "antd";
import "./documentation-api.css";
import useAPIDetail from "../../hooks/useAPIDetail";
import useAPIDocumentation from "../../hooks/useAPIDocumentation";
import { useParams } from "react-router-dom";
import { Collapse } from 'antd';

const { Panel } = Collapse;

function DocumentationAPI() {
  let { idApi  } = useParams();
  const apiDocumentation = useAPIDocumentation(idApi);
  const apiDetail = useAPIDetail(idApi);
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
        <h2>Ini merupakan halaman dokumentasi penggunaan api endpoints {apiDetail.description}.</h2>
      </div>    
        <Collapse accordion>
          <Panel header= "GET" key="1">
            <h5>Parameter</h5>
            <Divider />
            <h5>Output Example</h5>
            <Divider />
            <pre className="collapse">
              <code>
                {JSON.stringify(apiDocumentation, null, 2)}
              </code>
            </pre>
          </Panel>
        </Collapse>
    </>
  );
}

export default DocumentationAPI;
