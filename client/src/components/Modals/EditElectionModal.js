import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import {
    Button,
    DropdownItem,
    FormGroup,
    InputGroup,
    Input,
} from 'reactstrap'
import { editElection } from '../../actions/admin';


function EditElectionModal(props) {

    const [open, setOpen] = useState(false);
    const [election, setElection] = useState(props.election)
    const [date , setDate] = useState(props.date);

    const [tye , setTye] = useState('text')

    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        props.editElection(election , date , props.id)
    }

    return (
        <div>
            <DropdownItem
                onClick={onOpenModal}
            >
                Edit
            </DropdownItem>
            <Modal open={open} onClose={onCloseModal} center>
                <h2 className="text-center">Edit Election</h2>
                <FormGroup>
                    <InputGroup className="input-group-alternative">
                        <Input
                            placeholder="Election"
                            type="text"
                            defaultValue={props.election}
                            onChange={e => setElection(e.target.value)}
                            style={{ width: "15rem", border: "1px solid  #4d90fea3" }}
                        />
                    </InputGroup>
                </FormGroup>
                <FormGroup>
                    <InputGroup className="input-group-alternative">
                        <Input
                            placeholder="Date"
                            type= {tye}
                            onClick= {e=> setTye('date')}
                            defaultValue={props.date.split('T')[0]}
                            onChange={e => setDate(e.target.value)}
                            style={{ width: "15rem", border: "1px solid  #4d90fea3" }}
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
                        Update Election
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

export default connect(mapStateToProps, { editElection })(EditElectionModal)