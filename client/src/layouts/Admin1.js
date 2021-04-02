import React , {useEffect , useState } from "react";
import { useLocation, Route, Switch, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { loadAdmin } from '../actions/adminAuth';

import PrivateRoute from '../common/privateRoutes'

// reactstrap components
import { Container } from "reactstrap";

// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import AdminFooter from "components/Footers/AdminFooter.js";
import Sidebar from "components/Sidebar/Sidebar.js";

import Loginnew from "views/admin/Login.js"
import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Maps from "views/examples/Maps.js";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import Tables from "views/examples/Tables.js";
import Icons from "views/examples/Icons.js";

import routes from "routes.js";

const Admin1 = (props) => {
  const mainContent = React.useRef(null);
  const location = useLocation();

  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
    props.loadAdmin();
  }, [location]);

 

  const getBrandText = (path) => {
    for (let i = 0; i < routes.length; i++) {
      if (
        props.location.pathname.indexOf(routes[i].layout + routes[i].path) !==
        -1
      ) {
        return routes[i].name;
      }
    }
    return "Brand";
  };

  if (!props.adminAuth.isAuthenticated) {
    console.log("No token")
    return <Redirect to="/auth/admin/login" />
  }

  return (
    <>
      <Sidebar
        {...props}
        routes={routes}
        logo={{
          innerLink: "/admin/index",
          imgSrc: require("../assets/img/brand/argon-react.png").default,
          imgAlt: "...",
        }}
      />
      <div className="main-content" ref={mainContent}>
        <AdminNavbar
          {...props}
          brandText={getBrandText(props.location.pathname)}
        />
        <Switch>
          {/* {getRoutes(routes)} */}
          {/* <Redirect from="*" to="/admin/index" /> */}
          <Route path="/login/new" render={(props) => <Loginnew {...props} />} />
          <PrivateRoute path="/admin/index" component={(props) => <Index {...props} />} />
          <PrivateRoute path="/admin/icons" component={(props) => <Icons {...props} />} />
        </Switch>
        <Container fluid>
          <AdminFooter />
        </Container>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  adminAuth: state.adminAuth,
});

export default connect(mapStateToProps, { loadAdmin })(Admin1)