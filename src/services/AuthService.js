import axiosInstance from "../helpers/Axios";
import axios from "axios";
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

function refreshToken(accessToken) {
	const refreshToken = localStorage.getItem("refresh_token");
	const body = {
		client_id: "api-auth",
		refreshToken,
		grant_type: "refresh_token",
	};

	const refreshInstance = axios.create({
		baseURL: BASE_URL.KEYCLOAK_AUTH,
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
			Authorization: `Bearer ${accessToken}`,
		},
	});

	return refreshInstance.post("", qs.stringify(body));
}

function logout() {
	localStorage.removeItem("access_token");
	localStorage.removeItem("refresh_token");
	localStorage.removeItem("accessTokenExpire");
}
