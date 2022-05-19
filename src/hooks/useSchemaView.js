import { useState, useEffect } from "react";
import { SchemaService } from "../services/SchemaService";

const useSchemaView = (connectionConfig) => {
	const [views, setViews] = useState([]);

	useEffect(() => {
		if (connectionConfig) {
			SchemaService.getAllViews(connectionConfig)
				.then((response) => {
					setViews(response.data);
				})
				.catch((error) => {
					console.log("Something went wrong", error);
				});
		}
	}, [connectionConfig]);

	return views;
};

export default useSchemaView;
