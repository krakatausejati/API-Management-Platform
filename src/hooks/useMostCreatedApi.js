import { useState, useEffect } from "react";
import { APIService } from "../services/APIService";

const useMostCreatedApi = () => {
	const [mostCreatedAPI, setMostCreatedAPI] = useState([]);

	useEffect(() => {
		APIService.getMostCreatedAPI()
			.then((response) => {
				setMostCreatedAPI(response.data);
			})
			.catch((error) => {
				console.log("Something went wrong", error);
			});
	}, []);

	return mostCreatedAPI;
};

export default useMostCreatedApi;
