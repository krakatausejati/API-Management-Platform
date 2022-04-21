import { PlusOutlined } from "@ant-design/icons";
import { Button, Table } from "antd";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Breadcrumbs } from "../../components/molecules/Breadcrumbs";
import useConnection from "../../hooks/useConnection";

function Connection() {
	const connection = useConnection();

	const dataSource = connection.map((connectionItem, index) => ({
		key: `${connectionItem.id}`,
		no: `${index + 1}`,
		name: `${connectionItem.connectionName}`,
		host: `${connectionItem.host}`,
		port: `${connectionItem.port}`,
		databaseName: `${connectionItem.databaseName}`,
		detail: "...",
	}));

	const columns = [
		{
			title: "No",
			dataIndex: "no",
			key: "no",
		},
		{
			title: "Name",
			dataIndex: "name",
			key: "name",
			render: (data) => (
				<>
					<Link
						to={{
							pathname: "/detail-group",
							state: { breadcrumb: "Group", name: data },
						}}
					>
						{data}
					</Link>
				</>
			),
		},
		{
			title: "Host",
			dataIndex: "host",
			key: "host",
		},
		{
			title: "Port",
			dataIndex: "port",
			key: "port",
		},
		{
			title: "Database Name",
			dataIndex: "databaseName",
			key: "databaseName",
		},
		{
			title: "",
			dataIndex: "detail",
			key: "detail",
		},
	];

	return (
		<>
			<Breadcrumbs breadcrumb='Connection' current={null} />
			<div className='header-datatable'>
				<h1>List Connections</h1>
				<div className='add-field'>
					<Button icon={<PlusOutlined />} type='primary' block>
						Add Connection
					</Button>
				</div>
			</div>
			<div className='datatable datatable-group'>
				<Table dataSource={dataSource} columns={columns} />
			</div>
		</>
	);
}

export default Connection;
