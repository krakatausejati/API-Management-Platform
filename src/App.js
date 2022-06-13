import "./App.less";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./helpers/PrivateRoute";
import keycloak from "./Keycloak";
import DashboardLayout from "./layouts/DashboardLayout";
import ApiPublic from "./pages/APIPublic/APIPublic";
import Login from "./pages/Auth/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import DetailAPI from "./pages/DetailAPI/DetailAPI";
import ListAPI from "./pages/ListAPI/ListAPI";
import ListGroup from "./pages/ListGroup/ListGroup";
import FormAPI from "./pages/FormAPI/FormAPI";
import Project from "./pages/Project/Project";
import Connection from "./pages/Connection/Connection";
import DocumentationAPI from "./pages/DocumentationAPI/DocumentationAPI";

function App() {
	return (
		<Router>
			<ReactKeycloakProvider authClient={keycloak}>
				<Switch>
					<Route path='/' exact>
						<Login />
					</Route>
					<Route path='/login' exact>
						<Login />
					</Route>
					<Route path='/dashboard' exact>
						<PrivateRoute>
							<DashboardLayout children={<Dashboard />} />
						</PrivateRoute>
					</Route>
					<Route path='/project' exact>
						<PrivateRoute>
							<DashboardLayout children={<Project />} />
						</PrivateRoute>
					</Route>
					<Route path='/project/:idProject/:projectName/group' exact>
						<PrivateRoute>
							<DashboardLayout children={<ListGroup />} />
						</PrivateRoute>
					</Route>
					<Route
						path='/project/:idProject/:projectName/group/:idGroup/:groupName'
						exact
					>
						<PrivateRoute>
							<DashboardLayout children={<ListAPI />} />
						</PrivateRoute>
					</Route>
					<Route
						path='/project/:idProject/:projectName/group/:idGroup/:groupName/form-api'
						exact
					>
						<PrivateRoute>
							<DashboardLayout children={<FormAPI />} />
						</PrivateRoute>
					</Route>
					<Route
						path='/project/:idProject/:projectName/group/:idGroup/api/:idApi/history'
						exact
					>
						<PrivateRoute>
							<DashboardLayout children={<DetailAPI />} />
						</PrivateRoute>
					</Route>
					<Route
						path='/api/:idApi/history'
						exact
					>
						<PrivateRoute>
							<DashboardLayout children={<DetailAPI />} />
						</PrivateRoute>
					</Route>
					<Route path='/documentation/:idApi' exact>
						<PrivateRoute>
							<DashboardLayout children={<DocumentationAPI />} />
						</PrivateRoute>
					</Route>
					<Route path='/public-api' exact>
						<PrivateRoute>
							<DashboardLayout children={<ApiPublic />} />
						</PrivateRoute>
					</Route>
					<Route path='/connection' exact>
						<PrivateRoute>
							<DashboardLayout children={<Connection />} />
						</PrivateRoute>
					</Route>
				</Switch>
			</ReactKeycloakProvider>
		</Router>
	);
}

export default App;
