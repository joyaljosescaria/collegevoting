import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { changePassword } from '../../actions/adminAuth';

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

const ChangePassword = (props) => {

  const [otp, setOtp] = useState('')
  const [firstpass, setFirstpass] = useState('')
  const [secondpass, setSecondpass] = useState('')
  const [error, setError] = useState('')


  useEffect(() => {
    setError(props.adminAuth.error)
  }, [props.adminAuth.error])

  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.ChangePassword(otp, firstpass, secondpass);
  }

  if (props.adminAuth.isAdminPasswordChanged) {
    return <Redirect to="/admin/login" />
  }

  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <h2 style={{ color: "#8898aa" }}>Change Password</h2>
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
                    placeholder="OTP"
                    type="text"
                    onChange={e => { setOtp(e.target.value) }}
                  />
                </InputGroup>
              </FormGroup>

              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Password"
                    type="password"
                    onChange={e => { setFirstpass(e.target.value) }}
                  />
                </InputGroup>
              </FormGroup>

              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Confirm Password"
                    type="password"
                    onChange={e => { setSecondpass(e.target.value) }}
                  />
                </InputGroup>
              </FormGroup>


              <div className="text-center">
                <Button className="my-4" color="primary" type="submit">
                  Change Password
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

const mapStateToProps = (state) => ({
  adminAuth: state.adminAuth,
});

export default connect(mapStateToProps, { changePassword })(ChangePassword)
