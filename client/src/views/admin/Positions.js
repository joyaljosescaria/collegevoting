import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { loadPositions } from '../../actions/admin';
import { Link , useParams } from "react-router-dom";

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



const Election = (props) => {

  let { id } = useParams();

  useEffect(() => {
    props.loadPositions(id)
  }, [loadPositions , props.admin.isAdminPositionAdded, props.admin.isAdminPositionDeleted, props.admin.isAdminPositionEdited])


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
                  <h3 className="mb-0 text-white">Positions</h3>
                  <AddElectionModal />
                </div>
              </CardHeader>
              <Table className="align-items-center table-dark table-flush" responsive>
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">Position</th>
                    <th scope="col">Course</th>
                    <th scope="col">Year</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {props.admin.positions ? props.admin.positions.map((position) => (
                    <tr key={position._id}>
                      <th scope="row">
                        <Media className="align-items-center">
                          <Media>
                            <span className="mb-0 text-sm">
                              {position.position}
                            </span>
                          </Media>
                        </Media>
                      </th>
                      <td>{getDate(position.course_id.course)}</td>
                      <td>{position.batch_year_count}</td>
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
                            {/* <DeleteElectionModal electionId={election._id} />
                            <EditElectionModal id={election._id} election={election.election} date={election.date} />
                            <DropdownItem>
                              <Link to={`/admin/election/${election._id}/positions`} style={{color:"black"}}>View Positions</Link>
                            </DropdownItem> */}
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

export default connect(mapStateToProps, { loadPositions })(Election)