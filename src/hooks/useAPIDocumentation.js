import { useState, useEffect } from "react";
import { APIService } from "../services/APIService";

const useAPIDocumentation = (idApi) => {
    const [apiDocumentation, setApiDocumentation] = useState([]);

    useEffect(() => {
		APIService.getAPIDocumentation(idApi)
			.then((response) => {
				setApiDocumentation(response.data);
			})
			.catch((error) => {
				console.log("Something went wrong", error);
			});
	}, [idApi]);

	return apiDocumentation;
};

export default useAPIDocumentation;