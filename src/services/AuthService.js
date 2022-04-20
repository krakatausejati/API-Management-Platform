import axiosInstance from "../helpers/Axios";
import { BASE_URL } from "../helpers/Constant";

export const authenticationService = {
	login,
};

function login(username, password) {
	const body = {
		client_id: "api-auth",
		username,
		password,
		grant_type: "password",
	};
	return axiosInstance(BASE_URL.KEYCLOAK_AUTH).post("/", body);
}
