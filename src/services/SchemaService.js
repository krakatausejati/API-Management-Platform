import axiosInstance from "../helpers/Axios";
import { BASE_URL } from "../helpers/Constant";

export const SchemaService = {
	getAllTable,
	getAllColumn,
};

function getAllTable(connectionConfig) {
	const { host, port, databaseName, databaseUsername, databasePassword } =
		connectionConfig;

	return axiosInstance(BASE_URL.TABLE).get("", {
		params: {
			host,
			port,
			databaseName,
			databaseUsername,
			databasePassword,
		},
	});
}

function getAllColumn(tableName, connectionConfig) {
	const { host, port, databaseName, databaseUsername, databasePassword } =
		connectionConfig;

	return axiosInstance(BASE_URL.COLUMN).get("", {
		params: {
			tableName,
			host,
			port,
			databaseName,
			databaseUsername,
			databasePassword,
		},
	});
}
