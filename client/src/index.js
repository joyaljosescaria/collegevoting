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

import PrivateRoute from "../src/common/privateRoutes"


export default class App extends React.Component {
  componentDidMount() {
    store.dispatch(loadAdmin());
  }

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route path="/admin" component={(props) => <AdminLayout {...props} />} />
            <Route path="/auth/admin" component={(props) => <AuthLayout {...props} />} />
            <Route path="/student" render={(props) => <StudentLayout {...props} />} />
            <Route path="/auth/student" render={(props) => <StudentAuthLayout {...props} />} />
            {/* <Redirect from="/" to="/admin/index" /> */}
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}


ReactDOM.render(<App />, document.getElementById("root"));
