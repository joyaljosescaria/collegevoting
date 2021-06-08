import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from "react-router-dom";
import { getLive } from '../actions/publics';

import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    Badge,
    Card,
    CardHeader,
    CardFooter,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    Media,
    Pagination,
    PaginationItem,
    PaginationLink,
    Progress,
    Table,
    Container,
    Row,
    UncontrolledTooltip,
} from 'reactstrap';

import './css/Homepage.css'

function Liveresult(props) {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    const [data , setData] = useState([])
    
    useEffect(() => {
        function mainf() {
            props.getLive()
            if (props.publics.candidate) {
                data.length = 0
                for (let i = 0; i < props.publics.candidate.length; i++) {
                    props.publics.candidate[i].map((pos, index) => {
                        var obj = {};
                        obj["label"] = pos.student_id.name;
                        obj["value"] = pos.votes;
                        obj["election"] = pos.election_id.election;
                        obj["positionid"] = pos.position_id._id;
                        obj["position"] = pos.position_id.position;
                        data.push(obj);
                    })
                }
            }
        }

        mainf()
        const interval = setInterval(() => mainf(), 60000)
        return () => {
          clearInterval(interval);
        }
    }, [props.publics.candidate])

    console.log(data)

    return (

        <div className="">
            <Navbar className="shadow-lg" color="dark" dark expand="md">
                <Link to='/'>
                    <img
                        alt="..."
                        src={
                            require("../assets/img/brand/argon-react.png")
                                .default
                        }
                        style={{ width: '140px', height: '37px' }}
                    />
                </Link>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <Link to="/auth/admin/login"><button className="btn btn-primary shadow-lg">Admin Login</button></Link>
                        </NavItem>
                        <NavItem>
                            <Link to="/auth/student/loginpre"><button className="btn btn-warning  shadow-lg ml-3">Student Login</button></Link>
                        </NavItem>

                    </Nav>
                </Collapse>
            </Navbar>
            <div className="">
                <Container className="" fluid>
                    {/* Table */}
                    <Row>
                        <div className="col">
                            <Card className="shadow">
                                <CardHeader className="border-0">
                                    <h3 className="mb-0">Election Result &nbsp; &nbsp; <img style={{width:"40px"}}  src="https://upload.wikimedia.org/wikipedia/commons/4/41/Red_circle.gif" alt="Logo" /> </h3>
                                </CardHeader>
                                <Table className="align-items-center table-flush" responsive>
                                    <thead className="thead-light">
                                        <tr>
                                            <th scope="col">Name</th>
                                            <th scope="col">Votes</th>
                                            <th scope="col">Election</th>
                                            {/* <th scope="col">Position</th> */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map((cand, index) => (
                                            <>
                                            {index>0 && cand.positionid != data[index-1].positionid? <tr><td colspan="4"><h3 className="text-center">{cand.position}</h3></td></tr>:""}
                                            {index==0 ? <tr><td colspan="4"><h3 className="text-center p-0">{cand.position}</h3></td></tr>:""}
                                            <tr>
                                                <th scope="row">
                                                    <Media className="align-items-center">

                                                        <Media>
                                                            <span className="mb-0 text-sm">
                                                                {cand.label}
                                                            </span>
                                                        </Media>
                                                    </Media>
                                                </th>
                                                <td>{cand.value}</td>
                                                <td>
                                                    <Badge color="" className="badge-dot mr-4">

                                                        {cand.election}
                                                    </Badge>
                                                </td>

                                                {/* <td>
                                                    <div className="d-flex align-items-center">
                                                        <span className="mr-2">{cand.position}</span>
                                                    </div>
                                                </td> */}
                                            </tr>
                                            </>))}
                                    </tbody>
                                </Table>

                            </Card>
                        </div>
                    </Row>
                </Container>

            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    publics: state.publics,
});

export default connect(mapStateToProps, { getLive })(Liveresult)

