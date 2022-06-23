import { Redirect } from "react-router-dom";
import { AuthService } from "../services/AuthService";

const PrivateRoute = ({ children }) => {
	const accessTokenExpired = localStorage.getItem("accessTokenExpire");
	const currentTime = new Date().getTime();

	if (accessTokenExpired <= currentTime) {
		AuthService.logout();
	}

	const isLoggedIn =
		localStorage.getItem("access_token") &&
		localStorage.getItem("refresh_token")
			? true
			: false;

	return isLoggedIn ? children : <Redirect to='/login' />;
};

export default PrivateRoute;
