import {
	ApiOutlined,
	AppstoreOutlined,
	DatabaseOutlined,
	LogoutOutlined,
	ProjectOutlined,
	UserOutlined,
	MenuUnfoldOutlined,
	MenuFoldOutlined,
} from "@ant-design/icons";
import { Avatar, Layout, Menu } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AuthService } from "../services/AuthService";
import { parseJwt } from "../helpers/Utils";
import "./dashboardlayout.css";

const { Header, Content, Footer, Sider } = Layout;

function DashboardLayout(props) {
	const { children } = props;
	const accessToken = localStorage.getItem("access_token");
	const { preferred_username } = parseJwt(accessToken);
	const [collapsed, setCollapsed] = useState(false);

	return (
		<Layout>
			<Sider trigger={null} collapsible collapsed={collapsed}>
				<div className='logo'>
					{!collapsed ? <h1>API Management</h1> : <h1>API</h1>}
				</div>
				<Menu theme='dark' mode='inline' defaultSelectedKeys={["1"]}>
					<Menu.Item key='1' icon={<AppstoreOutlined />}>
						<Link to='/dashboard'>Dashboard</Link>
					</Menu.Item>
					<Menu.Item key='2' icon={<ProjectOutlined />}>
						<Link to='/project'>Project</Link>
					</Menu.Item>
					<Menu.Item key='3' icon={<DatabaseOutlined />}>
						<Link to='/connection'>Connection</Link>
					</Menu.Item>
					<Menu.Item key='4' icon={<ApiOutlined />}>
						<Link to='/public-api'>API Public</Link>
					</Menu.Item>
					<Menu.Item
						key='5'
						icon={<LogoutOutlined />}
						onClick={() => {
							AuthService.logout();
						}}
					>
						<Link to='/login'>Logout</Link>
					</Menu.Item>
				</Menu>
			</Sider>
			<Layout className='site-layout'>
				<Header
					className='site-layout-background'
					style={{
						padding: 0,
						justifyContent: "space-between",
					}}
				>
					{React.createElement(
						collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
						{
							className: "trigger",
							onClick: () => setCollapsed(!collapsed),
						}
					)}
					<div className='user-profile'>
						<Avatar
							size={30}
							style={{ backgroundColor: "#87d068" }}
							icon={<UserOutlined />}
						/>
						<p>{preferred_username}</p>
					</div>
				</Header>
				<Content
					className='site-layout-background'
					style={{
						margin: "24px 16px",
						padding: 24,
						minHeight: "100vh",
						flexDirection: "column",
					}}
				>
					{children}
				</Content>
				<Footer style={{ textAlign: "center" }}>
					API Management Platform ©2022 Created by KoTA 107
				</Footer>
			</Layout>
		</Layout>
	);
}

export default DashboardLayout;
