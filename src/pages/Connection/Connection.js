import {
	DeleteOutlined,
	ExclamationCircleOutlined,
	PlusOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, Modal, Select, Space, Table } from "antd";
import { Option } from "antd/lib/mentions";
import { useState } from "react";
import { Breadcrumbs } from "../../components/molecules/Breadcrumbs";
import { Roles } from "../../helpers/Constant";
import {
	defineRole,
	showErrorMessage,
	showSuccessMessage,
} from "../../helpers/Utils";
// import HeaderDataTable from "../../components/molecules/HeaderDataTable";
import useConnection from "../../hooks/useConnection";
import { ConnectionService } from "../../services/ConnectionService";

function Connection() {
	const [refresh, setRefresh] = useState(new Date().getTime());
	const [keyword, setKeyword] = useState("");
	const [test, setTest] = useState(false);
	const { connection, loading } = useConnection(refresh, keyword);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [form] = Form.useForm();
	const { confirm } = Modal;

	const userRole = defineRole();

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
						icon={<DeleteOutlined />}
						onClick={() => showDeleteConfirm(record.key)}
						danger
					/>
				</>
			</Space>
		),
	};

	if (userRole.includes(Roles.DEVELOPER)) columns.push(columnAction);

	const handleOk = (values) => {
		ConnectionService.createConnection(values)
			.then(() => {
				setRefresh(new Date().getTime());
			})
			.catch((error) => {
				console.log("Something went wrong", error);
			});
		setIsModalVisible(false);
	};

	const handleTest = (values) => {
		console.log(
			"🚀 ~ file: Connection.js ~ line 148 ~ handleTest ~ values",
			values
		);
		ConnectionService.testConnection(values)
			.then((res) => {
				const [successMessage] = res.data.messages;
				setTest(true);
				showSuccessMessage(Modal, successMessage);
			})
			.catch((error) => {
				if (error.messages) {
					const [errorMessage] = error.messages;
					showErrorMessage(Modal, errorMessage);
				}
				setTest(false);
			});
	};

	const handleCancel = () => {
		form.resetFields();
		setTest(false);
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

			onCancel() {},
		});
	};

	const { Search } = Input;

	const onSearch = (value) => setKeyword(value);

	return (
		<>
			{/* Modal */}
			<Modal
				title={"Add New Connection"}
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
				footer={[
					<Button
						key='1'
						type='secondary'
						onClick={() => {
							form.validateFields()
								.then((values) => {
									handleTest(values);
								})
								.catch((info) => {
									console.log("Validate Failed:", info);
								});
						}}
					>
						Test Connection
					</Button>,
					<Button key='2' type='secondary' onClick={handleCancel}>
						Cancel
					</Button>,
					<Button
						key='3'
						type='primary'
						onClick={() => {
							form.validateFields()
								.then((values) => {
									form.resetFields();
									handleOk(values);
								})
								.catch((info) => {
									console.log("Validate Failed:", info);
								});
						}}
						disabled={!test}
					>
						Submit
					</Button>,
				]}
			>
				<Form layout='vertical' form={form}>
					<div
						className='form-container-connection'
						style={{ display: "flex", gap: "5rem" }}
					>
						<div className='left-side'>
							<Form.Item
								label='Connection Type'
								name='connectionType'
								style={{ width: "100%" }}
								rules={[
									{
										required: true,
										message:
											"Please input the connection type!",
									},
								]}
							>
								<Select>
									<Option value='mysql' key={1}>
										MySQL
									</Option>
									<Option value='postgresql' key={2}>
										PostgreSQL
									</Option>
								</Select>
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
								initialValue={null}
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
				<div className='right'>
					<div className='search-field'>
						<Search
							placeholder="search Connection's"
							onSearch={onSearch}
						/>
					</div>
					{userRole.includes(Roles.DEVELOPER) ? (
						<div className='add-field'>
							<Button
								icon={<PlusOutlined />}
								type='primary'
								block
								onClick={() => setIsModalVisible(true)}
							>
								Create Connection
							</Button>
						</div>
					) : null}
				</div>
			</div>
			<div className='datatable datatable-group'>
				<Table
					dataSource={dataSource}
					columns={columns}
					loading={loading}
				/>
			</div>
		</>
	);
}

export default Connection;
