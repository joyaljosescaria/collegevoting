import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { loadAdmin } from './actions/adminAuth';


import { Provider } from 'react-redux';
import store from './store';


import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
import StudentLayout from "layouts/Student.js";
import StudentAuthLayout from "layouts/StudentAuth.js";
import Homepage from "layouts/Homepage.js";
import Liveresult from "layouts/Liveresult.js";
import Live from "layouts/Live.js";
import Oldresult from "layouts/Oldresult.js";

import PrivateRoute from "../src/common/privateRoutes"
import PrivateRouteS from "../src/common/privateRoutesS"


export default class App extends React.Component {
  componentDidMount() {
    store.dispatch(loadAdmin());
  }

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <PrivateRoute path="/admin" component={(props) => <AdminLayout {...props} />} />
            <Route path="/auth/admin" component={(props) => <AuthLayout {...props} />} />
            <PrivateRouteS path="/student" component={(props) => <StudentLayout {...props} />} />
            <Route path="/auth/student" render={(props) => <StudentAuthLayout {...props} />} />
            <Route exact path="/" render={(props) => <Homepage {...props} />} />
            <Route  path="/lresult" render={(props) => <Liveresult {...props} />} />
            <Route  exact path="/lresults" render={(props) => <Live {...props} />} />
            <Route  path="/result" render={(props) => <Oldresult {...props} />} /> 
            {/* <Redirect from="/" to="/admin/index" /> */}
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}


ReactDOM.render(<App />, document.getElementById("root"));
