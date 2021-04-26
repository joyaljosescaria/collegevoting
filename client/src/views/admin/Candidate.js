import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import Skeleton from '@yisheng90/react-loading';
import { Redirect } from "react-router-dom";

// import { loadAdminStudents , loadAdminStudent } from '../../actions/admin';
// import { Link } from "react-router-dom";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
} from "reactstrap";

// core components
import UserHeader from "components/Headers/UserHeader.js";
import ResponsivePlayer from "components/Video/VideoPlayer.js"
import VerifyModal from "components/Modals/VerifyModal";


const Candidate = (props) => {

  <>
    <h1>HAi</h1>
  </>
};

const mapStateToProps = (state) => ({
  admin: state.admin,
});

export default connect(mapStateToProps, {})(Candidate)