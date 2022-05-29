import { useState, useEffect } from "react";
import { APIService } from "../services/APIService";

const useApi = (idProject, idGroup) => {
	const [api, setApi] = useState([]);

	useEffect(() => {
		APIService.getAllAPI(idProject, idGroup)
			.then((response) => {
				setApi(response.data.payload);
			})
			.catch((error) => {
				console.log("Something went wrong", error);
			});
	}, [idProject, idGroup]);

	return api;
};

export default useApi;
