import axiosInstance from "../helpers/Axios";
import { BASE_URL } from "../helpers/Constant";
import qs from "query-string";

export const AdminService = {
	adminToken,
	getUser,
};

function adminToken() {
	const body = {
		client_id: "api-auth",
		username: "admin",
		password: "Kota107",
		grant_type: "password",
	};
	return axiosInstance(BASE_URL.KEYCLOAK_AUTH).post("", qs.stringify(body));
}

function getUser(token) {
	return axiosInstance(BASE_URL.KEYCLOAK_USER).get("", {
		headers: {
			Authorization: "Bearer " + token,
		},
	});
}
