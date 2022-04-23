import axiosInstance from "../helpers/Axios";
import { BASE_URL } from "../helpers/Constant";

export const APIService = {
	getAllHistory,
};

function getAllHistory() {
	return axiosInstance(BASE_URL.HISTORY).get("");
}