import { InfoCircleOutlined } from "@ant-design/icons";
import {
	Breadcrumb,
	Button,
	Checkbox,
	Form,
	Input,
	Select,
	Switch,
} from "antd";
import React, { useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { handleURLName } from "../../helpers/Utils";
import useConnection from "../../hooks/useConnection";
import useSchemaColumn from "../../hooks/useSchemaColumn";
import useSchemaTable from "../../hooks/useSchemaTable";
import useListUser from "../../hooks/useListUser";
import { APIService } from "../../services/APIService";
import "./create-api.css";

export default function FormAPI() {
	let { projectName, groupName } = useParams();
	const connections = useConnection();
	const users = useListUser();
	const userData =
		users.length > 0
			? users.map((userItem) => ({
					label: `${userItem.username}`,
					value: userItem.id,
			  }))
			: [];
	const [connectionSelected, setConnectionSelected] = useState("");

	const connectionConfig = connectionSelected
		? handleConnectionConfig(connectionSelected)
		: null;

	const tables = useSchemaTable(connectionConfig || null);

	const [isPrivate, setIsPrivate] = useState("");

	const [tableSelected, setTableSelected] = useState("");
	const columns = useSchemaColumn(tableSelected, connectionConfig || null);

	let data = useLocation();
	const breadcrumb = data.state.breadcrumb;
	const [form] = Form.useForm();
	const [requiredMark, setRequiredMarkType] = useState("");

	const [indeterminate] = useState(true);

	const onRequiredTypeChange = ({ requiredMarkValue }) => {
		setRequiredMarkType(requiredMarkValue);
	};

	const { Option } = Select;

	const columnData = columns.map((columnItem) => ({
		label: `${columnItem.columnName} | ${columnItem.columnType}`,
		value: columnItem.columnName,
	}));

	const onChangeChecked = (list) => {
		if (list.length === columnData.length) {
			form.setFieldsValue({
				...form.getFieldsValue(),
				column: ["*"],
			});
		} else {
			form.setFieldsValue({
				...form.getFieldsValue(),
				column: list,
			});
		}
	};

	const onCheckAllChange = (e) => {
		form.setFieldsValue({
			...form.getFieldsValue(),
			column: e.target.checked ? ["*"] : [],
		});
	};

	const handleChangeEndpoint = (e) => {
		const { value } = e.target;
		handleGeneratedEndpoint(value);
	};

	const handleSubmit = (values) => {
		APIService.createAPI(values)
			.then((response) => {
				window.location.reload();
			})
			.catch((error) => {
				console.log("Something went wrong", error);
			});
	};

	function handleConnectionConfig(connectionSelected) {
		let connection = connections.find(
			(connectionItem) => connectionItem?.id === connectionSelected
		);

		return connection;
	}

	const handleGeneratedEndpoint = (endpoint) => {
		let generatedEndpoints = `http://localhost:8080/generated/api/${projectName}/${groupName}/${handleURLName(
			endpoint
		)}`;

		form.setFieldsValue({
			...form.getFieldsValue(),
			generatedEndpoint: generatedEndpoints,
		});
	};

	return (
		<>
			<Breadcrumb>
				<Breadcrumb.Item>
					<Link to={`/${breadcrumb.toLowerCase()}`}>
						{breadcrumb}
					</Link>
				</Breadcrumb.Item>
				<Breadcrumb.Item>Create API</Breadcrumb.Item>
			</Breadcrumb>
			<div className='create-api' style={{ marginTop: "16px" }}>
				<Form
					form={form}
					layout='vertical'
					initialValues={{
						requiredMarkValue: requiredMark,
					}}
					onValuesChange={onRequiredTypeChange}
					requiredMark={requiredMark}
					onFinish={handleSubmit}
				>
					<div
						className='form-create-api'
						style={{ display: "flex", gap: "5rem" }}
					>
						<div
							className='left-side'
							style={{ minWidth: "600px" }}
						>
							<h2>Database</h2>
							<Form.Item label='Connections' name='connection'>
								<Select
									onChange={(value) => {
										setConnectionSelected(value);
									}}
								>
									{connections.map((connections, index) => (
										<Option
											value={connections.id}
											key={connections.id}
										>
											{connections.connectionName}
										</Option>
									))}
								</Select>
							</Form.Item>

							{connectionSelected ? (
								<Form.Item label='Table' name='table'>
									<Select
										onChange={(value) => {
											setTableSelected(value);
										}}
									>
										{tables.map((tables, index) => (
											<Option value={tables} key={index}>
												{tables}
											</Option>
										))}
									</Select>
								</Form.Item>
							) : null}

							{tableSelected ? (
								<Form.Item label='Column' name='column'>
									<Checkbox
										indeterminate={indeterminate}
										onChange={onCheckAllChange}
									>
										Check all
									</Checkbox>{" "}
									<Checkbox.Group
										options={columnData}
										onChange={onChangeChecked}
									/>{" "}
								</Form.Item>
							) : null}
							<h2>Limits</h2>
							<Form.Item label='Max Limit' name='limit'>
								<Input addonAfter={"per hours"} />
							</Form.Item>
						</div>
						<div
							className='right-side'
							style={{ minWidth: "600px" }}
						>
							<h2>Identity API</h2>
							<Form.Item label='Description' name='description'>
								<Input />
							</Form.Item>
							<Form.Item label='Endpoints' name='endpoint'>
								<Input onChange={handleChangeEndpoint} />
							</Form.Item>
							<Form.Item label='Private' name='is_private'>
								<Switch
									onChange={(value) => {
										setIsPrivate(value);
									}}
									defaultChecked={false}
								/>
							</Form.Item>
							{isPrivate ? (
								<Form.Item name='listUser'>
									<Checkbox.Group
										options={userData}
										className='checkbox-group'
									/>
								</Form.Item>
							) : null}
						</div>
					</div>
					<div className='preview-generated-api'>
						<h4>
							<InfoCircleOutlined /> Preview Generated API
						</h4>
						<Form.Item name='generatedEndpoint'>
							<Input disabled />
						</Form.Item>
					</div>
					<Form.Item style={{ marginTop: "24px" }}>
						<Button type='primary' htmlType='submit'>
							SUBMIT
						</Button>
					</Form.Item>
				</Form>
			</div>
		</>
	);
}
