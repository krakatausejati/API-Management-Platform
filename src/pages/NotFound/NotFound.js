import { Button } from "antd";
import { Link } from "react-router-dom";
import "./not-found.css";

function NotFound() {
	return (
		<div className='wrapper-not-found'>
			<div className='description'>
				<h1>404</h1>
				<p>Error Not Found</p>
			</div>
			<Link to='/dashboard'>
				<Button>Back to Dashboard</Button>
			</Link>
		</div>
	);
}

export default NotFound;
