import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import {
    Button,
    FormGroup,
    InputGroup,
    Input,
} from 'reactstrap'
import { addACourse } from '../../actions/admin';


function AddCourseModal(props) {

    const [open, setOpen] = useState(false);
    const [course, setCourse] = useState('')

    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        props.addACourse(course)
    }

    return (
        <div>
            <div className="btn btn-sm btn-primary" onClick={onOpenModal}>Add Course</div>
            <Modal open={open} onClose={onCloseModal} center>
                <h2 className="text-center">Add Course</h2>
                <FormGroup>
                    <InputGroup className="input-group-alternative">
                        <Input
                            placeholder="Course"
                            type="text"
                            onChange={e => setCourse(e.target.value)}
                            style={{width:"15rem" , border:"1px solid  #4d90fea3"}}
                        />
                    </InputGroup>
                </FormGroup>
                <div className="text-center">
                    <Button
                        className="mr-4"
                        color="success"
                        href="#pablo"
                        size="sm"
                        onClick={(e) => {
                            handleSubmit(e)
                            onCloseModal()
                        }}
                    >
                        Add Course
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

export default connect(mapStateToProps, { addACourse })(AddCourseModal)