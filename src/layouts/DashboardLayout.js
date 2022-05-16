import {
	ApiOutlined,
	AppstoreOutlined,
	DatabaseOutlined,
	LogoutOutlined,
	SettingOutlined,
	UserOutlined,
} from "@ant-design/icons";
import { Avatar, Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import { AuthService } from "../services/AuthService";
import "./dashboardlayout.css";

const { Header, Content, Footer, Sider } = Layout;

function DashboardLayout(props) {
	const { children } = props;
	return (
		<Layout hasSider>
			<Sider
				style={{
					overflow: "auto",
					height: "100vh",
					position: "fixed",
					left: 0,
					top: 0,
					bottom: 0,
				}}
			>
				<div className='logo'>
					<h1>API Management</h1>
				</div>
				<Menu theme='dark' mode='inline' defaultSelectedKeys={["1"]}>
					<Menu.Item key='1' icon={<AppstoreOutlined />}>
						<Link to='/dashboard'>Dashboard</Link>
					</Menu.Item>
					<Menu.Item key='2' icon={<SettingOutlined />}>
						<Link to='/project'>Project</Link>
					</Menu.Item>
					<Menu.Item key='3' icon={<DatabaseOutlined />}>
						<Link to='/connection'>Connection</Link>
					</Menu.Item>
					<Menu.Item key='4' icon={<ApiOutlined />}>
						<Link to='/api'>API Public</Link>
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
			<Layout className='site-layout' style={{ marginLeft: 200 }}>
				<Header
					className='site-layout-background'
					style={{ padding: 0 }}
				>
					<div className='user-profile'>
						<Avatar
							size={30}
							style={{ backgroundColor: "#87d068" }}
							icon={<UserOutlined />}
						/>
					</div>
				</Header>
				<Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
					<div
						className='site-layout-background'
						style={{ padding: "12px 24px" }}
					>
						{children}
					</div>
				</Content>
				<Footer style={{ textAlign: "center" }}>
					API Management Platform ©2022 Created by KoTA 107
				</Footer>
			</Layout>
		</Layout>
	);
}

export default DashboardLayout;
