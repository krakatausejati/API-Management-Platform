import { EyeOutlined } from "@ant-design/icons";
import { Button, Space, Table } from "antd";
import { Link } from "react-router-dom";
import { Breadcrumbs } from "../../components/molecules/Breadcrumbs";
import { Statistics } from "../../components/molecules/Statistics";
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

	return (
		<>
			<Breadcrumbs breadcrumb={["Dashboard"]} />
			<Statistics
				totalSuccess={totalSuccess}
				totalFail={totalFail}
				data={data}
			/>
			<div className='header-datatable'>
				<h1>Top 10's API</h1>
			</div>
			<div className='datatable datatable-api'>
				<Table dataSource={dataSource} columns={columns} />
			</div>
		</>
	);
}

export default Dashboard;
