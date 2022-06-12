import { useState, useEffect } from "react";
import { APIService } from "../services/APIService";

const useApi = (idProject, idGroup, keyword, refresh) => {
	const [api, setApi] = useState([]);

	useEffect(() => {
		APIService.getAllAPI(idProject, idGroup, keyword)
			.then((response) => {
				setApi(response.data.payload);
			})
			.catch((error) => {
				console.log("Something went wrong", error);
			});
	}, [idProject, idGroup, keyword, refresh]);

	return api;
};

export default useApi;
