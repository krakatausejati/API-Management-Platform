import axiosInstance from "../helpers/Axios";
import { BASE_URL } from "../helpers/Constant";

export const APIService = {
	getAllHistory,
	getAPIHistory,
	getAllAPI,
	getAPIPublic,
	getMostUsedAPI,
	getLastWeekUsage,
	createAPI,
	updateAPI,
	deleteAPI,
	getAPIDetail,
	getAPIDocumentation,
	getAPICount,
	getSummaryRequest,
	getMostCreatedAPI,
};

function getAllHistory() {
	return axiosInstance(`http://localhost:8080/api/history`).get("");
}

function getSummaryRequest() {
	return axiosInstance(`http://localhost:8080/api/sum-history`).get("");
}

function getAPIHistory(idApi) {
	return axiosInstance(`http://localhost:8080/api/${idApi}/history`).get("");
}

function createAPI(values) {
	const {
		generatedEndpoint,
		table,
		column,
		description,
		limit,
		is_private,
		connection,
		listUser,
		idGroup,
		apiOwner,
	} = values;

	const columns = column.join();

	let dataAPI = {
		apiEndpoint: generatedEndpoint,
		dbTable: table.tableName,
		selectedColumn: columns,
		description,
		apiLimit: limit,
		private: is_private,
		idConnection: connection,
		listUser: listUser,
		idGroup,
		apiOwner,
	};

	return axiosInstance(BASE_URL.API).post("", dataAPI, {
		headers: {
			"Content-Type": "application/json",
			"Access-Control-Allow-Origin": "*",
		},
	});
}

function updateAPI(values) {
	const {
		idApi,
		generatedEndpoint,
		table,
		column,
		description,
		limit,
		is_private,
		connection,
		listUser,
		idGroup,
		apiOwner,
	} = values;

	const columns = column.join();

	let dataAPI = {
		idApi,
		apiEndpoint: generatedEndpoint,
		dbTable: table.tableName ? table.tableName : table,
		selectedColumn: columns,
		description,
		apiLimit: limit,
		private: is_private,
		idConnection: connection,
		listUser: listUser,
		idGroup,
		apiOwner,
	};

	return axiosInstance(BASE_URL.API).put(`/${idApi}`, dataAPI, {
		headers: {
			"Content-Type": "application/json",
			"Access-Control-Allow-Origin": "*",
		},
	});
}

function deleteAPI(idApi) {
	return axiosInstance(BASE_URL.API).delete(`/${idApi}`);
}

function getAllAPI(idProject, idGroup, keyword) {
	return axiosInstance(BASE_URL.PROJECT).get(
		`/${idProject}/groups/${idGroup}/apis`,
		{
			params: {
				keyword,
			},
		}
	);
}

function getAPIPublic(keyword) {
	return axiosInstance(BASE_URL.API).get("/public", {
		params: {
			keyword,
		},
	});
}

function getAPIDetail(idApi) {
	return axiosInstance(BASE_URL.API).get(`/${idApi}`);
}

function getAPIDocumentation(idApi) {
	return axiosInstance(BASE_URL.API_DOC).get(`/${idApi}`);
}

function getMostCreatedAPI() {
	return axiosInstance(BASE_URL.MOST_CREATED_API).get();
}

function getAPICount(idProject, idGroup) {
	return axiosInstance(BASE_URL.PROJECT).get(
		`/${idProject}/groups/${idGroup}/apis/count`
	);
}

function getMostUsedAPI() {
	return axiosInstance(BASE_URL.MOST_USED_API).get();
}

function getLastWeekUsage() {
	return axiosInstance(BASE_URL.LAST_WEEK_USAGE).get();
}
