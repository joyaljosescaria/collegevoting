import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { DropdownItem, Button } from 'reactstrap'
import { updateBatch } from '../../actions/admin';


function UpdateBatchModal(props) {

    const [open, setOpen] = useState(false);

    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);

    return (
        <div>
            <Button
                className="float-right"
                color="success"
                href="#pablo"
                onClick={onOpenModal}
                size="md"
            >
                Update Batch
            </Button>
            <Modal open={open} onClose={onCloseModal} center>
                <h2 className="text-center">Update Batch</h2>
                <p className="text-center">
                    Are you sure you want to update the batch? 
                    <br/>
                    <span className="text-danger">All the elections , positions and candidates will be removed.</span>
                </p>
                <div className="text-center">
                    <Button
                        className="mr-4"
                        color="success"
                        href="#pablo"
                        size="sm"
                        onClick={() => {
                            props.updateBatch();
                            onCloseModal()
                        }}
                    >
                        Update
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

export default connect(mapStateToProps, { updateBatch })(UpdateBatchModal)