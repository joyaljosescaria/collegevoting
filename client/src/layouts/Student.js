import React from "react";
import { useLocation, Route, Switch, Redirect } from "react-router-dom";
// reactstrap components
import { Container } from "reactstrap";
// core components
import StudentNavbar from "components/Navbars/StudentNavbar.js";
import AdminFooter from "components/Footers/AdminFooter.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import { connect } from 'react-redux';

import { loadStudent } from '../actions/studentAuth';
import { getElection } from '../actions/student';

import Loginnew from "views/admin/Login.js"

import sroutes from "sroutes.js";

const Student = (props) => {

    console.log(sroutes)


    const mainContent = React.useRef(null);
    const location = useLocation();

    React.useEffect(() => {
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
        mainContent.current.scrollTop = 0;
        props.loadStudent();
        // props.getElection();
    }, [location]);

    const getroutes = (sroutes) => {
        return sroutes.map((prop, key) => {
            if (prop.layout === "/student") {
                return (
                    <Route
                        path={prop.layout + prop.path}
                        component={prop.component}
                        key={key}
                    />
                );
            } else {
                return null;
            }
        });
    };

    if (!props.studentAuth.isAuthenticated) {
        console.log("No token")
        return <Redirect to="/auth/student/loginpre" />
    }

    const getBrandText = (path) => {
        for (let i = 0; i < sroutes.length; i++) {
            if (
                props.location.pathname.indexOf(sroutes[i].layout + sroutes[i].path) !==
                -1
            ) {
                console.log(sroutes[i].name)
                return sroutes[i].name;
            }
        }
        return "Brand";
    };

    return (
        <>
            <Sidebar
                {...props}
                routes={sroutes}
                logo={{
                    innerLink: "/student/index",
                    imgSrc: require("../assets/img/brand/argon-react.png").default,
                    imgAlt: "...",
                }}
            />
            <div className="main-content" ref={mainContent}>
                <StudentNavbar
                    {...props}
                    brandText={getBrandText(props.location.pathname)}
                />
                <Switch>
                    console.log({getroutes(sroutes)})
                    {getroutes(sroutes)}
                    {/* <Redirect from="*" to="/admin/index" /> */}
                    <Route path="/login/new" render={(props) => <Loginnew {...props} />} />
                </Switch>
                <Container fluid>
                    {/* <AdminFooter /> */}
                </Container>
            </div>
        </>
    );
};

const mapStateToProps = (state) => ({
    studentAuth: state.studentAuth,
    student: state.student
});

export default connect(mapStateToProps, { loadStudent, getElection })(Student)