import axios from "axios";

const axiosInstance = (url = "") => {
	const axiosConfig = axios.create({
		baseURL: url,
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
			// "Access-Control-Allow-Origin": "*",
			// ...AuthHeader(),
		},
	});

	axiosConfig.interceptors.request.use(
		(config) => {
			const token = localStorage.getItem("access_token");
			if (token) {
				config.headers["Authorization"] = `Bearer ${token}`;
			}
			console.log(config);
			return config;
		},
		(error) => {
			return Promise.reject(error);
		}
	);

	return axiosConfig;
};

// export function axiosInterceptors() {

// }

export default axiosInstance;
