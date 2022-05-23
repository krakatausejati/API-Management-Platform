import { useState, useEffect } from "react";
import { APIService } from "../services/APIService";

const useAllHistory = () => {
	const [allHistory, setAllHistory] = useState([]);

	useEffect(() => {
		APIService.getAllHistory()
			.then((response) => {
				setAllHistory(response.data);
			})
			.catch((error) => {
				console.log("Something went wrong", error);
			});
	}, []);

	return allHistory;
};

export default useAllHistory;
