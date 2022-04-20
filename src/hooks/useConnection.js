import { useState, useEffect } from "react";
import connectionService from "../services/ConnectionService";

const useConnection = () => {
	const [connection, setConnection] = useState([]);

	useEffect(() => {
		connectionService
			.getAllConnection()
			.then((response) => {
				setConnection(response.data);
			})
			.catch((error) => {
				console.log("Something went wrong", error);
			});
	}, []);

	return connection;
};

export  default useConnection;