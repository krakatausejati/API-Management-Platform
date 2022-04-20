import axiosInstance from "../helpers/Axios";
import { BASE_URL } from "../helpers/Constant";

export const SchemaService = {
	getAllColumn,
	getAllTable,
};

function getAllColumn() {
	return axiosInstance(BASE_URL.COLUMN).get("");
}

function getAllTable() {
	return axiosInstance(BASE_URL.TABLE).get("");
}
