import { useState, useEffect } from "react";
import { AdminService } from "../services/AdminService";

const useListUser = () => {
	const [listUserData, setListUserData] = useState("");
	useEffect(() => {
		let users = [];
		AdminService.adminToken()
			.then((response) => {
				AdminService.getUser(response.data.access_token).then((res) => {
					let userItem = {};
					for (let index = 0; index < res.data.length; index++) {
						userItem = {
							id: res.data[index].id,	
							username: res.data[index].username,
						};
						users.push(userItem);
					}
					setListUserData(users);
				});
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	return listUserData;
};

export default useListUser;
