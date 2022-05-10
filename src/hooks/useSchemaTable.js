import { useState, useEffect } from "react";
import { SchemaService } from "../services/SchemaService";

const useSchemaTable = (connectionConfig) => {
	const [tables, setTables] = useState([]);

	useEffect(() => {
		if (connectionConfig) {
			SchemaService.getAllTable(connectionConfig)
				.then((response) => {
					setTables(response.data);
				})
				.catch((error) => {
					console.log("Something went wrong", error);
				});
		}
	}, [connectionConfig]);

	return tables;
};

export default useSchemaTable;
