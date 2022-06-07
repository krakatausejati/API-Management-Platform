import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";

export const Breadcrumbs = (props) => {
	const { breadcrumb } = props;
	const [project, projectName, group, groupName] = breadcrumb;
	return (
		<div className='breadcrumb'>
			<Breadcrumb>
				{breadcrumb.map((item, i, array) => {
					if (i + 1 === array.length) {
						return (
							<Breadcrumb.Item key={i}>{item}</Breadcrumb.Item>
						);
					} else {
						return (
							<Breadcrumb.Item key={i}>
								<Link to={`/${item.toLowerCase()}`}>
									{item}
								</Link>
							</Breadcrumb.Item>
						);
					}
				})}
			</Breadcrumb>
		</div>
	);
};
