import React from "react";
import { Badge } from "react-bootstrap";

function Interests() {
  return (
    <>
      <div className="otherInfoSec">
        <h5>Interests</h5>
        <div className="interestsGroup">
          <Badge>Nuclear Medicine</Badge>
          <Badge>COVID</Badge>
          <Badge>Government and politics</Badge>
          <Badge>Events</Badge>
        </div>
      </div>
    </>
  );
}

export default Interests;
