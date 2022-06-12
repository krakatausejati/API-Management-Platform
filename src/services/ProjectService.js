import axiosInstance from "../helpers/Axios";
import { BASE_URL } from "../helpers/Constant";
import { parseJwt, defineRole } from "../helpers/Utils";

export const ProjectService = {
	getAllProject,
	createProject,
	deleteProject,
};

function getAllProject(keyword) {
	return axiosInstance(BASE_URL.PROJECT).get("", {
		params: {
			keyword,
		},
	});
}

function createProject({ projectName, description }) {
	const accessToken = localStorage.getItem("access_token");
	const { preferred_username } = parseJwt(accessToken);
	const [role] = defineRole();

	let dataProject = {
		projectName,
		projectOwner: preferred_username,
		description,
		role,
	};

	return axiosInstance(BASE_URL.PROJECT).post("", dataProject, {
		headers: {
			"Content-Type": "application/json",
			"Access-Control-Allow-Origin": "*",
		},
	});
}

function deleteProject(idProject) {
	const [role] = defineRole();

	return axiosInstance(BASE_URL.PROJECT).delete(`/${idProject}`, {
		headers: {
			"Content-Type": "application/json",
			"Access-Control-Allow-Origin": "*",
		},
		data: {
			role,
		},
	});
}
