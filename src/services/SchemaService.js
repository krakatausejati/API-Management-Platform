import axiosInstance from "../helpers/Axios";
import { BASE_URL } from "../helpers/Constant";

export const SchemaService = {
	getAllTable,
	getAllColumn,
	getAllViews,
};

function getAllTable(connectionConfig) {
	const {
		host,
		port,
		databaseName,
		databaseUsername,
		databasePassword,
		connectionType,
	} = connectionConfig;

	return axiosInstance(BASE_URL.TABLE).get("", {
		params: {
			host,
			port,
			databaseName,
			databaseUsername,
			databasePassword,
			connectionType,
		},
	});
}

function getAllColumn(tableName, connectionConfig) {
	const {
		host,
		port,
		databaseName,
		databaseUsername,
		databasePassword,
		connectionType,
	} = connectionConfig;

	return axiosInstance(BASE_URL.COLUMN).get("", {
		params: {
			tableName,
			host,
			port,
			databaseName,
			databaseUsername,
			databasePassword,
			connectionType,
		},
	});
}

function getAllViews(connectionConfig) {
	const {
		host,
		port,
		databaseName,
		databaseUsername,
		databasePassword,
		connectionType,
	} = connectionConfig;

	return axiosInstance(BASE_URL.VIEWS).get("", {
		params: {
			host,
			port,
			databaseName,
			databaseUsername,
			databasePassword,
			connectionType,
		},
	});
}
