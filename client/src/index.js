import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
import StudentLayout from "layouts/Student.js";
import StudentAuthLayout from "layouts/StudentAuth.js";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/admin"  render={(props) => <AdminLayout {...props} />} />
      <Route path="/auth/admin" render={(props) => <AuthLayout {...props} />} />
      <Route path="/student" render={(props) => <StudentLayout {...props} />} />
      <Route path="/auth/student" render={(props) => <StudentAuthLayout {...props} />} />
      {/* <Redirect from="/" to="/admin/index" /> */}
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
