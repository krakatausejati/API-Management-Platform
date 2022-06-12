import {
	DeleteOutlined,
	ExclamationCircleOutlined,
	EyeOutlined,
	PlusOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, Modal, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import { Breadcrumbs } from "../../components/molecules/Breadcrumbs";
import { Roles } from "../../helpers/Constant";
import { defineRole } from "../../helpers/Utils";
// import HeaderDataTable from "../../components/molecules/HeaderDataTable";
import useConnection from "../../hooks/useConnection";
import { ConnectionService } from "../../services/ConnectionService";

function Connection() {
	const [refresh, setRefresh] = useState(new Date().getTime());
	const connection = useConnection(refresh);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [form] = Form.useForm();
	const { confirm } = Modal;

	const [connectionDetail, setConnectionDetail] = useState([]);
	const [edit, setEdit] = useState(false);

	const userRole = defineRole();

	useEffect(() => {
		if (!connectionDetail) {
			return null;
		} else {
			form.setFieldsValue({
				idConnection: connectionDetail.id,
				connectionName: connectionDetail.connectionName,
				host: connectionDetail.host,
				port: connectionDetail.port,
				databaseName: connectionDetail.databaseName,
				databaseUsername: connectionDetail.databaseUsername,
				databasePassword: connectionDetail.databasePassword,
			});
		}
	}, [connectionDetail, form]);

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
	];

	const columnAction = {
		title: "",
		dataIndex: "detail",
		key: "detail",
		render: (text, record) => (
			<Space>
				<>
					<Button
						icon={<EyeOutlined />}
						type='primary'
						onClick={() => showModal(record.key)}
					/>
					<Button
						icon={<DeleteOutlined />}
						onClick={() => showDeleteConfirm(record.key)}
						danger
					/>
				</>
			</Space>
		),
	};

	if (userRole.includes(Roles.DEVELOPER)) columns.push(columnAction);

	const showModal = (idConnection) => {
		if (idConnection) {
			ConnectionService.editConnection(idConnection)
				.then((response) => {
					setConnectionDetail(response.data.payload);
					setEdit(true);
				})
				.catch((error) => {
					console.log("Something went wrong", error);
				});
		} else {
			form.resetFields();
		}
		setEdit(false);
		setIsModalVisible(true);
	};

	const handleOk = (values) => {
		if (!edit) {
			console.log("create");
			ConnectionService.createConnection(values)
				.then((response) => {
					setRefresh(new Date().getTime());
				})
				.catch((error) => {
					console.log("Something went wrong", error);
				});
		} else {
			ConnectionService.updateConnection(values)
				.then((response) => {
					setRefresh(new Date().getTime());
				})
				.catch((error) => {
					console.log("Something went wrong", error);
				});
		}

		setIsModalVisible(false);
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};

	const showDeleteConfirm = (idConnection) => {
		confirm({
			title: "Are you sure want to delete this connection?",
			icon: <ExclamationCircleOutlined />,
			content: "This connection will deleted permanently",
			okText: "Yes",
			okType: "danger",
			cancelText: "No",

			onOk() {
				ConnectionService.deleteConnection(idConnection)
					.then(() => {
						setRefresh(new Date().getTime());
					})
					.catch((error) => {
						console.log("Something went wrong", error);
					});
			},

			onCancel() {
				console.log("Cancel");
			},
		});
	};

	return (
		<>
			{/* Modal */}
			<Modal
				title={edit ? "Edit Connection" : "Add New Connection"}
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
				okText='Save'
				cancelText='Cancel'
			>
				<Form layout='vertical' form={form}>
					<div
						className='form-container-connection'
						style={{ display: "flex", gap: "5rem" }}
					>
						<div className='left-side'>
							<Form.Item
								// label='Connection Name'
								name='idConnection'
								style={{ display: "none" }}
							>
								<Input />
							</Form.Item>
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

			<Breadcrumbs breadcrumb={["Connection"]} />
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
				{userRole.includes(Roles.DEVELOPER) ? (
					<div className='add-field'>
						<Button
							icon={<PlusOutlined />}
							type='primary'
							block
							onClick={() => showModal(null)}
						>
							Create Connection
						</Button>
					</div>
				) : null}
			</div>
			<div className='datatable datatable-group'>
				<Table dataSource={dataSource} columns={columns} />
			</div>
		</>
	);
}

export default Connection;
