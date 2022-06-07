import { useState, useEffect } from "react";
import { APIService } from "../services/APIService";

const useAPIDetail = (idApi) => {
	const [apiDetail, setApiDetail] = useState([]);

	useEffect(() => {
		APIService.getAPIDetail(idApi)
			.then((response) => {
				setApiDetail(response.data.payload);
			})
			.catch((error) => {
				console.log("Something went wrong", error);
			});
	}, [idApi]);

	return apiDetail;
};

export default useAPIDetail;
