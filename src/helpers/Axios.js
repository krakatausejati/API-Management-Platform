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

	return axiosConfig;
};

// axios.interceptors.request.use(
// 	(config) => {
// 		config.headers.Authorization = `${keycloak.token}`;
// 		return config;
// 	},
// 	(error) => {
// 		return Promise.reject(error);
// 	}
// );

export default axiosInstance;
