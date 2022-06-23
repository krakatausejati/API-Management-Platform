import { useState, useEffect } from "react";
import { GroupService } from "../services/GroupService";

const useGroup = (idProject, refresh, keyword) => {
	const [group, setGroup] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		GroupService.getAllGroup(idProject, keyword)
			.then((response) => {
				setGroup(response.data.payload);
			})
			.catch((error) => {
				console.log("Something went wrong", error);
			})
			.finally(() => setLoading(false));
	}, [idProject, refresh, keyword]);

	return { loading, group };
};

export default useGroup;
