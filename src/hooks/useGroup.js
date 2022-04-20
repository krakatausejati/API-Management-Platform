import { useState, useEffect } from "react";
import { GroupService } from "../services/GroupService";

const useGroup = () => {
	const [group, setGroup] = useState([]);

	useEffect(() => {
		GroupService.getAllGroup(1)
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
