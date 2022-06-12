import { useState, useEffect } from "react";
import { APIService } from "../services/APIService";

const useSummaryRequest = () => {
	const [summaryRequest, setSummaryRequest] = useState({});

	useEffect(() => {
		APIService.getSummaryRequest()
			.then((response) => {
				setSummaryRequest(response.data);
			})
			.catch((error) => {
				console.log("Something went wrong", error);
			});
	}, []);

	return summaryRequest;
};

export default useSummaryRequest;
