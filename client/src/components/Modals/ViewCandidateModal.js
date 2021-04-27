import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { loadCandidate, acceptCandidate, rejectCandidate } from '../../actions/admin';

import './CustCss.css'

import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    Container,
    Row,
    Col,
} from "reactstrap";

function VerifyModal(props) {

    // const [candidate , setCandidate] = useState([])

    // console.log(candidate)

    // useEffect(() => {
    //     setCandidate(props.admin.findCandidate)
    // }, [loadCandidate])


    const [open, setOpen] = useState(false);

    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);

    const callCandidate = () => {
        console.log("hai")
        props.loadCandidate(props.candidateId)
    }

    return (
        <div>
            <button onClick={(e) => { callCandidate(); onOpenModal() }} type="button" class="mt-4 btn-block btn btn-primary">View Candidate</button>
            <Modal open={open} onClose={onCloseModal} center classNames={{
                modal: 'customModal',
            }}>
                <h2 className="text-center mt-4">View Candidate</h2>

                <Container className="mt--7 mt-4" fluid>
                    <Row>
                        <Col className="order-xl-2 mb-5 mt-9 mb-xl-0" xl="12">
                            <Card className="card-profile shadow">
                                <Row className="justify-content-center">
                                    <Col className="order-lg-2" lg="3">
                                        <div className="card-profile-image">
                                            <a href="#pablo" onClick={(e) => e.preventDefault()}>
                                                <img
                                                    alt="..."
                                                    className="rounded-circle"
                                                    style={{ width: "180px", height: "180px" }}
                                                    src={props.admin.findCandidate ? props.admin.findCandidate[0].student_id.profile_pic : ""}
                                                />
                                            </a>
                                        </div>
                                    </Col>
                                </Row>
                                <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                                    {props.admin.findCandidate?props.admin.findCandidate[0].is_verified?"":
                                    <div className="d-flex justify-content-between">
                                        <Button
                                            className="mr-4"
                                            color="info"
                                            href="#pablo"
                                            onClick={() => {props.acceptCandidate(props.candidateId) ; onCloseModal()}}
                                            size="sm"
                                        >
                                            Accept
                                        </Button>
                                        <Button
                                            className="float-right"
                                            color="default"
                                            href="#pablo"
                                            onClick={() => {props.rejectCandidate(props.candidateId) ; onCloseModal()}}
                                            size="sm"
                                        >
                                            Reject
                                    </Button>
                                    </div>:""}
                                </CardHeader>
                                <CardBody className="pt-0 pt-md-4">
                                    <div className="text-center mt-5">
                                        <h3>
                                            {props.admin.findCandidate ? props.admin.findCandidate[0].student_id.name : ""}
                                            {/* <span className="font-weight-light">, 27</span> */}
                                        </h3>
                                        <div className="h5 font-weight-300">
                                            <i className="ni location_pin mr-2" />
                                            {props.admin.findCandidate ? props.admin.findCandidate[0].student_id.course_id.course : ""}
                                        </div>
                                        <div className="h5 mt-4">
                                            <i className="ni business_briefcase-24 mr-2" />
                                            {props.admin.findCandidate ? props.admin.findCandidate[0].is_verified ? "Verified" : "Not Verified" : ""}
                                        </div>
                                        <div>
                                            <i className="ni education_hat mr-2" />
                                            {props.admin.findCandidate ? props.admin.findCandidate[0].position_id.position : ""}
                                        </div>
                                        {/* <hr className="my-4" /> */}
                                        <p style={{ visibility: "hidden" }}>
                                            Ryan — the name taken by Melbourne-raised
                                        </p>

                                    </div>
                                </CardBody>
                            </Card>
                        </Col>

                    </Row>
                </Container>
            </Modal>
        </div>
    )
}

const mapStateToProps = (state) => ({
    admin: state.admin,
});

export default connect(mapStateToProps, { loadCandidate, acceptCandidate, rejectCandidate })(VerifyModal)