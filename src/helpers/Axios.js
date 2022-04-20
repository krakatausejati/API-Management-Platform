import axios from "axios";

const axiosInstance = (url) => {
	const axiosConfig = axios.create({
		baseURL: url,
		headers: {
			"Content-Type": "application/json",
			"Access-Control-Allow-Origin": "*",
			// ...AuthHeader(),
		},
	});

	return axiosConfig;
};

export default axiosInstance;
