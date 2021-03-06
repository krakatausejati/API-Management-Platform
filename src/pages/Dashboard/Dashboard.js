import { EyeOutlined } from "@ant-design/icons";
import { Button, Space, Table } from "antd";
import { Link } from "react-router-dom";
import { Breadcrumbs } from "../../components/molecules/Breadcrumbs";
import { Statistics } from "../../components/molecules/Statistics";
import useSummaryRequest from "../../hooks/useSummaryRequest";
import useLastWeekUsage from "../../hooks/useLastWeekUsage";
import useMostUsedAPI from "../../hooks/useMostUsedAPI";
import useMostCreatedApi from "../../hooks/useMostCreatedApi";
import "./dashboard.css";
import { getEndpoint } from "../../helpers/Utils";

function Dashboard() {
	const summaryRequest = useSummaryRequest();
	const { sumSuccess, sumFailed } = summaryRequest;
	const lastWeekUsage = useLastWeekUsage();
	const { mostUsedAPI, loading } = useMostUsedAPI();
	const mostCreatedApi = useMostCreatedApi();
	const dataSource = mostUsedAPI.map((apiItem, index) => ({
		key: `${apiItem.idApi}`,
		no: `${index + 1}`,
		endpoints: `${apiItem.apiEndpoint}`,
		description: `${apiItem.description}`,
		sumRequest: `${apiItem.sumRequest}`,
		isPrivate: `${apiItem.isPrivate}`,
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
			title: "Total Request",
			dataIndex: "sumRequest",
			key: "sumRequest",
		},
		{
			title: "Description",
			dataIndex: "description",
			key: "description",
		},
		{
			title: "Is Private",
			dataIndex: "isPrivate",
			key: "isPrivate",
			hidden: true,
		},
		{
			title: "",
			dataIndex: "detail",
			key: "detail",
			render: (text, record) => (
				<Space>
					{record.isPrivate === "false" && (
						<Link
							to={{
								pathname: `api/${record.key}/history`,
								state: {
									breadcrumb: [
										`API - ${getEndpoint(
											record.endpoints
										)}`,
									],
								},
							}}
						>
							<Button icon={<EyeOutlined />} type='primary' />
						</Link>
					)}
				</Space>
			),
		},
	].filter((item) => !item.hidden);

	return (
		<>
			<Breadcrumbs breadcrumb={["Dashboard"]} />
			<Statistics
				totalSuccess={sumSuccess}
				totalFail={sumFailed}
				data={lastWeekUsage}
				maxValue={Math.max(lastWeekUsage)}
				dataCreatedAPI={mostCreatedApi}
			/>
			<div className='header-datatable'>
				<h1>Top 10's API</h1>
			</div>
			<div className='datatable datatable-api'>
				<Table
					dataSource={dataSource}
					columns={columns}
					loading={loading}
					pagination={false}
				/>
			</div>
		</>
	);
}

export default Dashboard;
