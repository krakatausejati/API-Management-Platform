import axiosInstance from "../helpers/Axios";
import { BASE_URL } from "../helpers/Constant";

export const ProjectService = {
	getAllProject,
};

function getAllProject() {
	return axiosInstance(BASE_URL.PROJECT).get("");
}
