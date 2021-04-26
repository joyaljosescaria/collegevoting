import React, { useState } from "react";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
} from "reactstrap";
import { Link , useParams } from "react-router-dom";

import CandidateHeader from "components/Headers/CandidateHeader";

const Index = (props) => {
  
  var { electionId } = useParams();

  return (
    <>
      <CandidateHeader electionId={electionId}/>
    </>
  );
};

export default Index;
