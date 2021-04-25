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
import { addPosition, getAllCourse } from '../../actions/admin';


function AddPositionModal(props) {

    const [open, setOpen] = useState(false);
    const [position, setPosition] = useState('')
    const [batch_year_count, setBatchYearCount] = useState(0)
    const [course_id, setCourse] = useState('')

    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);

    const handleSubmit = (e) => {
        props.addPosition(position, batch_year_count, course_id, props.electionId)
        e.preventDefault();
    }

    useEffect(() => {
        props.getAllCourse()
    }, [getAllCourse])

    return (
        <div>
            <div className="btn btn-sm btn-primary" onClick={onOpenModal}>Add Position</div>
            <Modal open={open} onClose={onCloseModal} center>
                <h2 className="text-center">Add Position</h2>
                <FormGroup>
                    <InputGroup className="input-group-alternative">
                        <Input
                            placeholder="Position"
                            type="text"
                            onChange={e => setPosition(e.target.value)}
                            style={{ width: "15rem", border: "1px solid  #4d90fea3" }}
                        />
                    </InputGroup>
                </FormGroup>
                <FormGroup>
                    <InputGroup className="input-group-alternative">
                        <Input
                            type="select"
                            onChange={e => setCourse(e.target.value)}
                            style={{ width: "15rem", border: "1px solid  #4d90fea3" }}
                        >
                            <option value=''>Select Course</option>
                            {props.admin.getAllCourse ? props.admin.getAllCourse.map((course) => <option key={course._id} value={course._id}>{course.course}</option>) : <option value=''>Loading Courses</option>}

                        </Input>
                    </InputGroup>
                </FormGroup>
                <FormGroup>
                    <InputGroup className="input-group-alternative">
                        <Input
                            type="select"
                            onChange={e => setBatchYearCount(e.target.value)}
                            style={{ width: "15rem", border: "1px solid  #4d90fea3" }}
                        >
                            <option value=''>Select Batch Year</option>
                            <option value='0'>0</option>
                            <option value='1'>1</option>
                            <option value='2'>2</option>
                            <option value='3'>3</option>
                            <option value='4'>4</option>
                            <option value='5'>5</option>
                            <option value='6'>6</option>
                        </Input>
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
                        Add Position
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

export default connect(mapStateToProps, { addPosition, getAllCourse })(AddPositionModal)