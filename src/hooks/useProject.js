import { useState, useEffect } from "react";
import { ProjectService } from "../services/ProjectService";

const useProject = (refresh, keyword) => {
	const [project, setProject] = useState([]);

	useEffect(() => {
		ProjectService.getAllProject(keyword)
			.then((response) => {
				setProject(response.data);
			})
			.catch((error) => {
				console.log("Something went wrong", error);
			});
	}, [refresh, keyword]);

	return project;
};

export default useProject;
