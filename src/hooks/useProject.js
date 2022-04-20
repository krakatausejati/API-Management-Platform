import { useState, useEffect } from "react";
import projectService from "../services/ProjectService";

const useProject = () => {
	const [project, setProject] = useState([]);

	useEffect(() => {
		projectService
			.getAllProject()
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
