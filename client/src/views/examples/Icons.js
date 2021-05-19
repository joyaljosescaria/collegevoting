import React, { useState } from "react";

import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";

import HeaderSpace from "components/Headers/HeaderSpace.js";

const Election = () => {
  const [copiedText, setCopiedText] = useState();
  return (
    <>
      <HeaderSpace />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <h3 className="mb-0">Icons</h3>
              </CardHeader>
              
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Election;
