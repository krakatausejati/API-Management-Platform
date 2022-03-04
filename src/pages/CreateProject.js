import React, { useState } from "react";
import { Breadcrumb, Form, Input, Checkbox, Button } from "antd";
import { Link } from "react-router-dom";
import "./create-project.css";

function CreateProject() {
  const [form] = Form.useForm();
  const [requiredMark, setRequiredMarkType] = useState("");

  const user = [
    { label: "softone", value: "softone" },
    { label: "atauwu", value: "atauwu" },
    { label: "dimzz", value: "dimzz" },
  ];

  const onRequiredTypeChange = ({ requiredMarkValue }) => {
    setRequiredMarkType(requiredMarkValue);
  };

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to={"/project"}>Project</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Create Project</Breadcrumb.Item>
      </Breadcrumb>
      <div className="create-project" style={{ marginTop: "16px" }}>
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            requiredMarkValue: requiredMark,
          }}
          onValuesChange={onRequiredTypeChange}
          requiredMark={requiredMark}
        >
          <h2>Create New Project</h2>
          <div className="form-create-project">
            <div className="left-side">
              <h3>Project Name</h3>
              <Form.Item>
                <Input />
              </Form.Item>
              <p>Give a name to this project.</p>
              <h3>Team Members</h3>
              <Form.Item name="remember" valuePropName="checked">
                <Checkbox.Group
                  options={user}
                  className="checkbox-group"
                  // style={{

                  // }}
                />
              </Form.Item>
            </div>
            <div className="right-side">
              <h3>Database Configuration</h3>
              <Form.Item label="Port">
                <Input />
              </Form.Item>
              <Form.Item label="URL">
                <Input />
              </Form.Item>
              <Form.Item label="Username">
                <Input />
              </Form.Item>
              <Form.Item label="Password">
                <Input />
              </Form.Item>
              <Form.Item style={{ marginTop: "24px" }}>
                <Button type="primary" htmlType="submit">
                  SUBMIT
                </Button>
              </Form.Item>
            </div>
          </div>
        </Form>
      </div>
    </>
  );
}

export default CreateProject;
