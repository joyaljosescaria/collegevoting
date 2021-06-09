import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { loadAdminStudents , loadAdminStudent , getSuppli} from '../../actions/admin';
import { Link } from "react-router-dom";

// reactstrap components
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";

const Unverified = (props) => {

  useEffect(() => {
    props.loadAdminStudents()
  }, [loadAdminStudents])

  const callStudent = (studentId) => {
    props.loadAdminStudent(studentId)
  }

  return (
    <>
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            {/* Card stats */}
            <Row>
              {
                !props.admin.students ? "Loading" :
                  props.admin.students.map((student) => (
                    <Col key={student._id} lg="12" xl="6" sm="6">
                      <Card className="card-stats mb-4 mb-xl-4">
                        <CardBody>
                          <Row>
                            <div className="col">
                              <CardTitle
                                tag="h5"
                                className=" text-muted mb-0"
                              >
                                {student.course_id ? student.course_id.course : "-"}
                              </CardTitle>
                              <span className="h2 font-weight-bold mb-0">
                                {student.name}
                                <span className={" ml-2 " + (student.is_verified ? "text-success" : "")}>
                                  {student.is_verified ?<i className={"fa fa-check-circle"} />:""}
                                </span>{" "}
                                <span className="text-nowrap"></span>
                         
                            </span>
                            </div>
                          <Col className="col-auto">
                            <div className="rounded-circle ">
                              <img src={`http://localhost:5000/uploads/${student.profile_pic}`} className="rounded-circle shadow-lg" style={{ width: '50px', height: '50px' }} />
                            </div>
                          </Col>
                          </Row>
                          <Link to={`/admin/students/${student._id}`}><button onClick={(e) => callStudent(student._id)} type="button" class="mt-4 btn-block btn btn-primary">View Student</button></Link>
                        </CardBody>
                      </Card>
                    </Col>))
              }
            </Row>
          </div>
        </Container>
    </div>
    </>
  );
};


const mapStateToProps = (state) => ({
  admin: state.admin,
});

export default connect(mapStateToProps, { loadAdminStudents , loadAdminStudent , getSuppli})(Unverified)