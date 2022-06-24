import { CopyOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Breadcrumbs } from "../../components/molecules/Breadcrumbs";
import { getEndpoint } from "../../helpers/Utils";
import useApiPublic from "../../hooks/useApiPublic";

function ApiPublic() {
	const [keyword, setKeyword] = useState("");
	const { apiPublic, loading } = useApiPublic(keyword);
	const dataSource = apiPublic.map((apiItem, index) => ({
		key: `${apiItem.idApi}`,
		no: `${index + 1}`,
		endpoints: `${apiItem.apiEndpoint}`,
		description: `${apiItem.description}`,
		project: `Nama Project`,
		group: `Nama Group`,
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
					{text}
					<Button
						icon={<CopyOutlined />}
						type='default'
						onClick={() => {
							navigator.clipboard.writeText(record.endpoints);
						}}
					/>
					<Link
						to={{
							pathname: `api/${record.key}/history`,
							state: {
								breadcrumb: [
									`API - ${getEndpoint(record.endpoints)}`,
								],
							},
						}}
					>
						<Button icon={<EyeOutlined />} type='primary' />
					</Link>
				</Space>
			),
		},
	];

	const { Search } = Input;
	const onSearch = (value) => setKeyword(value);

	return (
		<>
			<Breadcrumbs breadcrumb={["API Public"]} />
			<div className='header-datatable'>
				<h1>APIs Public</h1>
				<div className='right'>
					<div className='search-field'>
						<Search placeholder='search API' onSearch={onSearch} />
					</div>
				</div>
			</div>
			<div className='datatable datatable-api'>
				<Table
					dataSource={dataSource}
					columns={columns}
					loading={loading}
				/>
			</div>
		</>
	);
}

export default ApiPublic;
