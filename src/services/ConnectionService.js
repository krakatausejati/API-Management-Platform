import axiosInstance from "../helpers/Axios";
import { BASE_URL } from "../helpers/Constant";

export const ConnectionService = {
	getAllConnection,
	createConnection,
	deleteConnection,
	editConnection,
	updateConnection,
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

function deleteConnection(idConnection) {
	return axiosInstance(BASE_URL.CONNECTION).delete(`/${idConnection}`);
}

function editConnection(idConnection) {
	return axiosInstance(BASE_URL.CONNECTION).get(`/${idConnection}`);
}

function updateConnection(values) {
	const {
		idConnection,
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
	return axiosInstance(BASE_URL.CONNECTION).put(
		`/${idConnection}`,
		JSON.stringify(connectionData),
		{
			headers: {
				"Content-Type": "application/json",
			},
		}
	);
}
