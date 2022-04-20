import { useState, useEffect } from "react";
import { ProjectService } from "../services/ProjectService";

const useProject = () => {
	const [project, setProject] = useState([]);

	useEffect(() => {
		ProjectService.getAllProject()
			.then((response) => {
				setProject(response.data);
			})
			.catch((error) => {
				console.log("Something went wrong", error);
			});
	}, []);

	return project;
};

export default useProject;
