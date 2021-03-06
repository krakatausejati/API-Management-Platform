import { useState, useEffect } from "react";
import { APIService } from "../services/APIService";

const useAPIHistory = (idApi) => {
	const [history, setHistory] = useState([]);

	useEffect(() => {
		APIService.getAPIHistory(idApi)
			.then((response) => {
				setHistory(response.data);
			})
			.catch((error) => {
				console.log("Something went wrong", error);
			});
	}, [idApi]);

	return history;
};

export default useAPIHistory;
