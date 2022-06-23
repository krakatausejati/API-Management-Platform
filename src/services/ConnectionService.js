import axiosInstance from "../helpers/Axios";
import { BASE_URL } from "../helpers/Constant";
import qs from "query-string";
import { defineRole } from "../helpers/Utils";

export const ConnectionService = {
	getAllConnection,
	createConnection,
	deleteConnection,
	testConnection,
};

function getAllConnection(keyword) {
	return axiosInstance(BASE_URL.CONNECTION).get("", {
		params: {
			keyword,
		},
	});
}

function testConnection(values) {
	const {
		host,
		port,
		databaseName,
		connectionType,
		databaseUsername,
		databasePassword,
	} = values;

	let connectionData = {
		host,
		port,
		databaseName,
		connectionType,
		databaseUsername,
		databasePassword,
	};

	return axiosInstance(BASE_URL.CONNECTION_TEST).post(
		"",
		qs.stringify(connectionData)
	);
}

function createConnection(values) {
	const {
		connectionName,
		host,
		port,
		databaseName,
		databaseUsername,
		databasePassword,
		connectionType,
	} = values;

	const [role] = defineRole();

	let connectionData = {
		connectionName,
		connectionType,
		host,
		port,
		databaseName,
		databaseUsername,
		databasePassword,
		role,
	};

	return axiosInstance(BASE_URL.CONNECTION).post(
		"",
		JSON.stringify(connectionData),
		{
			headers: {
				"Content-Type": "application/json",
			},
		}
	);
}

function deleteConnection(idConnection) {
	const [role] = defineRole();
	return axiosInstance(BASE_URL.CONNECTION).delete(`/${idConnection}`, {
		headers: {
			"Content-Type": "application/json",
			"Access-Control-Allow-Origin": "*",
		},
		data: {
			role,
		},
	});
}
