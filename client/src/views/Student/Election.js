import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { loadCanidate } from '../../actions/student';

import HeaderSpace from "components/Headers/HeaderSpace.js";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  Card,
  Container,
  Row,
  Button,
  Col,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  CardTitle,
  CardText,
  CardImg

} from 'reactstrap'

import classnames from 'classnames';
import AddVoteModal from "components/Modals/AddVoteModal";

const Election = (props) => {

  const [activeTab, setActiveTab] = useState('0');

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  }

  const notify = () =>{toast("Wow so easy!")
   console.log("tost")
}

  useEffect(() => {
    props.loadCanidate()
    notify()
  }, [props.student.isStudentVoteAdded])


  return (
    <>
      <HeaderSpace />
      {/* Page content */}
      <Container className="mt--7" fluid>
      <ToastContainer />
        <Row>
          <div className="col">
            <Card className="shadow border-0 p-3 ">
              <div>
                <Nav tabs>
                  {props.student.candidate ? props.student.candidate.map((cand, index) => (<NavItem>
                    <NavLink
                      className={classnames({ active: activeTab === index.toString() })}
                      onClick={() => { toggle(index.toString()); }}
                    >
                      {props.student.candidate[index][0]?props.student.candidate[index][0].position_id.position:"pos"} 
                    </NavLink>
                  </NavItem>)) : <h1>Loading...</h1>}
                </Nav>
                <TabContent activeTab={activeTab} className="mt-4">
                  {props.student.candidate ? props.student.candidate.map((cand, index) => (
                    <TabPane tabId={index.toString()} >
                      {/* <h2 className="p-2 mb-4 bg-primary text-white text-uppercase rounded ">{props.student.candidate[index][0].election_id.election}</h2> */}
                      <Row className="d-flex justify-content-center">
                        {cand.map((can) => (
                          <Col sm="6" md="4" className="mb-3">
                            <Card body className="shadow-lg">
                              <CardImg top width="100%" style={{borderRadius:"100px"}} src={`http://localhost:5000/uploads/${can.student_id.profile_pic}`} alt="Card image cap" />
                              <CardTitle className="text-center">{can.student_id.name}</CardTitle>
                              <AddVoteModal studentId={can.student_id._id} positionId={can.position_id._id} />
                            </Card>
                          </Col>))}
                      </Row>
                    </TabPane>
                  )) : ""}
                </TabContent>
              </div>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

const mapStateToProps = (state) => ({
  student: state.students
});
export default connect(mapStateToProps, { loadCanidate })(Election)