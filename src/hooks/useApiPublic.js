import { useState, useEffect } from "react";
import { APIService } from "../services/APIService";

const useApiPublic = (refresh) => {
	const [apiPublic, setApiPublic] = useState([]);

	useEffect(() => {
		APIService.getAPIPublic()
			.then((response) => {
				setApiPublic(response.data);
			})
			.catch((error) => {
				console.log("Something went wrong", error);
			});
	}, [refresh]);

	return apiPublic;
};

export default useApiPublic;
