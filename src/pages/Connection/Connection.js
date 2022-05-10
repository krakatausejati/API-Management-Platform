import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Table } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Breadcrumbs } from "../../components/molecules/Breadcrumbs";
// import HeaderDataTable from "../../components/molecules/HeaderDataTable";
import useConnection from "../../hooks/useConnection";
import { ConnectionService } from "../../services/ConnectionService";

function Connection() {
	const connection = useConnection();
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [form] = Form.useForm();

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

	const showModal = () => {
		setIsModalVisible(true);
	};

	const handleOk = (values) => {
		ConnectionService.createConnection(values)
			.then((response) => {
				window.location.reload();
			})
			.catch((error) => {
				console.log("Something went wrong", error);
			});

		setIsModalVisible(false);
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};

	return (
		<>
			{/* Modal */}
			<Modal
				title='Add New Connection'
				visible={isModalVisible}
				onOk={() => {
					form.validateFields()
						.then((values) => {
							form.resetFields();
							handleOk(values);
						})
						.catch((info) => {
							console.log("Validate Failed:", info);
						});
				}}
				onCancel={handleCancel}
				okText='Add Connection'
				cancelText='Cancel'
			>
				<Form layout='vertical' form={form}>
					<div
						className='form-container-connection'
						style={{ display: "flex", gap: "5rem" }}
					>
						<div className='left-side'>
							<Form.Item
								label='Connection Name'
								name='connectionName'
								style={{ width: "100%" }}
								rules={[
									{
										required: true,
										message:
											"Please input the connection name!",
									},
								]}
							>
								<Input />
							</Form.Item>
							<Form.Item
								label='Host'
								name='host'
								style={{ width: "100%" }}
								rules={[
									{
										required: true,
										message: "Please input the host!",
									},
								]}
							>
								<Input />
							</Form.Item>
							<Form.Item
								label='Port'
								name='port'
								style={{ width: "100%" }}
								rules={[
									{
										required: true,
										message: "Please input the port!",
									},
								]}
							>
								<Input />
							</Form.Item>
						</div>
						<div className='right'>
							<Form.Item
								label='Database Name'
								name='databaseName'
								style={{ width: "100%" }}
								rules={[
									{
										required: true,
										message:
											"Please input the database name!",
									},
								]}
							>
								<Input />
							</Form.Item>
							<Form.Item
								label='Database Username'
								name='databaseUsername'
								style={{ width: "100%" }}
								rules={[
									{
										required: true,
										message:
											"Please input the database username!",
									},
								]}
							>
								<Input />
							</Form.Item>
							<Form.Item
								label='Database Password'
								name='databasePassword'
								style={{ width: "100%" }}
								rules={[
									{
										required: true,
										message:
											"Please input the database password!",
									},
								]}
							>
								<Input />
							</Form.Item>
						</div>
					</div>
				</Form>
			</Modal>
			{/* Modal */}

			<Breadcrumbs breadcrumb='Connection' current={null} />
			{/* <HeaderDataTable
				// menu={menu}
				// onSearch={onSearch}
				title='List Connection'
				titleButton='Add Connection'
				// pathname='/create-api'
				// breadcrumb='API'
				onClick={showModal}
			/> */}
			<div className='header-datatable'>
				<h1>List Connections</h1>
				<div className='add-field'>
					<Button
						icon={<PlusOutlined />}
						type='primary'
						block
						onClick={showModal}
					>
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
