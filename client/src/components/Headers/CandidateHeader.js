import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { loadCandidates , loadCandidate } from '../../actions/admin';
import { Link } from "react-router-dom";

// reactstrap components
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";
import ViewCandidateModal from "components/Modals/ViewCandidateModal";

const CandidateHearder = (props) => {

  useEffect(() => {
    props.loadCandidates(props.electionId)
  }, [loadCandidates , props.admin.isAdminCandidateUnVerified , props.admin.isAdminCandidateVerified])

  return (
    <>
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            {/* Card stats */}
            <Row>
              {
                !props.admin.findCandidates ? "Loading" :
                  props.admin.findCandidates.map((candidate) => (
                    <Col key={candidate._id} lg="12" xl="6" sm="6">
                      <Card className="card-stats mb-4 mb-xl-4">
                        <CardBody>
                          <Row>
                            <div className="col">
                              <CardTitle
                                tag="h5"
                                className=" text-muted mb-0"
                              >
                                {candidate.position_id ? candidate.position_id.position : "-"}
                              </CardTitle>
                              <span className="h2 font-weight-bold mb-0">
                                {candidate.student_id ? candidate.student_id.name : "-"}
                                <span className={" ml-2 " + (candidate.is_verified ? "text-success" : "")}>
                                  {candidate.is_verified ?<i className={"fa fa-check-circle"} />:""}
                                </span>{" "}
                                <span className="text-nowrap"></span>
                         
                            </span>
                            </div>
                          <Col className="col-auto">
                            <div className="rounded-circle ">
                              <img src={candidate.student_id.profile_pic} className="rounded-circle shadow-lg" style={{ width: '50px', height: '50px' }} />
                            </div>
                          </Col>
                          </Row>
                          <ViewCandidateModal candidateId={candidate._id}/>
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

export default connect(mapStateToProps, { loadCandidate , loadCandidates})(CandidateHearder)