import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { DropdownItem  , Button } from 'reactstrap'
import { toggleNomination } from '../../actions/admin';


function ToggleNominationModal(props) {

    const [open, setOpen] = useState(false);

    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);

    console.log(props.status)

    return (
        <div>
            <DropdownItem
                onClick={onOpenModal}
            >
                {props.status ? "Stop" : "Start"} Nomination
            </DropdownItem>
            <Modal open={open} onClose={onCloseModal} center>
                <h2 className="text-center">{props.status? "Stop" : "Start"} Nomination</h2>
                <p>
                    Are you sure you want to {props.status?"stop":"start"} the nomination?
                </p>
                <div className="text-center">
                    <Button
                        className="mr-4"
                        color="success"
                        href="#pablo"
                        size="sm"
                        onClick={() => {
                            props.toggleNomination(props.electionId);
                            onCloseModal()
                        }}
                    >
                        {props.status ? "Stop" : "Start"}
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

export default connect(mapStateToProps, { toggleNomination })(ToggleNominationModal)