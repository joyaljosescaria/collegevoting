import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { DropdownItem, Button } from 'reactstrap'
import { addVote } from '../../actions/student';


function AddVoteModal(props) {

    const [open, setOpen] = useState(false);

    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);

    console.log(props.studentId)

    return (
        <div>
            <button className="btn btn-success" onClick={onOpenModal}>Cast Vote</button>

            <Modal open={open} onClose={onCloseModal} center>
                <h2 className="text-center">Confirm Vote </h2>
                <p className="text-center">
                    Are you sure you want to proceed ? <br /> <br/>
                    <span className="text-danger   border border-danger p-1 rounded">Casted vote can't be reverted.</span>
                </p>
                <div className="text-center">
                    <Button
                        className="mr-4"
                        color="success"
                        href="#pablo"
                        size="sm"
                        onClick={() => {
                            props.addVote(props.studentId, props.positionId);
                            onCloseModal()
                        }}
                    >
                        Vote
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

export default connect(mapStateToProps, { addVote })(AddVoteModal)