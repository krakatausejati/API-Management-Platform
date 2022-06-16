import axios from "axios";
import { AuthService } from "../services/AuthService";

const axiosInstance = (url = "") => {
	const axiosConfig = axios.create({
		baseURL: url,
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
	});

	axiosConfig.interceptors.request.use(
		async (config) => {
			const accessToken = localStorage.getItem("access_token");
			const accessTokenExpired =
				localStorage.getItem("accessTokenExpire");
			const currentTime = new Date().getTime();

			if (accessToken) {
				if (accessTokenExpired <= currentTime) {
					AuthService.logout();
				}
			}
			return config;
		},
		(error) => {
			return Promise.reject(error);
		}
	);

	axiosConfig.interceptors.response.use(
		(res) => {
			return res;
		},
		(error) => {
			return Promise.reject(error.response.data);
		}
	);

	return axiosConfig;
};

export default axiosInstance;
