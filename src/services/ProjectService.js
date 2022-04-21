import axiosInstance from "../helpers/Axios";
import { BASE_URL } from "../helpers/Constant";

export const ProjectService = {
	getAllProject,
	createProject,
};

function getAllProject() {
	return axiosInstance(BASE_URL.PROJECT).get("");
}

function createProject(projectName) {
	let dataProject = {
		projectName,
		projectOwner: "Project Owner Dummy",
	};

	return axiosInstance(BASE_URL.PROJECT).post("", dataProject);
}
