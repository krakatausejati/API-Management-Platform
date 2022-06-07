import {
	CalendarOutlined,
	CaretDownOutlined,
	DeleteOutlined,
	EyeOutlined,
	PlusOutlined,
	SortAscendingOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Input, Menu, Space, Table } from "antd";
import { Link, useLocation, useParams } from "react-router-dom";
import { Breadcrumbs } from "../../components/molecules/Breadcrumbs";
import useApi from "../../hooks/useApi";
import { getEndpoint } from "../../helpers/Utils";

function ListAPI() {
	let data = useLocation();
	let { idProject, projectName, idGroup, groupName } = useParams();
	const api = useApi(idProject, idGroup);
	const breadcrumb = data.state.breadcrumb;

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
					<Link to={"/delete"}>
						<Button icon={<DeleteOutlined />} danger />
					</Link>
				</Space>
			),
		},
	];

	const { Search } = Input;

	const onSearch = (value) => console.log(value);

	const menu = (
		<Menu>
			<Menu.Item key='1' icon={<SortAscendingOutlined />}>
				Ascending
			</Menu.Item>
			<Menu.Item key='2' icon={<CalendarOutlined />}>
				Created at
			</Menu.Item>
		</Menu>
	);

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
					<div className='sort-field'>
						<Dropdown overlay={menu}>
							<Button block>
								sort by <CaretDownOutlined />
							</Button>
						</Dropdown>
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
