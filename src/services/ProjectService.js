import axiosInstance from "../helpers/Axios";
import { BASE_URL } from "../helpers/Constant";
import { defineRole, getUsername } from "../helpers/Utils";

export const ProjectService = {
	getAllProject,
	createProject,
	deleteProject,
	getListMemberProject,
};

function getAllProject(keyword) {
	const user = getUsername();
	return axiosInstance(BASE_URL.PROJECT).get("", {
		params: {
			keyword,
			user,
		},
	});
}
function getListMemberProject(idProject) {
	return axiosInstance(BASE_URL.PROJECT).get(`/${idProject}/members`, {});
}

function createProject({ projectName, description, listMember }) {
	const projectOwner = getUsername();
	const [role] = defineRole();

	let dataProject = {
		projectName,
		projectOwner,
		listMember,
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
