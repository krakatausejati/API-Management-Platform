import {
	PlusOutlined,
	DeleteOutlined,
	ExclamationCircleOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, Modal, Space, Table } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Breadcrumbs } from "../../components/molecules/Breadcrumbs";
import { Roles } from "../../helpers/Constant";
import {
	defineRole,
	handleDate,
	handleURLName,
	showErrorMessage,
} from "../../helpers/Utils.js";
import useProject from "../../hooks/useProject";
import { ProjectService } from "../../services/ProjectService";

function Project() {
	const [refresh, setRefresh] = useState(new Date().getTime());
	const [keyword, setKeyword] = useState("");
	const {project, loading} = useProject(refresh, keyword);
	const [form] = Form.useForm();
	const { confirm } = Modal;
	const [isModalVisible, setIsModalVisible] = useState(false);
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
					<Button
						icon={<DeleteOutlined />}
						onClick={() =>
							showDeleteConfirm(record.key, record.sum_group)
						}
						danger
					/>
				</>
			</Space>
		),
	};

	if (userRole.includes(Roles.PROJECT_OWNER)) columns.push(columnAction);

	const { Search } = Input;
	const onSearch = (value) => {
		setKeyword(value);
	};

	const showModal = () => {
		setIsModalVisible(true);
	};

	const handleOk = (values) => {
		ProjectService.createProject(values)
			.then(() => {
				setRefresh(new Date().getTime());
				setIsModalVisible(false);
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
							form.resetFields();
							handleOk(values);
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
				</Form>
			</Modal>

			{/* Delete Modal */}
			<Modal></Modal>
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
				<Table dataSource={dataSource} columns={columns} loading={loading}/>
			</div>
		</>
	);
}

export default Project;
