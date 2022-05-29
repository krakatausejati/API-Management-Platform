import { useState, useEffect } from "react";
import { ProjectService } from "../services/ProjectService";

const useProject = (refresh, projectName) => {
	const [project, setProject] = useState([]);

	useEffect(() => {
		ProjectService.getAllProject(projectName)
			.then((response) => {
				setProject(response.data);
			})
			.catch((error) => {
				console.log("Something went wrong", error);
			});
	}, [refresh, projectName]);

	return project;
};

export default useProject;
