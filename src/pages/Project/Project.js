import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Table } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Breadcrumbs } from "../../components/molecules/Breadcrumbs";
import { Roles } from "../../helpers/Constant";
import { defineRole, handleDate, handleURLName } from "../../helpers/Utils.js";
import useProject from "../../hooks/useProject";
import { ProjectService } from "../../services/ProjectService";

function Project() {
	const [refresh, setRefresh] = useState(new Date().getTime());
	const [keyword, setKeyword] = useState("");
	const project = useProject(refresh, keyword);
	const [form] = Form.useForm();
	const [isModalVisible, setIsModalVisible] = useState(false);
	const dataProject = project.map((projectItem, index) => ({
		key: `${projectItem.idProject}`,
		no: `${index + 1}`,
		name: `${projectItem.projectName}`,
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
		{
			title: "",
			dataIndex: "detail",
			key: "detail",
		},
	];

	const dataSource = dataProject ? dataProject : "Empty Project";

	const { Search } = Input;
	const onSearch = (value) => {
		setKeyword(value);
	};

	const showModal = () => {
		setIsModalVisible(true);
	};

	const handleOk = (values) => {
		const { projectName } = values;

		ProjectService.createProject(projectName)
			.then(() => {
				setRefresh(new Date().getTime());
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
								message: "Please input the group name!",
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
								Create Project
							</Button>
						</div>
					) : null}
				</div>
			</div>
			<div className='datatable datatable-api'>
				<Table dataSource={dataSource} columns={columns} />
			</div>
		</>
	);
}

export default Project;
