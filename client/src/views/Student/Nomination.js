import React from "react";

// reactstrap components
import { Card, Container, Row } from "reactstrap";

// core components
import HeaderSpace from "components/Headers/HeaderSpace.js";

import Lost from "./Lost/Lost"

const Nomination = () => {
  return (
    <>
      <HeaderSpace />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow border-0">
                <Lost/>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Nomination;
