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
import AddPositionModal from "components/Modals/AddPositionModal";
import EditPositionModal from "components/Modals/EditPositionModal";
import DeletePositionModal from "components/Modals/DeletePositionModal";

const Position = (props) => {

  var { electionId } = useParams();

  useEffect(() => {
    props.loadPositions(electionId)
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
                  <AddPositionModal electionId={electionId}/>
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
                      <td>{position.course_id.course}</td>
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
                            <EditPositionModal electionId={electionId} course={position.course_id._id} batch={position.batch_year_count} position={position.position} positionId={position._id}/>
                            <DeletePositionModal electionId={electionId} positionId={position._id}/>
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

export default connect(mapStateToProps, { loadPositions })(Position)