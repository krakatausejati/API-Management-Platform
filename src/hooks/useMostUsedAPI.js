import { useState, useEffect } from "react";
import { APIService } from "../services/APIService";

const useMostUsedAPI = () => {
	const [mostUsedAPI, setMostUsedAPI] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		APIService.getMostUsedAPI()
			.then((response) => {
				setMostUsedAPI(response.data);
			})
			.catch((error) => {
				console.log("Something went wrong", error);
			})
			.finally(() => setLoading(false));
	}, []);

	return { mostUsedAPI, loading };
};

export default useMostUsedAPI;
