import axiosInstance from "../helpers/Axios";
import { BASE_URL } from "../helpers/Constant";

export const ConnectionService = {
	getAllConnection,
	createConnection,
};

function getAllConnection() {
	return axiosInstance(BASE_URL.CONNECTION).get("");
}

function createConnection(values) {
	const {
		connectionName,
		host,
		port,
		databaseName,
		databaseUsername,
		databasePassword,
	} = values;

	let connectionData = {
		connectionName,
		host,
		port,
		databaseName,
		databaseUsername,
		databasePassword,
	};

	return axiosInstance(BASE_URL.CONNECTION).post("", connectionData);
}