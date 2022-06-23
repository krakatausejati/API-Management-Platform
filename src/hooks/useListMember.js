import { useState, useEffect } from "react";
import { ProjectService } from "../services/ProjectService";

const useListMember = (idProject) => {
	const [listMemberData, setlistMemberData] = useState("");
	useEffect(() => {
		ProjectService.getListMemberProject(idProject)
			.then((response) => {
				setlistMemberData(response.data.payload.listMember);
			})
			.catch((error) => console.log(error));
	}, [idProject]);

	return listMemberData;
};

export default useListMember;
