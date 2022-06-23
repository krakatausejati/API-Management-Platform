import { useState, useEffect } from "react";
import { APIService } from "../services/APIService";

const useApi = (idProject, idGroup, keyword, refresh) => {
	const [api, setApi] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		APIService.getAllAPI(idProject, idGroup, keyword)
			.then((response) => {
				setApi(response.data.payload);
			})
			.catch((error) => {
				console.log("Something went wrong", error);
			})
			.finally(() => {
				setLoading(false);
			});
	}, [idProject, idGroup, keyword, refresh]);

	return { api, loading };
};

export default useApi;
