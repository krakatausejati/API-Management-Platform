import {
	CalendarOutlined,
	DeleteOutlined,
	EyeOutlined,
	SortAscendingOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Button, Menu, Space, Table } from "antd";
import { Link } from "react-router-dom";
import HeaderDataTable from "../../components/molecules/HeaderDataTable";
import useApiPublic from "../../hooks/useApiPublic";

function ApiPublic() {
	const apiPublic = useApiPublic();
	const dataSource = apiPublic.map((apiItem, index) => ({
		key: `${apiItem.idApi}`,
		no: `${index + 1}`,
		endpoints: `${apiItem.apiEndpoint}`,
		description: `${apiItem.description}`,
		project: `{Nama Project}`,
		group: `{Nama Group}`,
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
					<Breadcrumb.Item>API</Breadcrumb.Item>
				</Breadcrumb>
			</div>
			<HeaderDataTable
				menu={menu}
				onSearch={onSearch}
				title="Your API's"
				titleButton='Create API'
				pathname='/create-api'
				breadcrumb='API'
			/>
			<div className='datatable datatable-api'>
				<Table dataSource={dataSource} columns={columns} />
			</div>
		</>
	);
}

export default ApiPublic;
