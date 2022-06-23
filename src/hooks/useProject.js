import { useState, useEffect } from "react";
import { ProjectService } from "../services/ProjectService";

const useProject = (refresh, keyword, user) => {
	const [project, setProject] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		ProjectService.getAllProject(keyword, user)
			.then((response) => {
				setProject(response.data);
			})
			.catch((error) => {
				console.log("Something went wrong", error);
			})
			.finally(() => setLoading(false));
	}, [refresh, keyword, user]);

	return { project, loading };
};

export default useProject;
