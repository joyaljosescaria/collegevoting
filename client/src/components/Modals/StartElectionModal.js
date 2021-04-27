import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { DropdownItem  , Button } from 'reactstrap'
import { startElection } from '../../actions/admin';


function StartElectionModal(props) {

    const [open, setOpen] = useState(false);

    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);

    console.log(props.started)

    return (
        <div>
            <DropdownItem
                onClick={onOpenModal}
            >
                {props.started ? "Stop" : "Start"} Election
            </DropdownItem>
            <Modal open={open} onClose={onCloseModal} center>
                <h2 className="text-center">{props.started ? "Stop" : "Start"} Election</h2>
                <p>
                    Are you sure you want to {props.started?"stop":"start"} the election?
                </p>
                <div className="text-center">
                    <Button
                        className="mr-4"
                        color="success"
                        href="#pablo"
                        size="sm"
                        onClick={() => {
                            props.startElection(props.electionId);
                            onCloseModal()
                        }}
                    >
                        {props.started ? "Stop" : "Start"}
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

export default connect(mapStateToProps, { startElection })(StartElectionModal)