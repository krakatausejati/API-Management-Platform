import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Table } from "antd";
import Search from "antd/lib/input/Search";
import React, { useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { Breadcrumbs } from "../../components/molecules/Breadcrumbs";
import { Roles } from "../../helpers/Constant";
import { defineRole, handleDate, handleURLName } from "../../helpers/Utils";
import useGroup from "../../hooks/useGroup";
import { GroupService } from "../../services/GroupService";

function ListGroup() {
	let data = useLocation();
	let { idProject, projectName } = useParams();
	const id = parseInt(idProject, 10);
	const [form] = Form.useForm();

	const [keyword, setKeyword] = useState("");
	const [refresh, setRefresh] = useState("");

	const group = useGroup(id, refresh, keyword);

	const userRole = defineRole();

	const [isModalVisible, setIsModalVisible] = useState(false);

	const breadcrumb = [data.state.breadcrumb, data.state.name];

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
							pathname: `/project/${idProject}/${projectName}/group/${
								record.key
							}/${handleURLName(text)}`,
							state: {
								breadcrumb: [
									...breadcrumb,
									"Group",
									record.name,
								],
							},
						}}
					>
						{text}
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

	const dataSource = group.map((groupItem, index) => ({
		key: `${groupItem.idGroup}`,
		no: `${index + 1}`,
		name: `${groupItem.groupName}`,
		sum_api: `${groupItem.api.length}`,
		created_at: `${handleDate(groupItem.createdAt)}`,
		created_by: `${groupItem.createdBy}`,
		detail: "...",
	}));

	const showModal = () => {
		setIsModalVisible(true);
	};

	const handleOk = (values) => {
		const { groupName } = values;
		GroupService.createGroup(groupName, id)
			.then((response) => {
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

	const onSearch = (value) => {
		console.log(value);
		setKeyword(value);
	};

	return (
		<>
			{/* Modal */}
			<Modal
				title='Add Group'
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
				okText='Create Group'
				cancelText='Cancel'
			>
				<Form layout='vertical' form={form}>
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
				</Form>
			</Modal>
			{/* Modal */}

			{/*  */}
			<Breadcrumbs breadcrumb={breadcrumb} />
			<div className='header-datatable'>
				<h1>List Group of {data.state.name}</h1>
				<div className='right'>
					<div className='search-field'>
						<Search
							placeholder="search group's"
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
								Create Group
							</Button>
						</div>
					) : null}
				</div>
			</div>
			<div className='datatable datatable-group'>
				<Table dataSource={dataSource} columns={columns} />
			</div>
		</>
	);
}

export default ListGroup;
