import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Breadcrumb, Form, Input, Switch, Select, Button } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import "./create-api.css";

export default function CreateAPI() {
  const [form] = Form.useForm();
  const [requiredMark, setRequiredMarkType] = useState("");

  const onRequiredTypeChange = ({ requiredMarkValue }) => {
    setRequiredMarkType(requiredMarkValue);
  };

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to={"/dashboard"}>Dashboard</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Create API</Breadcrumb.Item>
      </Breadcrumb>
      <div className="create-api" style={{ marginTop: "16px" }}>
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            requiredMarkValue: requiredMark,
          }}
          onValuesChange={onRequiredTypeChange}
          requiredMark={requiredMark}
        >
          <div className="form-create-api" style={{display: 'flex', gap: '5rem'}}>
            <div className="left-side" style={{minWidth: '450px'}}>
              <h2>Identity API</h2>
              <Form.Item label="Description">
                <Input />
              </Form.Item>
              <Form.Item label="Group">
                <Select />
              </Form.Item>
              <Form.Item label="Endpoints">
                <Input />
              </Form.Item>
            </div>
            <div className="right-side" style={{minWidth: '450px'}}>
              <h2>Database</h2>
              <Form.Item label="Table">
                <Select />
              </Form.Item>
              <h2>Limits</h2>
              <Form.Item label="Max Limit">
                <Input addonAfter={"per day"} />
              </Form.Item>
              <Form.Item label="Private">
                <Switch />
              </Form.Item>
            </div>
          </div>
          <div className="preview-generated-api">
            <h4>
              <InfoCircleOutlined /> Preview Generated API
            </h4>
            <Input
              disabled
              defaultValue={
                "https://api.management.nbi.com/{user}/{project_name}/{group_name}/(free}"
              }
            />
          </div>
          <Form.Item style={{ marginTop: "24px" }}>
            <Button type="primary" htmlType="submit">
              SUBMIT
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}
