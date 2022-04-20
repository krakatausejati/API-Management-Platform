import React, { useState, useEffect } from "react";
import { Breadcrumb, Form, Input, Checkbox, Button, Modal, Select } from "antd";
import { Link } from "react-router-dom";
import "./create-project.css";
import useConnection from "../../hooks/useConnection";

function CreateProject() {
	const [form] = Form.useForm();
	const [requiredMark, setRequiredMarkType] = useState("");
	const connection = useConnection();

	const user = [
		{ label: "softone", value: "softone" },
		{ label: "atauwu", value: "atauwu" },
	];

	const onRequiredTypeChange = ({ requiredMarkValue }) => {
		setRequiredMarkType(requiredMarkValue);
	};

	const [isModalVisible, setIsModalVisible] = useState(false);

	const showModal = () => {
		setIsModalVisible(true);
	};

	const handleOk = () => {
		setIsModalVisible(false);
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};

	const { Option } = Select;

	return (
		<>
			{/* Modal */}
			<Modal
				title='Add New Project'
				visible={isModalVisible}
				onOk={handleOk}
				onCancel={handleCancel}
				footer={[
					<Button key='add-project' onClick={handleOk} type='primary'>
						Add Project
					</Button>,
				]}
			>
				<Form layout='vertical'>
					<Form.Item label='Connection Name'>
						<Input />
					</Form.Item>
					<Form.Item label='Database Name'>
						<Input />
					</Form.Item>
					<Form.Item label='Database Username'>
						<Input />
					</Form.Item>
					<Form.Item label='Database Password'>
						<Input />
					</Form.Item>
					<Form.Item label='Port'>
						<Input />
					</Form.Item>
					<Form.Item label='URL'>
						<Input />
					</Form.Item>
				</Form>
			</Modal>
			{/* Modal */}

			<Breadcrumb>
				<Breadcrumb.Item>
					<Link to={"/project"}>Project</Link>
				</Breadcrumb.Item>
				<Breadcrumb.Item>Create Project</Breadcrumb.Item>
			</Breadcrumb>
			<div className='create-project' style={{ marginTop: "16px" }}>
				<Form
					form={form}
					layout='vertical'
					initialValues={{
						requiredMarkValue: requiredMark,
					}}
					onValuesChange={onRequiredTypeChange}
					requiredMark={requiredMark}
				>
					<h2>Create New Project</h2>
					<div className='form-create-project'>
						<div className='left-side'>
							<h3>Project Name</h3>
							<Form.Item>
								<Input />
							</Form.Item>
							<p>Give a name to this project.</p>
							<h3>Team Members</h3>
							<Form.Item name='remember' valuePropName='checked'>
								<Checkbox.Group
									options={user}
									className='checkbox-group'
								/>
							</Form.Item>
						</div>
						<div className='right-side'>
							<h3>Database Configuration</h3>
							<Form.Item label='Connection'>
								<Select>
									{connection.map((connection, index) => (
										<Option
											value={connection.connectionName}
											key={index}
										>
											{connection.connectionName}
										</Option>
									))}
								</Select>
							</Form.Item>
							<span
								onClick={showModal}
								style={{ marginLeft: "75px" }}
							>
								+ or add new connection
							</span>
							<Form.Item style={{ marginTop: "24px" }}>
								<Button type='primary' htmlType='submit'>
									SUBMIT
								</Button>
							</Form.Item>
						</div>
					</div>
				</Form>
			</div>
		</>
	);
}

export default CreateProject;
