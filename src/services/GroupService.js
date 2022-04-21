import axiosInstance from "../helpers/Axios";
import { BASE_URL } from "../helpers/Constant";

export const GroupService = {
	getAllGroup,
	createGroup,
};

function getAllGroup(idProject) {
	return axiosInstance(BASE_URL.PROJECT).get(`/${idProject}/groups`);
}

function createGroup(groupName, idProject) {
	let dataGroup = {
		groupName,
		createdBy: "owner",
	};

	return axiosInstance(BASE_URL.PROJECT).post(
		`/${idProject}/groups`,
		dataGroup
	);
}
