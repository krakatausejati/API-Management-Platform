import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import Login from "../pages/Login";
import DashboardLayout from "../layouts/DashboardLayout";
import Dashboard from "../pages/Dashboard";
import CreateAPI from "../pages/CreateAPI";
import DetailAPI from "../pages/DetailAPI";
import CreateProject from "../pages/CreateProject";
import Project from "../pages/Project";
import DetailProject from "../pages/DetailProject";
import Group from "../pages/Group";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from "../Keycloak"
import PrivateRoute from "../helpers/PrivateRoute";
import DetailGroup from "../pages/DetailGroup";
import Api from "../pages/API";

function Routes() {
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
          <DashboardLayout children={<PrivateRoute> <Dashboard /> </PrivateRoute>} />
        </Route>
        <Route path='/create-api' exact>
          <DashboardLayout children={<PrivateRoute><CreateAPI /></PrivateRoute>} />
        </Route>
        <Route path='/detail' exact>
          <DashboardLayout children={<PrivateRoute><DetailAPI /></PrivateRoute>} />
        </Route>
        <Route path='/project' exact>
          <DashboardLayout children={<PrivateRoute><Project /></PrivateRoute>} />
        </Route>
        <Route path='/detail-project' exact>
          <DashboardLayout children={<PrivateRoute><DetailProject /></PrivateRoute>} />
        </Route>
        <Route path='/create-project' exact>
          <DashboardLayout children={<PrivateRoute><CreateProject /></PrivateRoute>} />
        </Route>
        <Route path='/group' exact>
          <DashboardLayout children={<PrivateRoute><Group /></PrivateRoute>} />
        </Route>
        <Route path='/detail-group' exact>
          <DashboardLayout children={<PrivateRoute><DetailGroup /></PrivateRoute>} />
        </Route>
        <Route path='/api' exact>
          <DashboardLayout children={<PrivateRoute><Api /></PrivateRoute>} />
        </Route>
      </Switch>  
      </ReactKeycloakProvider>
    </Router>
  );
}

export default Routes;
