import { useState, useEffect } from "react";
import { ConnectionService } from "../services/ConnectionService";

const useConnection = (refresh, keyword) => {
	const [connection, setConnection] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		ConnectionService.getAllConnection(keyword)
			.then((response) => {
				setConnection(response.data);
			})
			.catch((error) => {
				console.log("Something went wrong", error);
			})
			.finally(() => setLoading(false));
	}, [refresh, keyword]);

	return { connection, loading };
};

export default useConnection;
