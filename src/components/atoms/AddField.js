import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";

export default function AddField(props) {
	const { title } = props;

	return (
		<div className='add-field'>
			<Button icon={<PlusOutlined />} type='primary' block>
				{title}
			</Button>
		</div>
	);
}
