import httpClient from "../http-common";

const getAll = () => {
  return httpClient.get("/connection");
};

export default { getAll };
