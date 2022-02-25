import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "../pages/Login";
import DashboardLayout from "../layouts/DashboardLayout";
import Dashboard from "../pages/Dashboard";
import CreateAPI from "../pages/CreateAPI";
import Project from "../pages/Project";

function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/login" exact>
          <Login />
        </Route>
        <Route path="/dashboard" exact>
          <DashboardLayout children={<Dashboard />} />
        </Route>
        <Route path="/create-api" exact>
          <DashboardLayout children={<CreateAPI />} />
        </Route>
        <Route path="/project" exact>
          <DashboardLayout children={<Project />} />
        </Route>
      </Switch>
    </Router>
  );
}

export default Routes;
