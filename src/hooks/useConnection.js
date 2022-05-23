import { useState, useEffect } from "react";
import { ConnectionService } from "../services/ConnectionService";

const useConnection = (refresh) => {
	const [connection, setConnection] = useState([]);

	useEffect(() => {
		ConnectionService.getAllConnection()
			.then((response) => {
				setConnection(response.data);
			})
			.catch((error) => {
				console.log("Something went wrong", error);
			});
	}, [refresh]);

	return connection;
};

export default useConnection;
