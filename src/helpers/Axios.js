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
			// const limitExpire =
			// 	new Date().getTime() + accessTokenExpired * 1000;
			const currentTime = new Date().getTime();

			if (accessToken) {
				if (accessTokenExpired <= currentTime) {
					console.log("truez");
					const rs = await AuthService.refreshToken(accessToken);
					console.log("true");
					const { access_token, refresh_token, expires_in } = rs;
					localStorage.setItem("access_token", access_token);
					localStorage.setItem("refresh_token", refresh_token);
					localStorage.setItem(
						"accessTokenExpire",
						expires_in * 1000 + new Date().getTime()
					);
					config.headers["Authorization"] = `Bearer ${access_token}`;
				} else {
					console.log();
					config.headers["Authorization"] = `Bearer ${accessToken}`;
				}
			}
			return config;
		},
		(error) => {
			return Promise.reject(error);
		}
	);
	return axiosConfig;
};

export default axiosInstance;
