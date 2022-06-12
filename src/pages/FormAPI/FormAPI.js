import { InfoCircleOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Select, Switch } from "antd";
import React, { useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { Breadcrumbs } from "../../components/molecules/Breadcrumbs";
import { handleURLName } from "../../helpers/Utils";
import useConnection from "../../hooks/useConnection";
import useListUser from "../../hooks/useListUser";
import useSchemaColumn from "../../hooks/useSchemaColumn";
import useSchemaTable from "../../hooks/useSchemaTable";
import useSchemaView from "../../hooks/useSchemaView";
import { APIService } from "../../services/APIService";
import "./create-api.css";

export default function FormAPI() {
	let { idProject, projectName, idGroup, groupName } = useParams();
	const history = useHistory();
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
	const views = useSchemaView(connectionConfig || null);

	const [isPrivate, setIsPrivate] = useState("");

	const [tableSelected, setTableSelected] = useState("");
	const columns = useSchemaColumn(tableSelected, connectionConfig || null);

	let data = useLocation();
	const breadcrumb = data.state.breadcrumb;
	const [form] = Form.useForm();
	const [requiredMark, setRequiredMarkType] = useState("");

	const [indeterminate, setIndeterminate] = useState(false);
	const [checked, setChecked] = useState([]);
	const [checkAll, setCheckAll] = useState(false);

	const onRequiredTypeChange = ({ requiredMarkValue }) => {
		setRequiredMarkType(requiredMarkValue);
	};

	const { Option } = Select;

	const columnData = columns.map((columnItem) => ({
		label: `${columnItem.columnName} | ${columnItem.columnType}`,
		value: columnItem.columnName,
	}));

	const onChangeChecked = (list) => {
		setChecked(list);
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
		setCheckAll(list.length === columnData.length);
		setIndeterminate(
			list.length > 0 && list.length < columnData.length ? true : false
		);
	};

	const onCheckAllChange = (e) => {
		form.setFieldsValue({
			...form.getFieldsValue(),
			column: e.target.checked ? ["*"] : [],
		});
		setChecked(
			e.target.checked ? columnData.map((column) => column.value) : []
		);
		setCheckAll(e.target.checked);
		setIndeterminate(false);
	};

	const handleChangeEndpoint = (e) => {
		const { value } = e.target;
		handleGeneratedEndpoint(value);
	};

	const handleSubmit = (values) => {
		values.idGroup = idGroup;
		console.log(
			"🚀 ~ file: FormAPI.js ~ line 98 ~ handleSubmit ~ values",
			values
		);

		APIService.createAPI(values)
			.then(() => {
				history.goBack();
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
		let generatedEndpoints = `/generated/api/${projectName}/${groupName}/${handleURLName(
			endpoint
		)}`;

		form.setFieldsValue({
			...form.getFieldsValue(),
			generatedEndpoint: generatedEndpoints,
		});
	};

	return (
		<>
			<Breadcrumbs breadcrumb={breadcrumb} />
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
								<Form.Item label='Table / View' name='table'>
									<Select
										onChange={(value) => {
											setTableSelected(value);
										}}
									>
										{tables.map((tables, index) => (
											<Option value={tables} key={index}>
												Table {tables}
											</Option>
										))}
										{views.map((views, index) => (
											<Option value={views} key={index}>
												View {views}
											</Option>
										))}
									</Select>
								</Form.Item>
							) : null}

							{tableSelected ? (
								<Form.Item label='Column' name='column'>
									<Checkbox
										indeterminate={
											!checkAll ? indeterminate : false
										}
										onChange={onCheckAllChange}
										checked={checkAll}
									>
										Check all
									</Checkbox>{" "}
									<Checkbox.Group
										options={columnData}
										value={checked}
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
							<Form.Item
								label='Private'
								name='is_private'
								initialValue={false}
							>
								<Switch
									defaultChecked={false}
									onChange={(value) => {
										setIsPrivate(value);
									}}
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
