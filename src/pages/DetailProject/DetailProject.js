import React, { useState, useEffect } from "react";
import { Table, Breadcrumb, Button, Input, Form, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import useGroup from "../../hooks/useGroup";
import groupServices from "../../services/s";
import { Breadcrumbs } from "../../components/molecules/Breadcrumbs";

function DetailProject() {
	let data = useLocation();
	const [form] = Form.useForm();
	const group = useGroup();

	const breadcrumb =
		typeof data.state.breadcrumb === "undefined"
			? "nothing"
			: data.state.breadcrumb;

	const dataSource = group.map((groupItem, index) => ({
		key: `${index}`,
		no: `${index + 1}`,
		name: `${groupItem.groupName}`,
		sum_api: "12",
		created_at: `${groupItem.createdAt}`,
		created_by: `${groupItem.createdBy}`,
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
			title: "Total of API",
			dataIndex: "sum_api",
			key: "sum_api",
		},
		{
			title: "Created at",
			dataIndex: "created_at",
			key: "created_at",
		},
		{
			title: "Project Owner",
			dataIndex: "created_by",
			key: "created_by",
		},
		{
			title: "",
			dataIndex: "detail",
			key: "detail",
		},
	];

	const [isModalVisible, setIsModalVisible] = useState(false);

	const showModal = () => {
		setIsModalVisible(true);
	};

	const handleOk = (groupName) => {
		// groupService.createGroup(groupName);
		groupServices
			.createGroup(groupName)
			.then((response) => {
				console.log("Printing connection data", response.data);
			})
			.catch((error) => {
				console.log("Something went wrong", error);
			});
		console.log(groupName);
		form.resetFields();
		setIsModalVisible(false);
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};

	return (
		<>
			{/* Modal */}
			<Modal
				title='Add Group'
				visible={isModalVisible}
				onCancel={handleCancel}
				footer={[
					<Button
						key='add-group'
						onClick={() => {
							form.validateFields()
								.then((values) => {
									handleOk(values);
								})
								.catch((info) => {
									console.log("Validate Failed:", info);
								});
						}}
						type='primary'
					>
						Add Group
					</Button>,
				]}
			>
				<Form layout='vertical'>
					<Form.Item
						label='Group Name'
						name='groupName'
						style={{ width: "100%" }}
					>
						<Input />
					</Form.Item>
				</Form>
			</Modal>
			{/* Modal */}

			{/*  */}
			<Breadcrumbs breadcrumb={breadcrumb} current={data.state.name} />
			<div className='header-datatable'>
				<h1>List Group of {data.state.name}</h1>
				<div className='add-field'>
					<Button
						icon={<PlusOutlined />}
						type='primary'
						block
						onClick={showModal}
					>
						Create Group
					</Button>
				</div>
			</div>
			<div className='datatable datatable-group'>
				<Table dataSource={dataSource} columns={columns} />
			</div>
		</>
	);
}

export default DetailProject;
