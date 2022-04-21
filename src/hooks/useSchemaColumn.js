import { useState, useEffect } from "react";
import { SchemaService } from "../services/SchemaService";

const useSchemaColumn = (selectedTable) => {
	const [tables, setTables] = useState([]);

	useEffect(() => {
		SchemaService.getAllColumn(selectedTable)
			.then((response) => {
				setTables(response.data);
			})
			.catch((error) => {
				console.log("Something went wrong", error);
			});
	}, [selectedTable]);

	return tables;
};

export default useSchemaColumn;
