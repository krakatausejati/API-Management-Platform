import { useState, useEffect } from "react";
import { SchemaService } from "../services/SchemaService";

const useSchemaTable = () => {
	const [tables, setTables] = useState([]);

	useEffect(() => {
		SchemaService.getAllTable()
			.then((response) => {
				setTables(response.data);
			})
			.catch((error) => {
				console.log("Something went wrong", error);
			});
	}, []);

	return tables;
};

export default useSchemaTable;
