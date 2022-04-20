import React from "react";
import { Table, Breadcrumb, Button, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import useProject from "../../hooks/useProject";
import { useKeycloak } from "@react-keycloak/web";
import moment from "moment";

function Project() {
	const project = useProject();

	const dataProject = project.map((projectItem, index) => ({
		key: `${projectItem.id}`,
		no: `${index + 1}`,
		name: `${projectItem.projectName}`,
		sum_group: "12",
		created_at: `${moment
			.utc(projectItem.createdAt)
			.local()
			.format("DD MMMM YYYY, HH:m:s a")}`,
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
			render: (data) => (
				<>
					<Link
						to={{
							pathname: `/project/1/group`,
							state: { breadcrumb: "Project", name: data },
						}}
					>
						{data}
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
			title: "Product Owner",
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

	return (
		<>
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
						<Link to={"/create-project"}>
							<Button
								icon={<PlusOutlined />}
								type='primary'
								block
							>
								Create Project
							</Button>
						</Link>
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
