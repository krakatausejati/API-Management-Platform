import { project } from "../http-common";

//connection
const getAllConnection = () => {
  return project.get("/connection");
};

//group
const getAllGroup = () => {
  return project.get("/group");
};

const createGroup = (groupName) => {
  let today = new Date();
  let date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  let time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  const dateTime = date + " " + time;

  let dataGroup = {
    groupName,
    createdBy: "owner",
    createdAt: dateTime,
  };

  // let reqBody = JSON.stringify(dataGroup);
  // console.log(reqBody);
  return project.post("/group", { data: dataGroup });
};

//project
const getAllProject = () => {
  return project.get("");
};

export default { getAllConnection, getAllGroup, createGroup, getAllProject };
