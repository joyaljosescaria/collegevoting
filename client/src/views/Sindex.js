import React, { useState } from "react";
import Skeleton from '@yisheng90/react-loading';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { loadQuotes } from '../actions/student.js'

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
} from "reactstrap";


import PhotoHeader from "components/Headers/PhotoHeader.js";

const Sindex = (props) => {

  React.useEffect(() => {
    props.loadQuotes()
  }, [loadQuotes])

  return (
    <>
      <PhotoHeader />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row style={{ display: "flex", justifyContent: "center" }}>
          <Col className="order-xl-2 mb-5 mt-6 mb-xl-0" xl="8">
            <Card className="card-profile shadow text-center">
              <CardBody className="pt-0 pt-md-4">

                <div className="text-center">
                  <h1>
                    {props.student.name ? props.student.name : <Skeleton height="1rem" />}
                  </h1>
                  <h3>Welcome to your dashboard</h3>
                </div>
                <blockquote class="blockquote text-center">
                  <p class="mb-0 text-primary"><span style={{color:"#2dce89" , fontFamily:'emoji' , fontStyle:'italic',fontSize:'30px'}}>"</span>{props.students.text ? props.students.text:""}</p>
                  <footer class="blockquote-footer"><cite title="Source Title">{props.students.author?props.students.author==null?"Unknown":props.students.author:""}</cite></footer>
                </blockquote>
                <div className="d-flex justify-content-center mt-3 p-2">
                  <Link to='/student/election' className="pr-3"><button className="btn btn-primary">Election</button></Link>
                  <Link to='/student/nomination' className="pl-3"><button className="btn btn-danger">Nomination</button></Link>
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
  student: state.studentAuth,
  students: state.students
});

export default connect(mapStateToProps, { loadQuotes })(Sindex)