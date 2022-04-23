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
import { Link, useLocation } from "react-router-dom";
import useSchemaColumn from "../../hooks/useSchemaColumn";
import useSchemaTable from "../../hooks/useSchemaTable";
import useConnection from "../../hooks/useConnection";
import "./create-api.css";

export default function FormAPI() {
	const connections = useConnection();
	const [connectionSelected, setConnectionSelected] = useState("");

	const config = connectionSelected
		? connectionConfig(connectionSelected)
		: null;

	const tables = useSchemaTable(config || null);

	const [tableSelected, setTableSelected] = useState("");
	const columns = useSchemaColumn(tableSelected, config || null);

	let data = useLocation();
	const breadcrumb = data.state.breadcrumb;
	const [form] = Form.useForm();
	const [requiredMark, setRequiredMarkType] = useState("");

	const onRequiredTypeChange = ({ requiredMarkValue }) => {
		setRequiredMarkType(requiredMarkValue);
	};

	const { Option } = Select;

	const columnData = columns.map((columnItem) => ({
		label: `${columnItem.columnName} | ${columnItem.columnType}`,
		value: columnItem.columnName,
	}));

	const listUserData = [
		{
			label: "Shofwan",
			value: "Shofwan",
		},
		{
			label: "Atau",
			value: "Atau",
		},
	];

	function connectionConfig(connectionSelected) {
		let connection = connections.find(
			(connectionItem) => connectionItem?.id === connectionSelected
		);

		return connection;
	}

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
				>
					<div
						className='form-create-api'
						style={{ display: "flex", gap: "5rem" }}
					>
						<div
							className='left-side'
							style={{ minWidth: "600px" }}
						>
							<h2>Identity API</h2>
							<Form.Item label='Description'>
								<Input />
							</Form.Item>
							<Form.Item label='Endpoints'>
								<Input />
							</Form.Item>
							<Form.Item label='Private'>
								<Switch />
							</Form.Item>
							<Form.Item valuePropName='checked'>
								<Checkbox.Group
									options={listUserData}
									className='checkbox-group'
								/>
							</Form.Item>
						</div>
						<div
							className='right-side'
							style={{ minWidth: "600px" }}
						>
							<h2>Database</h2>
							<Form.Item label='Connections'>
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
								<Form.Item label='Table'>
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
								<Form.Item
									label='Column'
									valuePropName='checked'
								>
									{" "}
									<Checkbox.Group
										options={columnData}
										className='checkbox-group'
									/>{" "}
								</Form.Item>
							) : null}
							<h2>Limits</h2>
							<Form.Item label='Max Limit'>
								<Input addonAfter={"per hours"} />
							</Form.Item>
						</div>
					</div>
					<div className='preview-generated-api'>
						<h4>
							<InfoCircleOutlined /> Preview Generated API
						</h4>
						<Input
							disabled
							defaultValue={
								"https://api.management.nbi.com/{user}/{project_name}/{group_name}/(free}"
							}
						/>
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
