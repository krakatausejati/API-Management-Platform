import { useState, useEffect } from "react";
import { APIService } from "../services/APIService";

const useApi = () => {
	const [api, setApi] = useState([]);

	useEffect(() => {
		APIService.getAllAPI()
			.then((response) => {
				setApi(response.data);
			})
			.catch((error) => {
				console.log("Something went wrong", error);
			});
	}, []);

	return api;
};

export default useApi;
