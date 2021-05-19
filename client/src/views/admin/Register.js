import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { studentRegister } from '../../actions/studentAuth';
import { getCourse } from '../../actions/student';

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
  Label
} from "reactstrap";

const Login = (props) => {

  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [name, setName] = useState('')
  const [course_id, setCourse] = useState('')
  const [batch_year_count, setBatchYearCount] = useState('')
  const [file1, setFile1] = useState('')
  const [file2, setFile2] = useState('')
  const [file3, setFile3] = useState('')

  console.log(course_id)

  useEffect(() => {
    props.getCourse()
    setError(props.studentAuth.error)

  }, [getCourse , props.studentAuth.error])

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const formData = new FormData();
    formData.append('profile_pic', file1);
    formData.append('id_card', file2);
    formData.append('id_card_selfi', file3);
    formData.append('name', name);
    formData.append('email', email);
    formData.append('course_id', course_id);
    formData.append('batch_year_count', batch_year_count);
    props.studentRegister(name ,email, course_id , batch_year_count, formData);
  }

  if (props.studentAuth.isStudentRegestered) {
    return <Redirect to="/auth/student/loginpre" />
  }

  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <h2 style={{ color: "#8898aa" }}>Register</h2>
            </div>

            <div className="text-gray-100 text-center mb-3 font-bold">
              {error ? <span className="text-xs rounded font-semibold inline-block py-1 px-2 mt-2  text-red-600  bg-red-200  last:mr-0 mr-1" style={{ color: '#fffafaf2', background: '#ff0000a6' }}>{error}</span> : <h1 style={{ color: '#e2e8f0' }}></h1>}
            </div>

            <Form role="form" onSubmit={handleSubmit}>
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Name"
                    type="text"
                    autoComplete="new-email"
                    onChange={e => { setName(e.target.value) }}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="email"
                    type="email"
                    autoComplete="email"
                    onChange={e => setEmail(e.target.value)}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input type="select" name="select" id="exampleSelect" onChange={(e) => setCourse(e.target.value)}>
                    <option>Select Course</option>
                    {props.student.getCourse ? props.student.getCourse.map((course) => (
                      <option value={course._id}>{course.course}</option>
                    )) : ""}
                  </Input>
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input type="select" name="select" id="exampleSelect" onChange={(e) => { setBatchYearCount(e.target.value) }}>
                    <option value=''>Select Batch Year</option>
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                  </Input>
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Label for="exampleFile">Profile Picture</Label>
                  <Input type="file" name="file" id="exampleFile" onChange={(e) => { setFile1(e.target.files[0]) }} />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Label for="exampleFile">ID Card</Label>
                  <Input type="file" name="file" id="exampleFile" onChange={(e) => { setFile2(e.target.files[0]) }} />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Label for="exampleFile">ID Card Selfi</Label>
                  <Input type="file" name="file" id="exampleFile" onChange={(e) => { setFile3(e.target.files[0]) }} />
                </InputGroup>
              </FormGroup>


              <div className="text-center">
                <Button className="my-4" color="primary" type="submit">
                  Sign in
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
        <Row className="mt-3">
          <Col xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <small>Forgot password?</small>
            </a>
          </Col>
          <Col className="text-right" xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <small>Create new account</small>
            </a>
          </Col>
        </Row>
      </Col>
    </>
  );
};

const mapStateToProps = (state) => ({
  studentAuth: state.studentAuth,
  student: state.students
});

export default connect(mapStateToProps, { studentRegister, getCourse })(Login)
