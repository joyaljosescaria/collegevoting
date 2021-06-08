import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from "react-router-dom";
import DonutChart from 'react-donut-chart';
import { getLive } from '../actions/publics';

import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
} from 'reactstrap';

import './css/Homepage.css'

function Liveresult(props) {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    const [data, setData] = useState([])

    useEffect(() => {
        props.getLive()
        if(props.publics.candidate){
            for (let i = 0; i < props.publics.candidate.length; i++) {
                props.publics.candidate[i].map((pos, index) => {
                    var obj = {};
                    obj["label"] = pos.student_id.name;
                    obj["value"] = pos.votes;
                    data.push(obj);
                })
            }
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

                <h2>{props.publics.candidate ? props.publics.candidate[0][0].election_id.election : ""}</h2>
                <div>
                    <DonutChart
                        data={data}
                    />
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    publics: state.publics,
});

export default connect(mapStateToProps, { getLive })(Liveresult)

