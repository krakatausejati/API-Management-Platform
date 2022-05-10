import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";
import { Link } from "react-router-dom";

export default function AddField(props) {
	const { title, breadcrumb = null, pathname = null } = props;

	return (
		<div className='add-field'>
			{/* <Link
				to={{
					pathname,
					state: { breadcrumb },
				}}
			> */}
			<Button icon={<PlusOutlined />} type='primary' block>
				{title}
			</Button>
			{/* </Link> */}
		</div>
	);
}
