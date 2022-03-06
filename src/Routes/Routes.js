import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "../pages/Login";
import DashboardLayout from "../layouts/DashboardLayout";
import Dashboard from "../pages/Dashboard";
import CreateAPI from "../pages/CreateAPI";
import DetailAPI from "../pages/DetailAPI";
import CreateProject from "../pages/CreateProject";
import Project from "../pages/Project";
import DetailProject from "../pages/DetailProject";
import Group from "../pages/Group";
import DetailGroup from "../pages/DetailGroup";
import Api from "../pages/API";

function Routes() {
  return (
    <Router>
      <Switch>
        <Route path='/' exact>
          <Login />
        </Route>
        <Route path='/login' exact>
          <Login />
        </Route>
        <Route path='/dashboard' exact>
          <DashboardLayout children={<Dashboard />} />
        </Route>
        <Route path='/create-api' exact>
          <DashboardLayout children={<CreateAPI />} />
        </Route>
        <Route path='/detail' exact>
          <DashboardLayout children={<DetailAPI />} />
        </Route>
        <Route path='/project' exact>
          <DashboardLayout children={<Project />} />
        </Route>
        <Route path='/detail-project' exact>
          <DashboardLayout children={<DetailProject />} />
        </Route>
        <Route path='/create-project' exact>
          <DashboardLayout children={<CreateProject />} />
        </Route>
        <Route path='/group' exact>
          <DashboardLayout children={<Group />} />
        </Route>
        <Route path='/detail-group' exact>
          <DashboardLayout children={<DetailGroup />} />
        </Route>
        <Route path='/api' exact>
          <DashboardLayout children={<Api />} />
        </Route>
      </Switch>
    </Router>
  );
}

export default Routes;
