import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { loadQuotes } from '../actions/student.js'

import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
} from 'reactstrap';

import './css/Homepage.css'

const Homepage = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    React.useEffect(() => {
        props.loadQuotes()
    }, [loadQuotes])

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div className="fillw">
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
            <div className="heroo mt-5">
                <h1 className="text-white txt ">Welcome to E-Voting</h1>

                <h6 className="text-uppercase">Vote from where ever you are</h6>
            </div>
            <div className="quotes text-center mt-5">
                <blockquote class="blockquote text-center">
                    <p class="mb-0 text-secondary"><span style={{ color: "#2dce89", fontFamily: 'emoji', fontStyle: 'italic', fontSize: '30px' }}>"</span>{props.students.text ? props.students.text : ""}</p>
                    <footer class="blockquote-footer"><cite title="Source Title">{props.students.author ? props.students.author === null ? "Unknown" : props.students.author : ""}</cite></footer>
                </blockquote>
            </div>
            <div className="links text-center mt-5">
                <Link to="/lresults"><button className="btn btn-primary shadow-lg">Live Result</button></Link>
                <Link to="/result"><button className="btn btn-warning  shadow-lg ml-3">All Result</button></Link>
            </div>
        </div>
    );
}


const mapStateToProps = (state) => ({
    students: state.students
});

export default connect(mapStateToProps, { loadQuotes })(Homepage)