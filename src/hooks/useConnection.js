import { useState, useEffect } from "react";
import { ConnectionService } from "../services/ConnectionService";

const useConnection = () => {
	const [connection, setConnection] = useState([]);

	useEffect(() => {
		ConnectionService.getAllConnection()
			.then((response) => {
				setConnection(response.data);
			})
			.catch((error) => {
				console.log("Something went wrong", error);
			});
	}, []);

	return connection;
};

export default useConnection;
