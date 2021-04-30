import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { Button } from 'reactstrap'
import { verifyStudent, unverifyStudent } from '../../actions/admin';


function VerifyModal(props) {

    const [open, setOpen] = useState(false);

    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);

    return (
        <div>
            <Button
                className="mr-4"
                color="info"
                href="#pablo"
                size="sm"
                onClick={onOpenModal}
            >
                {props.admin.student.is_verified ? "Unverify" : "Verify"}
            </Button>
            <Modal open={open} onClose={onCloseModal} center>
                <h2 className="text-center">{props.admin.student.is_verified ? "Unverifiy" : "Verify"} Student</h2>
                <p>
                    Are you sure you want to {props.admin.student.is_verified ? "unverifiy" : "verify"} {props.admin.student.name ? props.admin.student.name : "student"}
                </p>
                <div className="text-center">
                    <Button
                        className="mr-4"
                        color="success"
                        href="#pablo"
                        size="sm"
                        onClick={() => {
                            props.admin.student.is_verified ?
                            props.unverifyStudent(props.admin.student._id , props.admin.student.course_id , props.admin.student.batch_year_count) :
                            props.verifyStudent(props.admin.student._id , props.admin.student.course_id , props.admin.student.batch_year_count)
                        }}
                    >
                        {props.admin.student.is_verified ? "Unverify" : "Verify"}
                    </Button>
                    <Button
                        className="mr-4"
                        color="danger"
                        href="#pablo"
                        size="sm"
                        onClick={onCloseModal}
                    >
                        Cancel
                    </Button>
                </div>
            </Modal>
        </div>
    )
}

const mapStateToProps = (state) => ({
    admin: state.admin,
});

export default connect(mapStateToProps, { verifyStudent, unverifyStudent })(VerifyModal)