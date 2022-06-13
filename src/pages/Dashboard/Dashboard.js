import { EyeOutlined } from "@ant-design/icons";
import { Button, Space, Table } from "antd";
import { Link } from "react-router-dom";
import { Breadcrumbs } from "../../components/molecules/Breadcrumbs";
import { Statistics } from "../../components/molecules/Statistics";
import useSummaryRequest from "../../hooks/useSummaryRequest";
import useApiPublic from "../../hooks/useApiPublic";
import "./dashboard.css";
import { getEndpoint } from "../../helpers/Utils";

function Dashboard() {
	const summaryRequest = useSummaryRequest();
	const totalSuccess = summaryRequest.sumSuccess;
	const totalFail = summaryRequest.sumFailed;

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
					<Link
						to={{
							pathname: `api/${record.key}/history`,
							state: {
								breadcrumb: [
									`API - ${getEndpoint(record.endpoints)}`,
								],
							},
						}}
					>
						<Button icon={<EyeOutlined />} type='primary' />
					</Link>
				</Space>
			),
		},
	];

	const data = [
		{ day: "monday", value: [3, 3] },
		{ day: "tuesday", value: [4, 1] },
		{ day: "wednesday", value: [3.5, 4] },
		{ day: "thursday", value: [5, 5] },
		{ day: "friday", value: [4.9, 2] },
		{ day: "saturday", value: [6, 2] },
		{ day: "sunday", value: [7, 4] },
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
