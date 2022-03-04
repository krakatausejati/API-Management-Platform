import Keycloak from "keycloak-js";
const keycloak = new Keycloak({
 url: "http://localhost:8080/auth",
 realm: "api-management",
 clientId: "api-auth",
});

export default keycloak;