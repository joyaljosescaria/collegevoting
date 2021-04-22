import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { getAllCourse } from '../../actions/admin';

import {
  Card,
  Container,
  Row,
  Table,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  CardHeader
} from "reactstrap";

import HeaderSpace from "components/Headers/HeaderSpace.js";



const Courses = (props) => {

  useEffect(() => {
    props.getAllCourse() 
  }, [getAllCourse])


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
                  <h3 className="mb-0 text-white">Courses</h3>
                  <div className="btn btn-sm btn-primary">Add Course</div>
                </div>
              </CardHeader>
              <Table className="align-items-center table-dark table-flush" responsive>
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">Course</th>
                    <th scope="col">Created at</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {props.admin.getAllCourse ? props.admin.getAllCourse.map((course) =>(
                  <tr key={course._id}>
                    <th scope="row">
                      <Media className="align-items-center">
                        <Media>
                          <span className="mb-0 text-sm">
                            {course.course}
                          </span>
                        </Media>
                      </Media>
                    </th>
                    <td>{course.created_at}</td>
                    <td className="text-right">
                      <UncontrolledDropdown>
                        <DropdownToggle
                          className="btn-icon-only text-light"
                          href="#pablo"
                          role="button"
                          size="sm"
                          color=""
                          onClick={(e) => e.preventDefault()}
                        >
                          <i className="fas fa-ellipsis-v" />
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-arrow" right>
                          <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            Edit 
                          </DropdownItem>
                          <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            Delete
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </td>
                  </tr>)):"Loading"}
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

export default connect(mapStateToProps, { getAllCourse })(Courses)