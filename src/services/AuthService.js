import axiosInstance from "../helpers/Axios";
import { BASE_URL } from "../helpers/Constant";
import qs from "query-string";

export const AuthService = {
	login,
	logout,
};

function login(username, password) {
	const body = {
		client_id: "api-auth",
		username,
		password,
		grant_type: "password",
	};
	return axiosInstance(BASE_URL.KEYCLOAK_AUTH).post("", qs.stringify(body));
}

function logout() {
	localStorage.removeItem("access_token");
	localStorage.removeItem("refresh_token");
}
