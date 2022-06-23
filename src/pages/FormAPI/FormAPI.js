import { InfoCircleOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Select, Switch } from "antd";
import React, { useState, useEffect } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { Breadcrumbs } from "../../components/molecules/Breadcrumbs";
import { getUsername, handleURLName } from "../../helpers/Utils";
import useAPIDetail from "../../hooks/useAPIDetail";
import useConnection from "../../hooks/useConnection";
import useListMember from "../../hooks/useListMember";
import useSchemaColumn from "../../hooks/useSchemaColumn";
import useSchemaTable from "../../hooks/useSchemaTable";
import useSchemaView from "../../hooks/useSchemaView";
import { APIService } from "../../services/APIService";
import "./form-api.css";

export default function FormAPI() {
	let { idProject, projectName, idGroup, groupName } = useParams();
	let data = useLocation();
	const [form] = Form.useForm();

	const history = useHistory();
	const { connection } = useConnection();
	const members = useListMember(idProject);
	const apiOwner = getUsername();
	const userData = members.length > 0 ? members : [];
	const [connectionSelected, setConnectionSelected] = useState("");

	const idApi = data.state.idApi ?? null;
	const apiDetail = useAPIDetail(idApi);

	useEffect(() => {
		if (!apiDetail) {
			return null;
		} else {
			form.setFieldsValue({
				idApi,
				generatedEndpoint: apiDetail.apiEndpoint,
				table: apiDetail.dbTable,
				column: apiDetail.selectedColumn,
				description: apiDetail.description,
				limit: apiDetail.apiLimit,
				is_private: apiDetail.private,
				connection: apiDetail.idConnection,
				listUser: apiDetail.listUser,
			});
		}
	}, [apiDetail, form, idApi]);

	const connectionConfig =
		connectionSelected && handleConnectionConfig(connectionSelected);

	const tables = useSchemaTable(connectionConfig ?? null);
	const views = useSchemaView(connectionConfig ?? null);

	const [isPrivate, setIsPrivate] = useState("");

	const [tableSelected, setTableSelected] = useState("");
	const columns = useSchemaColumn(tableSelected, connectionConfig ?? null);

	const breadcrumb = data.state.breadcrumb;
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
		values.apiOwner = apiOwner;
		console.log(
			"🚀 ~ file: FormAPI.js ~ line 98 ~ handleSubmit ~ values",
			values
		);

		if (!idApi) {
			APIService.createAPI(values)
				.then(() => {
					history.goBack();
				})
				.catch((error) => {
					console.log("Something went wrong", error);
				});
		} else {
			APIService.updateAPI(values)
				.then(() => {
					history.goBack();
				})
				.catch((error) => {
					console.log("Something went wrong", error);
				});
		}
	};

	function handleConnectionConfig(connectionSelected) {
		console.log(
			"🚀 ~ file: FormAPI.js ~ line 148 ~ handleConnectionConfig ~ connectionSelected",
			connectionSelected
		);
		let connectionFind = connection.find(
			(connectionItem) => connectionItem?.id === connectionSelected
		);
		console.log(
			"🚀 ~ file: FormAPI.js ~ line 152 ~ handleConnectionConfig ~ connectionFind",
			connectionFind
		);

		return connectionFind;
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
							<Form.Item
								// label='Connection Name'
								name='idApi'
								style={{ display: "none" }}
							>
								<Input />
							</Form.Item>
							<Form.Item
								label='Connections'
								name='connection'
								rules={[
									{
										required: true,
										message:
											"Please chooose the connection first!",
									},
								]}
							>
								<Select
									onChange={(value) => {
										setConnectionSelected(value);
									}}
								>
									{connection.map((connectionItem) => (
										<Option
											value={connectionItem.id}
											key={connectionItem.id}
										>
											{connectionItem.connectionName}
										</Option>
									))}
								</Select>
							</Form.Item>

							{connectionSelected && (
								<Form.Item
									label='Table / View'
									name='table'
									rules={[
										{
											required: true,
											message:
												"Please choose the table or view!",
										},
									]}
								>
									<Select
										onChange={(value) => {
											setTableSelected(value);
										}}
									>
										{tables.map((tables, index) => (
											<Option
												value={tables.tableName}
												key={index}
											>
												Table {tables.tableName}
											</Option>
										))}
										{views.map((views, index) => (
											<Option
												value={views.viewName}
												key={index}
											>
												View {views.viewName}
											</Option>
										))}
									</Select>
								</Form.Item>
							)}

							{tableSelected && (
								<Form.Item
									label='Column'
									name='column'
									rules={[
										{
											required: true,
											message:
												"Please choose the column!",
										},
									]}
								>
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
							)}
							<h2>Limits</h2>
							<Form.Item
								label='Max Limit'
								name='limit'
								rules={[
									{
										required: true,
										message:
											"Limit required, input number instead!",
										pattern: new RegExp(/^[0-9]+$/),
									},
								]}
							>
								<Input addonAfter={"per hours"} />
							</Form.Item>
						</div>
						<div
							className='right-side'
							style={{ minWidth: "600px" }}
						>
							<h2>Identity API</h2>
							<Form.Item
								label='Description'
								name='description'
								rules={[
									{
										required: true,
										message:
											"Please input the description!",
									},
								]}
							>
								<Input />
							</Form.Item>
							<Form.Item
								label='Endpoints'
								name='endpoint'
								rules={[
									{
										required: true,
										message: "Please input the endpoint!",
									},
								]}
							>
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
							{isPrivate && (
								<Form.Item
									label='Member of Project'
									name='listUser'
								>
									<Checkbox.Group
										options={userData}
										className='checkbox-group'
									/>
								</Form.Item>
							)}
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
