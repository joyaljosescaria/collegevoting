import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { loadElections , loadPositions } from '../../actions/admin';
import { Link } from "react-router-dom";

import {
  Card,
  Container,
  Row,
  Table,
  DropdownMenu,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  CardHeader,
  DropdownItem
} from "reactstrap";

import HeaderSpace from "components/Headers/HeaderSpace.js";
import AddElectionModal from "components/Modals/AddElectionModal";
import DeleteElectionModal from "components/Modals/DeleteElectionModal";
import EditElectionModal from "components/Modals/EditElectionModal";
import StartElectionModal from "components/Modals/StartElectionModal";



const Election = (props) => {

  useEffect(() => {
    props.loadElections()
  }, [loadElections, props.admin.isAdminElectionAdded, props.admin.isAdminElectionDeleted, props.admin.isAdminElectionEdited , props.admin.isAdminElectionStarted])


  const getDate = (date) => {
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    var date = new Date(date);

    const fdate = date.toLocaleDateString("en-US", options);
    return fdate;
  }

  const triggerScrollCallbacks = () =>
    window.scrollBy(0, 1)
  window.scrollBy(0, -1)

  return (
    <>
      <HeaderSpace />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="bg-default shadow border-0">
              <CardHeader className="border-0 bg-transparent">
                <div className="d-flex justify-content-between">
                  <h3 className="mb-0 text-white">Elections</h3>
                  <AddElectionModal />
                </div>
              </CardHeader>
              <Table className="align-items-center table-dark table-flush" responsive>
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">Course</th>
                    <th scope="col">Date</th>
                    <th scope="col">Status</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {props.admin.getAllElection ? props.admin.getAllElection.map((election) => (
                    <tr key={election._id}>
                      <th scope="row">
                        <Media className="align-items-center">
                          <Media>
                            <span className="mb-0 text-sm">
                              {election.election}
                            </span>
                          </Media>
                        </Media>
                      </th>
                      <td>{getDate(election.date)}</td>
                      <td>{election.started ? "🟢" : "🔴"}</td>
                      <td className="text-right">
                        <UncontrolledDropdown>
                          <DropdownToggle
                            className="btn-icon-only text-light"
                            href="#pablo"
                            role="button"
                            size="sm"
                            color=""
                            onClick={triggerScrollCallbacks}
                          >
                            <i className="fas fa-ellipsis-v" />
                          </DropdownToggle>
                          <DropdownMenu className="dropdown-menu-arrow" left persist>
                            <DeleteElectionModal electionId={election._id} />
                            <EditElectionModal id={election._id} election={election.election} date={election.date} />
                            <DropdownItem>
                              <Link to={`/admin/election/${election._id}/positions`} style={{color:"black"}} >View Positions</Link>
                            </DropdownItem>
                            <DropdownItem>
                              <Link to={`/admin/election/${election._id}/candidate`} style={{color:"black"}} >View Candidates</Link>
                            </DropdownItem>
                            <StartElectionModal electionId={election._id} started={election.started}/>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </td>
                    </tr>)) : "Loading"}
                </tbody>
              </Table>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};


const mapStateToProps = (state) => ({
  admin: state.admin,
});

export default connect(mapStateToProps, { loadElections , loadPositions })(Election)