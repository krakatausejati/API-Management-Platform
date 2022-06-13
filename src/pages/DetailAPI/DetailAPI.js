import { CopyOutlined, ExportOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, Statistic, Table, Tag } from "antd";
import moment from "moment";
import React from "react";
import { CSVLink } from "react-csv";
import { Link, useParams, useLocation } from "react-router-dom";
import { Breadcrumbs } from "../../components/molecules/Breadcrumbs";
import { getExecutionTime } from "../../helpers/Utils";
import useAPIDetail from "../../hooks/useAPIDetail";
import useAPIHistory from "../../hooks/useAPIHistory";
import "./detail-api.css";

function DetailAPI() {
	let { idApi } = useParams();
	const history = useAPIHistory(idApi);
	const apiDetail = useAPIDetail(idApi);
	let data = useLocation();
	const breadcrumb = data.state.breadcrumb;

	const dataSource = history.map((historyItem, index) => ({
		key: `${historyItem.idHistory}`,
		no: `${index + 1}`,
		ip: `${historyItem.requestAddress}`,
		datetime: `${moment
			.utc(historyItem.requestDate)
			.local()
			.format("DD MMMM YYYY, HH:m:s a")}`,
		status: `${historyItem.requestStatus}`,
		messages: `${historyItem.messages}`,
		executionTime: `${historyItem.executionTime}`,
	}));

	const executionTime = dataSource
		.map((item) => item.executionTime)
		.map(Number);

	const summaryResult =
		history.filter((item) => item.requestStatus === 200).length -
		history.filter((item) => item.requestStatus !== 200).length;

	const columns = [
		{
			title: "No",
			dataIndex: "no",
			key: "no",
		},
		{
			title: "IP Address",
			dataIndex: "ip",
			key: "ip",
		},
		{
			title: "Datetime",
			dataIndex: "datetime",
			key: "datetime",
		},

		{
			title: "Status",
			dataIndex: "status",
			key: "status",
			render: (status, index) => (
				<>
					{status <= 300 ? (
						<Tag color={"#3F8600"} key={index}>
							{"SUCCESS"}
						</Tag>
					) : (
						<Tag color={"#CF1322"} key={index}>
							{"FAIL"}
						</Tag>
					)}
				</>
			),
		},
		{
			title: "Status Code",
			dataIndex: "status",
			key: "status",
		},
		{
			title: "Message",
			dataIndex: "messages",
			key: "messages",
		},
		{
			title: "Execution Time",
			dataIndex: "executionTime",
			key: "executionTime",
		},
	];

	return (
		<>
			<Breadcrumbs breadcrumb={breadcrumb} />
			<div className='identity-api-wrapper'>
				<h2>Detail API</h2>
				<Form layout='vertical'>
					<Form.Item label='Endpoints' className='endpoints'>
						<div
							className='endpoint'
							style={{ display: "flex", gap: "2em" }}
						>
							<Input disabled value={apiDetail.apiEndpoint} />
							<Button
								icon={<CopyOutlined />}
								type='primary'
								onClick={() => {
									navigator.clipboard.writeText(
										apiDetail.apiEndpoint
									);
								}}
							>
								Copy Endpoint
							</Button>
						</div>
					</Form.Item>
					<div className='identity-api'>
						<Form.Item label='Description'>
							<Input disabled value={apiDetail.description} />
						</Form.Item>
						<Form.Item label='Project Name'>
							<Input disabled defaultValue={"Project A"} />
						</Form.Item>
						<Form.Item label='Group Name'>
							<Input disabled defaultValue={"Neural BI"} />
						</Form.Item>
					</div>
				</Form>
			</div>
			<div className='summary-api'>
				<div className='sum-request'>
					<Card>
						<Statistic title='Access' value={history.length} />
						<p>requests</p>
					</Card>
				</div>
				<div className='longest-duration'>
					<Card>
						<Statistic
							title='Longest Duration'
							value={getExecutionTime(executionTime, "MAX")}
						/>
						<p>miliseconds</p>
					</Card>
				</div>
				<div className='longest-duration'>
					<Card>
						<Statistic
							title='Quickest Duration'
							value={getExecutionTime(executionTime)}
						/>
						<p>miliseconds</p>
					</Card>
				</div>
				<div className='sum-result'>
					<Card>
						<Statistic
							title='Summary Result'
							value={summaryResult}
						/>
						<p>requests</p>
					</Card>
				</div>
			</div>
			<div className='recent-access' style={{ marginTop: "1.5rem" }}>
				<div
					className='header-access'
					style={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
						marginBottom: "1rem",
					}}
				>
					<h1 style={{ margin: 0 }}>Recent Access</h1>
					<div
						className='right'
						style={{
							display: "flex",
							justifyContent: "flex-end",
							gap: "2em",
						}}
					>
						<CSVLink
							filename={"API_Usage_Log.csv"}
							data={dataSource}
							className='btn btn-primary'
						>
							<Button
								icon={<ExportOutlined />}
								type='primary'
								block
							>
								Export Log
							</Button>
						</CSVLink>

						<Link to={`/documentation/${idApi}`}>
							<Button icon={<CopyOutlined />} type='primary'>
								API Documentation
							</Button>
						</Link>
					</div>
				</div>
				<Table dataSource={dataSource} columns={columns} />
			</div>
		</>
	);
}

export default DetailAPI;
