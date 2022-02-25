import { Form, Input, Button, message } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "./login.css";

function Login() {
  return (
    <section className="login">
      <div className="hero-login">
        <div className="content">
          <h1>API Management Platform</h1>
          <p>
            Make exchanging data more easier, secure and
            <br /> manage as much as you want
          </p>
        </div>
      </div>
      <div className="form-login">
        <h1>Login.</h1>
        <p>Please login to your account.</p>
        <Form name="normal_login" className="login-form">
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your Email!",
                type: "email",
              },
            ]}
          >
            <Input
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              <Link to="/dashboard">SIGN IN</Link>
            </Button>
          </Form.Item>
        </Form>
      </div>
    </section>
  );
}

export default Login;
