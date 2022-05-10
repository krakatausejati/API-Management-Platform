export const handleURLName = (url) => {
	let res = url.toLowerCase();
	if (/\s/.test(res)) res = res.replace(/ /g, "-");
	return res;
};
