import axiosInstance from "../helpers/Axios";
import { BASE_URL } from "../helpers/Constant";
import { parseJwt } from "../helpers/Utils";

export const ProjectService = {
	getAllProject,
	createProject,
};

function getAllProject(keyword) {
	return axiosInstance(BASE_URL.PROJECT).get("", {
		params: {
			keyword,
		},
	});
}

function createProject(projectName) {
	const accessToken = localStorage.getItem("access_token");
	const { preferred_username } = parseJwt(accessToken);

	let dataProject = {
		projectName,
		projectOwner: preferred_username,
	};

	return axiosInstance(BASE_URL.PROJECT).post("", dataProject, {
		headers: {
			"Content-Type": "application/json",
			"Access-Control-Allow-Origin": "*",
		},
	});
}
