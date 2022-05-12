import { Breadcrumb, Button, Space, Table, Dropdown, Menu, Input } from "antd";
import { Link, useLocation } from "react-router-dom";
import {
	DeleteOutlined,
	EyeOutlined,
	PlusOutlined,
	CaretDownOutlined,
	SortAscendingOutlined,
	CalendarOutlined,
} from "@ant-design/icons";
import { useParams } from "react-router-dom";
import useApi from "../../hooks/useApi";

function DetailGroup() {
	let data = useLocation();
	const api = useApi();
	let { idProject, projectName, idGroup, groupName } = useParams();
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
					<Link to={`api/${record.key}/history`}>
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
			<div className='breadcrumb'>
				<Breadcrumb>
					<Breadcrumb.Item>
						<Link to={`/${breadcrumb.toLowerCase()}`}>
							{breadcrumb}
						</Link>
					</Breadcrumb.Item>
					<Breadcrumb.Item>{data.state.name}</Breadcrumb.Item>
				</Breadcrumb>
			</div>
			<div className='header-datatable'>
				<h1>List API of {data.state.name}</h1>
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
								state: { breadcrumb },
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

export default DetailGroup;
