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
import { addElection } from '../../actions/admin';


function AddElectionModal(props) {

    const [open, setOpen] = useState(false);
    const [election, setElection] = useState('')
    const [date , setDate] = useState('')

    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        props.addElection(election , date)
    }

    return (
        <div>
            <div className="btn btn-sm btn-primary" onClick={onOpenModal}>Add Election</div>
            <Modal open={open} onClose={onCloseModal} center>
                <h2 className="text-center">Add Election</h2>
                <FormGroup>
                    <InputGroup className="input-group-alternative">
                        <Input
                            placeholder="Election"
                            type="text"
                            onChange={e => setElection(e.target.value)}
                            style={{width:"15rem" , border:"1px solid  #4d90fea3"}}
                        />
                    </InputGroup>
                </FormGroup>
                <FormGroup>
                    <InputGroup className="input-group-alternative">
                        <Input
                            placeholder="Course"
                            type="date"
                            onChange={e => setDate(e.target.value)}
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
                        Add Election
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

export default connect(mapStateToProps, { addElection })(AddElectionModal)