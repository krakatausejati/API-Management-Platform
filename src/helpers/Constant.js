export const BASE_URL = {
	PROJECT: "http://localhost:8080/api/projects",
	CONNECTION: "http://localhost:8080/api/connections",
	COLUMN: "http://localhost:8080/api/schema/columns",
	TABLE: "http://localhost:8080/api/schema/tables",
	VIEWS: "http://localhost:8080/api/schema/views",
	API: "http://localhost:8080/api/apis",
	API_DOC: "http://localhost:8080/api/preview",
	AUTH: "http://localhost:8180/auth",
	KEYCLOAK_AUTH:
		"http://localhost:8180/auth/realms/api-management/protocol/openid-connect/token",
	KEYCLOAK_USER:
		"http://localhost:8180/auth/admin/realms/api-management/users",
};


export const Roles = {
	PROJECT_OWNER: "project_owner",
	DEVELOPER: "developer",
	CLIENT: "client",
}