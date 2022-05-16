import { Redirect } from "react-router-dom";

const PrivateRoute = ({ children }) => {
	const isLoggedIn =
		localStorage.getItem("access_token") &&
		localStorage.getItem("refresh_token")
			? true
			: false;

	return isLoggedIn ? children : <Redirect to='/login' />;
};

export default PrivateRoute;
