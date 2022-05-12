import React, { useState } from "react";
import { Table, Breadcrumb, Button, Input, Modal, Form } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import useProject from "../../hooks/useProject";
import { useKeycloak } from "@react-keycloak/web";
import { ProjectService } from "../../services/ProjectService";
import { handleURLName, handleDate } from "../../helpers/Utils.js";

function Project() {
	const project = useProject();
	const [form] = Form.useForm();
	const [isModalVisible, setIsModalVisible] = useState(false);

	const dataProject = project.map((projectItem, index) => ({
		key: `${projectItem.idProject}`,
		no: `${index + 1}`,
		name: `${projectItem.projectName}`,
		sum_group: "12",
		created_at: `${handleDate(projectItem.createdAt)}`,
		created_by: `${projectItem.projectOwner}`,
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
	const onSearch = (value) => console.log(value);

	const showModal = () => {
		setIsModalVisible(true);
	};

	const handleOk = (values) => {
		const { projectName } = values;

		ProjectService.createProject(projectName)
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

			<div className='breadcrumb'>
				<Breadcrumb>
					<Breadcrumb.Item>Project</Breadcrumb.Item>
				</Breadcrumb>
			</div>
			<div className='header-datatable'>
				<h1>Your Project's</h1>
				<div className='right'>
					<div className='search-field'>
						<Search
							placeholder="search Project's"
							onSearch={onSearch}
						/>
					</div>
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
				</div>
			</div>
			<div className='datatable datatable-api'>
				<Table dataSource={dataSource} columns={columns} />
			</div>
		</>
	);
}

export default Project;
