import axios from "axios";
import { BASE_URL } from "./helpers/Constant";
import { AuthHeader } from "./helpers/RequestHelper";

export const project = axios.create({
	baseURL: BASE_URL.PROJECT,
	headers: {
		"Content-Type": "application/json",
		"Access-Control-Allow-Origin": "*",
		// ...AuthHeader(),
	},
});
