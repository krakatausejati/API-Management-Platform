import axiosInstance from "../helpers/Axios";
import { BASE_URL } from "../helpers/Constant";
import { defineRole, parseJwt, getUsername } from "../helpers/Utils";

export const GroupService = {
	getAllGroup,
	createGroup,
	deleteGroup,
};

function getAllGroup(idProject, keyword) {
	const user = getUsername();
	return axiosInstance(BASE_URL.PROJECT).get(`/${idProject}/groups`, {
		params: {
			user,
			keyword,
		},
	});
}

function createGroup({ groupName, description }, idProject) {
	const accessToken = localStorage.getItem("access_token");
	const { preferred_username } = parseJwt(accessToken);
	const [role] = defineRole();

	let dataGroup = {
		groupName,
		createdBy: preferred_username,
		description,
		role,
	};

	return axiosInstance(BASE_URL.PROJECT).post(
		`/${idProject}/groups`,
		dataGroup,
		{
			headers: {
				"Content-Type": "application/json",
			},
		}
	);
}

function deleteGroup(idProject, idGroup) {
	const [role] = defineRole();

	return axiosInstance(BASE_URL.PROJECT).delete(
		`/${idProject}/groups/${idGroup}`,
		{
			headers: {
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": "*",
			},
			data: {
				role,
			},
		}
	);
}
