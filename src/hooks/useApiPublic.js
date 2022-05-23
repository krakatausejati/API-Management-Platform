import { useState, useEffect } from "react";
import { APIService } from "../services/APIService";

const useApiPublic = () => {
	const [apiPublic, setApiPublic] = useState([]);

	useEffect(() => {
		APIService.getAPIPublic()
			.then((response) => {
				setApiPublic(response.data);
			})
			.catch((error) => {
				console.log("Something went wrong", error);
			});
	}, []);

	return apiPublic;
};

export default useApiPublic;
