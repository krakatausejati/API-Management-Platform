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
		username: "api_owner",
		password: "P@ssw0rd",
		grant_type: "password",
		// client_id: "api-auth",
		// username: "apimanagement",
		// password: "Kota107",
		// grant_type: "password",
	};
	return axiosInstance(BASE_URL.KEYCLOAK_AUTH).post("", qs.stringify(body));
}

function getUser(token) {
	return axiosInstance(BASE_URL.KEYCLOAK_USER).get("", "", {
		headers: {
			Authorization: "Bearer " + token,
		},
	});
}
