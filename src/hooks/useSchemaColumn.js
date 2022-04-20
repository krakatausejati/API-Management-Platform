import { useState, useEffect } from "react";
import { SchemaService } from "../services/SchemaService";

const useSchemaColumn = () => {
	const [tables, setTables] = useState([]);

	useEffect(() => {
		SchemaService.getAllColumn()
			.then((response) => {
				setTables(response.data);
			})
			.catch((error) => {
				console.log("Something went wrong", error);
			});
	}, []);

	return tables;
};

export default useSchemaColumn;
