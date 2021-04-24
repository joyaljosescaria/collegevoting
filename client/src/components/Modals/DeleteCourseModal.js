import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { DropdownItem  , Button } from 'reactstrap'
import { deleteACourse } from '../../actions/admin';


function DeleteCourseModal(props) {

    const [open, setOpen] = useState(false);

    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);

    return (
        <div>
            <DropdownItem
                onClick={onOpenModal}
            >
                Delete
            </DropdownItem>
            <Modal open={open} onClose={onCloseModal} center>
                <h2 className="text-center">Delete Course</h2>
                <p>
                    Are you sure you want to delete the course?
                </p>
                <div className="text-center">
                    <Button
                        className="mr-4"
                        color="success"
                        href="#pablo"
                        size="sm"
                        onClick={() => {
                            props.deleteACourse(props.courseId);
                            onCloseModal()
                        }}
                    >
                        Delete
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

export default connect(mapStateToProps, { deleteACourse })(DeleteCourseModal)