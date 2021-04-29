import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import Skeleton from '@yisheng90/react-loading';
import { Redirect } from "react-router-dom";

// import { loadAdminStudents , loadAdminStudent } from '../../actions/admin';
// import { Link } from "react-router-dom";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
} from "reactstrap";

// core components
import UserHeader from "components/Headers/UserHeader.js";
import ResponsivePlayer from "components/Video/VideoPlayer.js"
import VerifyModal from "components/Modals/VerifyModal";
import DeleteStudentModal from "components/Modals/DeleteStudentModal";


const Student = (props) => {

  if (props.admin.isAdminStudentUnVerified || props.admin.isAdminStudentVerified || props.admin.isAdminStudentDeleted) {
    return <Redirect to="/admin/students" />
  }

  return (
    <>
      <UserHeader name={props.admin.student.name ? props.admin.student.name : <Skeleton width="10rem" height="2rem" />} />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row style={{ display: "flex", justifyContent: "center" }}>
          <Col className="order-xl-2 mb-5 mb-xl-0" xl="8">
            <Card className="card-profile shadow text-center">
              <Row className="justify-content-center">
                <Col className="order-lg-2" lg="3">
                  <div className="card-profile-image">
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      <img
                        alt="..."
                        className="rounded-circle"
                        src={props.admin.student ? props.admin.student.profile_pic : ""}
                        style={{ width: '180px', height: '180px' }}
                      />
                    </a>
                  </div>
                </Col>
              </Row>
              <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                <div className="d-flex justify-content-between">
                  <VerifyModal course_id={props.admin.course_id} batch_year_count={props.admin.batch_year_count} />
                  <DeleteStudentModal studentId={props.admin.student._id}/>
                </div>
              </CardHeader>
              <CardBody className="pt-0 pt-md-4">
                <Row>
                  <div className="col">
                    <div className="card-profile-stats d-flex justify-content-center mt-md-5">

                    </div>
                  </div>
                </Row>
                <div className="text-center">
                  <h3>
                    {props.admin.student.name ? props.admin.student.name : <Skeleton height="1rem" />}
                  </h3>
                  <div className="h5 font-weight-300">
                    <i className="ni location_pin mr-2" />
                    {props.admin.student.unique_id ? props.admin.student.unique_id : <Skeleton height="1rem" />}
                  </div>
                  <div className="h5 mt-4">
                    <i className="ni business_briefcase-24 mr-2" />
                    {props.admin.student.email ? props.admin.student.email : <Skeleton height="1rem" />}
                  </div>
                  <div>
                    <i className="ni education_hat mr-2" />
                    {props.admin.student.course_id ? `${props.admin.student.course_id.course} - Year ${props.admin.student.batch_year_count}` : <Skeleton height="1rem" />}
                  </div>
                  <hr className="my-4" />
                  <img src={props.admin.student ? props.admin.student.id_card : ""} className="shadow-lg" style={{ maxWidth: '100%', height: 'auto', marginBottom: '2rem' }} />
                  <ResponsivePlayer url="https://www.youtube.com/watch?v=UuZvh8nOomw" style={{ marginTop: '20rem' }} />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

const mapStateToProps = (state) => ({
  admin: state.admin,
});

export default connect(mapStateToProps, {})(Student)