import axiosInstance from "../helpers/Axios";
import { BASE_URL } from "../helpers/Constant";

export const APIService = {
	getAllHistory,
	getAllAPI,
	createAPI,
};

function getAllHistory() {
	return axiosInstance(BASE_URL.HISTORY).get("");
}

function createAPI(values) {
	const { generatedEndpoint, table, column, description, limit, is_private } =
		values;

	const columns = column.join();

	let dataAPI = {
		apiEndpoint: generatedEndpoint,
		dbTable: table,
		selectedColumn: columns,
		description,
		apiLimit: limit,
		private: is_private,
	};

	return axiosInstance(BASE_URL.API).post("", dataAPI, {
		headers: {
			"Content-Type": "application/json",
			"Access-Control-Allow-Origin": "*",
		},
	});
}

function getAllAPI() {
	return axiosInstance(BASE_URL.API).get("");
}
