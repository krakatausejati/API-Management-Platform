import Keycloak from "keycloak-js";
import { BASE_URL } from "./Constant";

const keycloak = new Keycloak({
	url: BASE_URL.AUTH,
	realm: "api-management",
	clientId: "api-auth",
});

export default keycloak;
