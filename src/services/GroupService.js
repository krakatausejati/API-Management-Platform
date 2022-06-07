import axiosInstance from "../helpers/Axios";
import { BASE_URL } from "../helpers/Constant";
import { parseJwt } from "../helpers/Utils";

export const GroupService = {
	getAllGroup,
	createGroup,
	deleteGroup,
};

function getAllGroup(idProject, keyword) {
	return axiosInstance(BASE_URL.PROJECT).get(`/${idProject}/groups`, {
		params: {
			keyword,
		},
	});
}

function createGroup(groupName, idProject) {
	const accessToken = localStorage.getItem("access_token");
	const { preferred_username } = parseJwt(accessToken);

	let dataGroup = {
		groupName,
		createdBy: preferred_username,
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
	return axiosInstance(BASE_URL.PROJECT).delete(
		`/${idProject}/groups/${idGroup}`
	);
}
