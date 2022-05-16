import axios from "axios";

const axiosInstance = (url = "") => {
	const axiosConfig = axios.create({
		baseURL: url,
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
	});

	axiosConfig.interceptors.request.use(
		(config) => {
			const accessToken = localStorage.getItem("access_token");
			if (accessToken) {
				config.headers["Authorization"] = `Bearer ${accessToken}`;
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
