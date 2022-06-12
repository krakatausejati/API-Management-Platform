import {
	DeleteOutlined,
	EyeOutlined,
	PlusOutlined,
	ExclamationCircleOutlined,
} from "@ant-design/icons";
import { Button, Input, Space, Table, Modal } from "antd";
import { Link, useLocation, useParams } from "react-router-dom";
import { Breadcrumbs } from "../../components/molecules/Breadcrumbs";
import { getEndpoint } from "../../helpers/Utils";
import useApi from "../../hooks/useApi";
import React, { useState } from "react";
import { APIService } from "../../services/APIService";

function ListAPI() {
	let data = useLocation();
	let { idProject, projectName, idGroup, groupName } = useParams();
	const breadcrumb = data.state.breadcrumb;
	const { confirm } = Modal;
	const [keyword, setKeyword] = useState("");
	const [refresh, setRefresh] = useState("");
	const api = useApi(idProject, idGroup, keyword, refresh);

	const dataSource = api.map((apiItem, index) => ({
		key: `${apiItem.idApi}`,
		no: `${index + 1}`,
		endpoints: `${apiItem.apiEndpoint}`,
		description: `${apiItem.description}`,
		project: `${projectName}`,
		group: `${groupName}`,
		detail: "...",
	}));

	const columns = [
		{
			title: "No",
			dataIndex: "no",
			key: "no",
		},
		{
			title: "Endpoints",
			dataIndex: "endpoints",
			key: "endpoints",
		},
		{
			title: "Project Name",
			dataIndex: "project",
			key: "project",
		},
		{
			title: "Group Name",
			dataIndex: "group",
			key: "group",
		},
		{
			title: "Description",
			dataIndex: "description",
			key: "description",
		},
		{
			title: "",
			dataIndex: "detail",
			key: "detail",
			render: (text, record) => (
				<Space>
					<Link
						to={{
							pathname: `api/${record.key}/history`,
							state: {
								breadcrumb: [
									...breadcrumb,
									`API - ${getEndpoint(record.endpoints)}`,
								],
							},
						}}
					>
						<Button icon={<EyeOutlined />} type='primary' />
					</Link>
					<Button
						icon={<DeleteOutlined />}
						onClick={() => showDeleteConfirm(record.key)}
						danger
					/>
				</Space>
			),
		},
	];

	const { Search } = Input;

	const onSearch = (value) => setKeyword(value);

	const showDeleteConfirm = (idAPI) => {
		confirm({
			title: "Are you sure want to delete this API?",
			icon: <ExclamationCircleOutlined />,
			content: `This API will deleted permanently`,
			okText: "Yes",
			okType: "danger",
			cancelText: "No",

			onOk() {
				APIService.deleteAPI(idAPI)
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
			<Breadcrumbs breadcrumb={breadcrumb} />
			<div className='header-datatable'>
				<h1>List API of {breadcrumb[breadcrumb.length - 1]}</h1>
				<div className='right'>
					<div className='search-field'>
						<Search
							placeholder="search API's"
							onSearch={onSearch}
						/>
					</div>
					<div className='add-field'>
						<Link
							to={{
								pathname: `/project/${idProject}/${projectName}/group/${idGroup}/${groupName}/form-api`,
								state: {
									breadcrumb: [...breadcrumb, "Create API"],
								},
							}}
						>
							<Button
								icon={<PlusOutlined />}
								type='primary'
								block
							>
								Create API
							</Button>
						</Link>
					</div>
				</div>
			</div>
			<div className='datatable datatable-group'>
				<Table dataSource={dataSource} columns={columns} />
			</div>
		</>
	);
}

export default ListAPI;
