import { useState, useEffect } from "react";
import { GroupService } from "../services/GroupService";

const useGroup = (idProject) => {
	const [group, setGroup] = useState([]);

	useEffect(() => {
		GroupService.getAllGroup(idProject)
			.then((response) => {
				setGroup(response.data.payload);
			})
			.catch((error) => {
				console.log("Something went wrong", error);
			});
	}, [idProject]);

	return group;
};

export default useGroup;
