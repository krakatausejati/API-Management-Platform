import axiosInstance from "../helpers/Axios";
import { BASE_URL } from "../helpers/Constant";
import qs from "query-string";

export const AuthService = {
	login,
	logout,
	refreshToken,
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

function refreshToken() {
	const accessToken = localStorage.getItem("access_token");
	const refreshToken = localStorage.getItem("refresh_token");

	const body = {
		client_id: "api-auth",
		refreshToken,
		grant_type: "refresh_token",
	};

	return axiosInstance(BASE_URL.KEYCLOAK_AUTH).post("", qs.stringify(body), {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	});
}

function logout() {
	localStorage.removeItem("access_token");
	localStorage.removeItem("refresh_token");
}
