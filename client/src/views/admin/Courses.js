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
import DeleteCourseModal from "components/Modals/DeleteCourseModal";
import AddCourseModal from "components/Modals/AddCourseModal";
import EditCourseModal from "components/Modals/EditCourseModal";



const Courses = (props) => {

  useEffect(() => {
    props.getAllCourse() 
  }, [getAllCourse , props.admin.isAdminCourseDeleted , props.admin.isAdminCourseAdded  ,props.admin.isAdminCourseEdited])


  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen(prevState => !prevState);

  const getDate = (date) => {
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    var date  = new Date(date);

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
                  <h3 className="mb-0 text-white">Courses</h3>
                  <AddCourseModal/>
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
                    <td>{getDate(course.created_at)}</td>
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
                          <EditCourseModal id={course._id} course={course.course}/>
                          <DeleteCourseModal courseId={course._id}/>
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