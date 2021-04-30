import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { studentId } from '../../actions/studentAuth';

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
} from "reactstrap";

const Login1 = (props) => {

  const [email, setEmail] = useState('')
  const [unique_id, setUniqueId] = useState('')
  const [error, setError] = useState('')
  const [show, setShow] = useState(false)

  useEffect(() => {
    setError(props.studentAuth.error)
  }, [props.studentAuth.error])

  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.studentId(email, unique_id);
  }

  if (props.studentAuth.isStudentUniqueidVerified) {
    return <Redirect to="/auth/student/login" />
  }

  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <h2 style={{ color: "#8898aa" }}>Verify</h2>
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
                    placeholder="Email"
                    type="email"
                    autoComplete="new-email"
                    onChange={e => { setEmail(e.target.value) }}
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
                    placeholder="Unique ID"
                    // type={show ? "text" : "password"}
                    type ="text"
                    autoComplete="new-password"
                    onChange={e => setUniqueId(e.target.value)}
                  />
                  <button type="button" style={{ backgroundColor: "white", border: "0" }} onClick={e => setShow(!show)} className="buton"><i className="fas fa-eye"></i></button>
                </InputGroup>
              </FormGroup>

              <div className="text-center">
                <Button className="my-4" color="primary" type="submit">
                  Get Password
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
              {/* <small>Forgot password?</small> */}
            </a>
          </Col>
          <Col className="text-right" xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <Link to='/auth/student/register'><small>Create new account</small></Link>
            </a>
          </Col>
        </Row>
      </Col>
    </>
  );
};

const mapStateToProps = (state) => ({
  studentAuth: state.studentAuth,
});

export default connect(mapStateToProps, { studentId })(Login1)
