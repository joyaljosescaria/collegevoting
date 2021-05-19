import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { DropdownItem, Button } from 'reactstrap'
import { sendNomination } from '../../actions/student';


function SubmitNominationModal(props) {

    const [open, setOpen] = useState(false);

    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);

    return (
        <div>
            <Button className="my-4" color="primary" onClick={onOpenModal}>
                Submit Nomination
            </Button>
            <Modal open={open} onClose={onCloseModal} center>
                <h2 className="text-center">Delete Election</h2>
                <p>
                    Are you sure you want to submit nomination?
                </p>
                <div className="text-center">
                    <Button
                        className="mr-4"
                        color="success"
                        href="#pablo"
                        size="sm"
                        onClick={() => {
                            props.sendNomination(props.position , props.election);
                            onCloseModal()
                        }}
                    >
                        Submit Nomination
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
    student: state.students,
});

export default connect(mapStateToProps, { sendNomination })(SubmitNominationModal)