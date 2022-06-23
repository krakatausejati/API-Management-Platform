import moment from "moment";

export const handleURLName = (url) => {
	let res = url.toLowerCase();
	if (/\s/.test(res)) res = res.replace(/ /g, "-");
	return res;
};

export const getEndpoint = (url) => {
	let urlEndpoint = url.split("/");
	return urlEndpoint[urlEndpoint.length - 1];
};

export const handleDate = (date) => {
	let resDate = "";
	const formatedDate = new Date(date);
	const now = new Date();

	const differentDay = Math.abs(
		(formatedDate.getTime() - now.getTime()) / 1000 / 60 / 60 / 24
	);

	if (Math.round(differentDay) >= 30) {
		resDate = moment
			.utc(formatedDate)
			.local()
			.format("DD MMMM YYYY, HH:m:s a");

		return resDate;
	}

	resDate = moment(formatedDate, "DD MMMM YYYY").fromNow();

	return resDate;
};

export const parseJwt = (token) => {
	const base64Url = token.split(".")[1];
	const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
	const jsonPayload = decodeURIComponent(
		atob(base64)
			.split("")
			.map(function (c) {
				return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
			})
			.join("")
	);

	return JSON.parse(jsonPayload);
};

export const getExecutionTime = (time, type = "MIN") => {
	let res = type === "MAX" ? Math.max(...time) : Math.min(...time);
	if (!isFinite(res)) res = 0;
	return res;
};

export const defineRole = () => {
	const { resource_access } = parseJwt(localStorage.getItem("access_token"));
	return resource_access["api-auth"].roles;
};

export const getUsername = () => {
	const { preferred_username } = parseJwt(
		localStorage.getItem("access_token")
	);
	return preferred_username;
};

export const getUserId = () => {
	const { sub } = parseJwt(localStorage.getItem("access_token"));
	return sub;
};

export const showErrorMessage = (modal, errorMessage) => {
	modal.error({
		title: "Error",
		content: `${errorMessage}`,
		okText: "Ok",
		okType: "secondary",
		cancelText: "No",

		onOk() {},
	});
};

export const showSuccessMessage = (modal, successMessage) => {
	modal.success({
		title: "Success",
		content: `${successMessage}`,
		okText: "Ok",
		okType: "secondary",
		cancelText: "No",

		onOk() {},
	});
};
