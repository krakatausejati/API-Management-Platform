import { useState, useEffect } from "react";
import { APIService } from "../services/APIService";

const useMostUsedAPI = () => {
	const [mostUsedAPI, setMostUsedAPI] = useState([]);

	useEffect(() => {
		APIService.getMostUsedAPI()
			.then((response) => {
				setMostUsedAPI(response.data);
			})
			.catch((error) => {
				console.log("Something went wrong", error);
			});
	}, []);

	return mostUsedAPI;
};

export default useMostUsedAPI;
