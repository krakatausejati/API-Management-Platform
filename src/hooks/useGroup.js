import { useState, useEffect } from "react";
import { GroupService } from "../services/GroupService";

const useGroup = (idProject, refresh, keyword) => {
	const [group, setGroup] = useState([]);

	useEffect(() => {
		GroupService.getAllGroup(idProject, keyword)
			.then((response) => {
				setGroup(response.data.payload);
			})
			.catch((error) => {
				console.log("Something went wrong", error);
			});
	}, [refresh, keyword]);

	return group;
};

export default useGroup;
