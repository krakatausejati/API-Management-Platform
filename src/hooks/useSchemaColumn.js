import { useState, useEffect } from "react";
import { SchemaService } from "../services/SchemaService";

const useSchemaColumn = (selectedTable, config) => {
	const [columns, setColumns] = useState([]);

	useEffect(() => {
		if (config) {
			SchemaService.getAllColumn(selectedTable, config)
				.then((response) => {
					setColumns(response.data);
				})
				.catch((error) => {
					console.log("Something went wrong", error);
				});
		}
	}, [selectedTable, config]);

	return columns;
};

export default useSchemaColumn;
