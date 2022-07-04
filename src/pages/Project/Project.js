import {
	PlusOutlined,
	DeleteOutlined,
	ExclamationCircleOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, Modal, Select, Space, Table } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Breadcrumbs } from "../../components/molecules/Breadcrumbs";
import { Roles } from "../../helpers/Constant";
import {
	defineRole,
	handleDate,
	handleURLName,
	showErrorMessage,
	getUsername,
} from "../../helpers/Utils.js";
import useListUser from "../../hooks/useListUser";
import useProject from "../../hooks/useProject";
import { ProjectService } from "../../services/ProjectService";
import { GroupService } from "../../services/GroupService";

function Project() {
	const [refresh, setRefresh] = useState(new Date().getTime());
	const [keyword, setKeyword] = useState("");
	const username = getUsername();
	const { project, loading } = useProject(refresh, keyword);
	const [form] = Form.useForm();
	const [formGroup] = Form.useForm();
	const { confirm } = Modal;
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [isModalVisibleGroup, setIsModalVisibleGroup] = useState(false);
	const [idProject, setIdProject] = useState("");

	const dataSource = project.map((projectItem, index) => ({
		key: `${projectItem.idProject}`,
		no: `${index + 1}`,
		name: `${projectItem.projectName}`,
		description: `${projectItem.description}`,
		sum_group: `${projectItem.group.length}`,
		created_at: `${handleDate(projectItem.createdAt)}`,
		created_by: `${projectItem.projectOwner}`,
		detail: "...",
	}));

	const userRole = defineRole();
	const users = useListUser() ?? [];

	const usersData = users.length > 0 ? users : [];

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
			render: (text, record) => (
				<>
					<Link
						to={{
							pathname: `/project/${record.key}/${handleURLName(
								text
							)}/group`,
							state: { breadcrumb: "Project", name: text },
						}}
					>
						{text}
					</Link>
				</>
			),
		},
		{
			title: "Description",
			dataIndex: "description",
			key: "description",
		},
		{
			title: "Total of Group",
			dataIndex: "sum_group",
			key: "sum_group",
		},
		{
			title: "Project Owner",
			dataIndex: "created_by",
			key: "created_by",
		},
		{
			title: "Created at",
			dataIndex: "created_at",
			key: "created_at",
		},
	];

	const columnAction = {
		title: "",
		dataIndex: "detail",
		key: "detail",
		render: (text, record) => (
			<Space>
				<>
					{username === record.created_by && (
						<Button
							icon={<DeleteOutlined />}
							onClick={() =>
								showDeleteConfirm(record.key, record.sum_group)
							}
							danger
						/>
					)}
				</>
			</Space>
		),
	};

	if (userRole.includes(Roles.PROJECT_OWNER)) columns.push(columnAction);

	const { Search } = Input;
	const { Option } = Select;

	const [assignedMembers, setAssignedMembers] = useState([]);
	const filteredUsers = usersData.filter(
		(item) => !assignedMembers.includes(item.username)
	);

	const onSearch = (value) => {
		setKeyword(value);
	};

	const showModal = () => {
		setIsModalVisible(true);
	};

	const handleOk = (values) => {
		ProjectService.createProject(values)
			.then((res) => {
				setRefresh(new Date().getTime());
				setIsModalVisible(false);
				setIdProject(res.data.payload.idProject);
				setIsModalVisibleGroup(true);
			})
			.catch((error) => {
				const [errorMessage] = error.messages;

				showErrorMessage(
					Modal,
					<ExclamationCircleOutlined />,
					errorMessage
				);
			});
	};

	const handleOkGroup = (values) => {
		GroupService.createGroup(values, idProject)
			.then(() => {
				setRefresh(new Date().getTime());
				setIsModalVisibleGroup(false);
			})
			.catch((error) => {
				const [errorMessage] = error.messages;

				showErrorMessage(
					Modal,
					<ExclamationCircleOutlined />,
					errorMessage
				);
			});
	};

	const handleCancel = () => {
		form.resetFields();
		setIsModalVisible(false);
	};

	const showDeleteConfirm = (idProject, sumGroup) => {
		confirm({
			title: "Are you sure want to delete this project?",
			icon: <ExclamationCircleOutlined />,
			content: `This project have ${sumGroup} group and will deleted permanently`,
			okText: "Yes",
			okType: "danger",
			cancelText: "No",

			onOk() {
				ProjectService.deleteProject(idProject)
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
				title='Add Project'
				visible={isModalVisible}
				onOk={() => {
					form.validateFields()
						.then((values) => {
							handleOk(values);
							form.resetFields();
						})
						.catch((info) => {
							console.log("Validate Failed:", info);
						});
				}}
				onCancel={handleCancel}
				okText='Create Project'
				cancelText='Cancel'
			>
				<Form layout='vertical' form={form}>
					<Form.Item
						label='Project Name'
						name='projectName'
						style={{ width: "100%" }}
						rules={[
							{
								required: true,
								message: "Please input the project name!",
							},
						]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						label='Description'
						name='description'
						style={{ width: "100%" }}
						rules={[
							{
								required: true,
								message: "Please input the description!",
							},
						]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						label='List Member'
						name='listMember'
						style={{ width: "100%" }}
						rules={[
							{
								required: true,
								message:
									"Please assign the member for the project!",
							},
						]}
					>
						<Select
							mode='multiple'
							placeholder='Assign Team member'
							value={assignedMembers}
							onChange={setAssignedMembers}
							style={{ width: "100%" }}
						>
							{filteredUsers.map((userItem) => (
								<Option
									value={userItem.username}
									key={userItem.id}
								>
									{userItem.username}
								</Option>
							))}
						</Select>
					</Form.Item>
				</Form>
			</Modal>

			<Modal
				title='Add Group'
				visible={isModalVisibleGroup}
				onOk={() => {
					formGroup
						.validateFields()
						.then((values) => {
							handleOkGroup(values);
							formGroup.resetFields();
						})
						.catch((info) => {
							console.log("Validate Failed:", info);
						});
				}}
				okText='Create Group'
			>
				<Form layout='vertical' form={formGroup}>
					<Form.Item
						label='Group Name'
						name='groupName'
						style={{ width: "100%" }}
						rules={[
							{
								required: true,
								message: "Please input the group name!",
							},
						]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						label='Description'
						name='description'
						style={{ width: "100%" }}
						rules={[
							{
								required: true,
								message: "Please input the description!",
							},
						]}
					>
						<Input />
					</Form.Item>
				</Form>
			</Modal>
			{/* Modal */}

			<Breadcrumbs breadcrumb={["Project"]} />
			<div className='header-datatable'>
				<h1>Your Project's</h1>
				<div className='right'>
					<div className='search-field'>
						<Search
							placeholder="search Project's"
							onSearch={onSearch}
						/>
					</div>
					{userRole.includes(Roles.PROJECT_OWNER) ? (
						<div className='add-field'>
							<Button
								icon={<PlusOutlined />}
								type='primary'
								block
								onClick={showModal}
							>
								Add Project
							</Button>
						</div>
					) : null}
				</div>
			</div>
			<div className='datatable datatable-api'>
				<Table
					dataSource={dataSource}
					columns={columns}
					loading={loading}
				/>
			</div>
		</>
	);
}

export default Project;
