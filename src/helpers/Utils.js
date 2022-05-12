import moment from "moment";

export const handleURLName = (url) => {
	let res = url.toLowerCase();
	if (/\s/.test(res)) res = res.replace(/ /g, "-");
	return res;
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
