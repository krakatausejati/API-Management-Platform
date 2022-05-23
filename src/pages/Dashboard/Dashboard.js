import { Line } from "@ant-design/charts";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Card, Space, Statistic, Table } from "antd";
import { Link } from "react-router-dom";
import useAllHistory from "../../hooks/useAllHistory";
import useApiPublic from "../../hooks/useApiPublic";
import "./dashboard.css";

function Dashboard() {
	const allHistory = useAllHistory();
	const totalSuccess = allHistory.filter(
		(item) => item.requestStatus === 200
	).length;
	const totalFail = allHistory.filter(
		(item) => item.requestStatus !== 200
	).length;

	const apiPublic = useApiPublic();
	const dataSource = apiPublic.map((apiItem, index) => ({
		key: `${apiItem.idApi}`,
		no: `${index + 1}`,
		endpoints: `${apiItem.apiEndpoint}`,
		description: `${apiItem.description}`,
		project: `{Nama Project}`,
		group: `{Nama Group}`,
		detail: "...",
	}));

	const columns = [
		{
			title: "No",
			dataIndex: "no",
			key: "no",
		},
		{
			title: "Endpoints",
			dataIndex: "endpoints",
			key: "endpoints",
		},
		{
			title: "Project Name",
			dataIndex: "project",
			key: "project",
		},
		{
			title: "Group Name",
			dataIndex: "group",
			key: "group",
		},
		{
			title: "Description",
			dataIndex: "description",
			key: "description",
		},
		{
			title: "",
			dataIndex: "detail",
			key: "detail",
			render: (text, record) => (
				<Space>
					<Link to={`api/${record.key}/history`}>
						<Button icon={<EyeOutlined />} type='primary' />
					</Link>
					<Link to={"/delete"}>
						<Button icon={<DeleteOutlined />} danger />
					</Link>
				</Space>
			),
		},
	];

	const data = [
		{ day: "monday", value: 3 },
		{ day: "tuesday", value: 4 },
		{ day: "wednesday", value: 3.5 },
		{ day: "thursday", value: 5 },
		{ day: "friday", value: 4.9 },
		{ day: "saturday", value: 6 },
		{ day: "sunday", value: 7 },
	];

	const config = {
		data,
		width: 300,
		height: 200,
		autoFit: false,
		xField: "day",
		yField: "value",
		point: {
			size: 5,
			shape: "diamond",
		},
		label: {
			style: {
				fill: "#aaa",
			},
		},
	};

	let chart;

	return (
		<>
			<Breadcrumb>
				<Breadcrumb.Item>Dashboard</Breadcrumb.Item>
			</Breadcrumb>
			<div className='summary-total'>
				<div className='sum-request'>
					<Card>
						<Line
							{...config}
							onReady={(chartInstance) => (chart = chartInstance)}
						/>
					</Card>
				</div>
				<div className='sum-success'>
					<Card>
						<Statistic
							title='Total of Success'
							value={totalSuccess}
							valueStyle={{ color: "#3f8600" }}
						/>
						<p>requests</p>
					</Card>
				</div>
				<div className='sum-fail'>
					<Card>
						<Statistic
							title='Total of Fail'
							value={totalFail}
							valueStyle={{ color: "#cf1322" }}
						/>
						<p>requests</p>
					</Card>
				</div>
			</div>
			<div className='header-datatable'>
				<h1>Your API's</h1>
			</div>
			<div className='datatable datatable-api'>
				<Table dataSource={dataSource} columns={columns} />
			</div>
		</>
	);
}

export default Dashboard;
