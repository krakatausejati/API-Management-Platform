import { useState, useEffect } from "react";
import { ConnectionService } from "../services/ConnectionService";

const useConnection = (refresh, keyword) => {
	const [connection, setConnection] = useState([]);

	useEffect(() => {
		ConnectionService.getAllConnection(keyword)
			.then((response) => {
				setConnection(response.data);
			})
			.catch((error) => {
				console.log("Something went wrong", error);
			});
	}, [refresh, keyword]);

	return connection;
};

export default useConnection;
