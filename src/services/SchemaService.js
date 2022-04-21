import axiosInstance from "../helpers/Axios";
import { BASE_URL } from "../helpers/Constant";

export const SchemaService = {
	getAllTable,
	getAllColumn,
};

function getAllTable() {
	return axiosInstance(BASE_URL.TABLE).get("");
}

function getAllColumn(tableName) {
	return axiosInstance(BASE_URL.COLUMN).get("", {
		params: {
			tableName,
		},
	});
}
