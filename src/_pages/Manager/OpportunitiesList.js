import { DDMMYYYYFormat, getOpportunityCommitTime } from "_helpers/helper";
import React from "react";
import { Card, Col, Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

function OpportunitiesList({ opportunities }) {
  const getSkill = (skillKey, opportunity) => {
    const skillSet = opportunity?.opportunitySkill
      ?.filter((value) => value?.type === skillKey)
      ?.map((skill) => skill?.skill?.name);
    return skillSet;
  };
  return (
    <>
      <div className="recommendedSec pt-3">
        <Row className="spaceLeftRight4">
          {Array.isArray(opportunities) &&
            opportunities?.length > 0 &&
            opportunities?.map((opportunity) => (
              <Col lg="4" key={opportunity?.id}>
                <Card className="instanceGreyCard">
                  <Link to={`/opportunity/${opportunity?.id}`}>
                    <span className="font11">
                      {DDMMYYYYFormat(opportunity?.createdAt)}
                    </span>
                    <h6>{opportunity?.opportunity_name}</h6>
                    <p>{opportunity?.opportunity_desc}</p>
                    <div className="commitment">
                      {getOpportunityCommitTime(opportunity?.commit_time)} commitment
                    </div>
                    {getSkill("location", opportunity)?.map(
                      (location, index) =>
                        location === "Global" && (
                          <span
                            key={index}
                            className="instanceGreyBtn globalBtn"
                          >
                            Global
                          </span>
                        )
                    )}
                    <span className="instanceGreyBtn remoteBtn">Remote</span>
                  </Link>
                  <div className="cardActions">
                    <div className="btnIconLeft">
                      <Link variant="link" className="editIconBtn">
                        Edit
                      </Link>
                      <Link variant="link" className="deleteIconBtn">
                        Delete112
                      </Link>
                    </div>
                    <Link variant="link" className="write-feedback-link">
                      Write feedback
                    </Link>
                  </div>
                </Card>
              </Col>
            ))}
        </Row>
      </div>
    </>
  );
}

export default OpportunitiesList;
