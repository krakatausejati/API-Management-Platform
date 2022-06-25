import { useState, useEffect } from "react";
import { ProjectService } from "../services/ProjectService";

const useProject = (refresh, keyword) => {
	const [project, setProject] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		ProjectService.getAllProject(keyword)
			.then((response) => {
				setProject(response.data);
			})
			.catch((error) => {
				console.log("Something went wrong", error);
			})
			.finally(() => setLoading(false));
	}, [refresh, keyword]);

	return { project, loading };
};

export default useProject;
