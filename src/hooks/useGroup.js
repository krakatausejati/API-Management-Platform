import { useState, useEffect } from "react";
import groupService from "../services/GroupService";

const useGroup = () => {
	const [group, setGroup] = useState([]);

	useEffect(() => {
		groupService
			.getAllGroup()
			.then((response) => {
				setGroup(response.data);
			})
			.catch((error) => {
				console.log("Something went wrong", error);
			});
	}, []);

	return group;
};

export default useGroup;
