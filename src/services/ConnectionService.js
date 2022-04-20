import axiosInstance from "../helpers/Axios";
import { BASE_URL } from "../helpers/Constant";

export const ConnectionService = {
	getAllConnection,
};

function getAllConnection() {
	return axiosInstance(BASE_URL.CONNECTION).get("");
}
