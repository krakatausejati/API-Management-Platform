import { useState, useEffect } from "react";
import { APIService } from "../services/APIService";

const useLastWeekUsage = () => {
	const [lastWeekUsage, setLastWeekUsage] = useState([]);

	useEffect(() => {
		APIService.getLastWeekUsage()
			.then((response) => {
				setLastWeekUsage(response.data);
			})
			.catch((error) => {
				console.log("Something went wrong", error);
			});
	}, []);

	return lastWeekUsage;
};

export default useLastWeekUsage;
