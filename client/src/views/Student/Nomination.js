import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom'; 

import { getElection, getPositions } from '../../actions/student';

import HeaderSpace from "components/Headers/HeaderSpace.js";
import Lost from "./Lost/Lost"

import {
  Card,
  Container,
  Row,
  Form,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input
} from 'reactstrap'
import SubmitNominationModal from "components/Modals/SubmitNominationModal";

const Nomination = (props) => {

  const [election, setElection] = useState('')
  const [position, setPosition] = useState('')

  useEffect(() => {
    props.getElection()
    props.getPositions()
  }, [])

  if (props.student.isNominationAdded) {
    return <Redirect to="/student/index" />
  }

  return (
    <>
      <HeaderSpace />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow border-0 p-4">
              { props.student.getElection?!props.student.getElection.length>0 ? <Lost />:
              <Form role="form"  className="mt-3">
                  {props.student.error?<h6 className="text-center text-danger border border-danger p-2">{props.student.error}</h6>:""}
                  <FormGroup className="mb-3 mt-3">
                    <InputGroup className="input-group-alternative text-center">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-email-83" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="select" name="select" id="exampleSelect" onChange={(e)=>setElection(e.target.value)}>
                        <option>Select Course</option>
                        {props.student.getElection?props.student.getElection.map((election) => 
                            <option value={election._id}>{election.election}</option>
                        ):""}
                      </Input>
                    </InputGroup>
                  </FormGroup>
                
                  <FormGroup className="mb-3">
                    <InputGroup className="input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-email-83" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="select" name="select" id="exampleSelect" onChange={(e)=>setPosition(e.target.value)}>
                        <option>Select Position</option>
                        {props.student.getPositions?props.student.getPositions.map((position) => 
                            <option value={position._id}>{position.position}</option>
                        ):""}
                      </Input>
                    </InputGroup>
                  </FormGroup>
                <div className="text-center">
                  <SubmitNominationModal position={position} election={election}/>
                </div>
              </Form> :""}
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
export default connect(mapStateToProps, { getElection, getPositions })(Nomination)