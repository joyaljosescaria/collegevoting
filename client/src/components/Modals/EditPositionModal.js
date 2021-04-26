import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import {
    Button,
    FormGroup,
    InputGroup,
    Input,
    DropdownItem
} from 'reactstrap'
import { editPosition, getAllCourse } from '../../actions/admin';


function EditPositionModal(props) {

    const [open, setOpen] = useState(false);
    const [position, setPosition] = useState(props.position)
    const [batch_year_count, setBatchYearCount] = useState(props.batch)
    const [course_id, setCourse] = useState(props.course)

    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);

    const handleSubmit = (e) => {
        props.editPosition(position, batch_year_count, course_id, props.electionId , props.positionId)
        e.preventDefault();
    }

    useEffect(() => {
        props.getAllCourse()
    }, [getAllCourse])

    return (
        <div>
            <DropdownItem
                onClick={onOpenModal}
            >
                Edit
            </DropdownItem>
            <Modal open={open} onClose={onCloseModal} center>
                <h2 className="text-center">Edit Position</h2>
                <FormGroup>
                    <InputGroup className="input-group-alternative">
                        <Input
                            placeholder="Position"
                            type="text"
                            defaultValue={props.position}
                            onChange={e => setPosition(e.target.value)}
                            style={{ width: "15rem", border: "1px solid  #4d90fea3" }}
                        />
                    </InputGroup>
                </FormGroup>
                <FormGroup>
                    <InputGroup className="input-group-alternative">
                        <Input
                            type="select"
                            defaultValue={props.course}
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
                            defaultValue={props.batch}
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

export default connect(mapStateToProps, { editPosition, getAllCourse })(EditPositionModal)