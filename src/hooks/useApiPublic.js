import { useState, useEffect } from "react";
import { APIService } from "../services/APIService";

const useApiPublic = (refresh, keyword) => {
	const [apiPublic, setApiPublic] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		APIService.getAPIPublic(keyword)
			.then((response) => {
				setApiPublic(response.data);
			})
			.catch((error) => {
				console.log("Something went wrong", error);
			})
			.finally(() => setLoading(false));
	}, [refresh, keyword]);

	return { apiPublic, loading };
};

export default useApiPublic;
