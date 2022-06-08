import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { useKeycloak } from "@react-keycloak/web";
import { Button, Form, Input, Modal } from "antd";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { AuthService } from "../../services/AuthService";
import "./login.css";

function Login() {
	const history = useHistory();
	const { keycloak } = useKeycloak();

	const [state, setState] = useState({
		email_username: "",
		password: "",
	});

	const handleChange = (e) => {
		const { id, value } = e.target;
		setState((prevState) => ({
			...prevState,
			[id]: value,
		}));
	};

	const handleLogin = (values) => {
		const { email_username, password } = values;

		AuthService.login(email_username, password)
			.then((response) => {
				localStorage.setItem(
					"access_token",
					response.data.access_token
				);
				localStorage.setItem(
					"refresh_token",
					response.data.refresh_token
				);
				localStorage.setItem(
					"accessTokenExpire",
					response.data.expires_in * 1000 + new Date().getTime()
				);

				history.push("/dashboard");
			})
			.catch((error) => {
				if (error.response) {
					if (error.response.status === 401) {
						Modal.error({
							title: "Login Failed",
							content: `${error.response.statusText}: Invalid email or password mismatch!`,
						});
					}
				} else {
					Modal.error({
						title: "Login Failed",
						content: `Error: connection refused`,
					});
				}
			});
	};

	if (localStorage.getItem("access_token")) history.push("/dashboard");
	return (
		<section className='login'>
			<div className='hero-login'>
				<div className='content'>
					<h1>API Management</h1>
					<p>
						Make exchanging data more easier, secure and
						<br /> manage as much as you want
					</p>
				</div>
			</div>
			<div className='form-login'>
				<h1>Login.</h1>
				<p>Please login to your account.</p>
				{!keycloak.authenticated && (
					<Form
						name='normal_login'
						className='login-form'
						onFinish={handleLogin}
					>
						<Form.Item
							name='email_username'
							rules={[
								{
									required: true,
									message:
										"Please input your Email / Username!",
								},
							]}
						>
							<Input
								prefix={
									<MailOutlined className='site-form-item-icon' />
								}
								placeholder='Email / Username'
								value={state.email_username}
								onChange={handleChange}
							/>
						</Form.Item>
						<Form.Item
							name='password'
							rules={[
								{
									required: true,
									message: "Please input your Password!",
								},
							]}
						>
							<Input.Password
								prefix={
									<LockOutlined className='site-form-item-icon' />
								}
								type='password'
								placeholder='Password'
								value={state.password}
								onChange={handleChange}
							/>
						</Form.Item>
						<Form.Item>
							<Button
								type='submit'
								htmlType='submit'
								className='login-form-button'
							>
								SIGN IN
							</Button>
						</Form.Item>
					</Form>
				)}
			</div>
		</section>
	);
}

export default Login;
