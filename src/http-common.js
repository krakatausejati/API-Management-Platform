import axios from "axios";

export const project = axios.create({
  baseURL: "http://localhost:8080/project",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});
