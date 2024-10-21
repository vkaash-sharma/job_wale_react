import { DDMMYYYYFormat, getOpportunityCommitTime, getSkillHelper } from "_helpers/helper";
import React, { useEffect, useState } from "react";
import { Button, Card, CloseButton, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Opportunity from "./Opportunity";
import CustomTimeAgo from "_helpers/dateMakerTimeAgo";

const AppliedOpportunities = ({ opportunities, getAppliedOpportunity, role, activeTab }) => {
  const appliedLabel = ["Applied", "Accepted", "Not Selected", "In Progress", "Completed"];

  const appliedParams = ["applied", "accepted", "rejected", "in-progress", "completed"];

  const [isVisible, setIsVisible] = useState(false);
  const [activeButton, setActiveButton] = useState(0);
  const [opportunityId, setOpportunityId] = useState();

  const handleButtonClick = (buttonNumber) => {
    setActiveButton(buttonNumber);
    getAppliedOpportunity(appliedParams[buttonNumber]);
  };

  useEffect(() => {
    if (activeTab === "opportunities") {
      getAppliedOpportunity(appliedParams[activeButton]);
    }
  }, [activeTab]);

  const showOpportunityDetails = (id) => {
    setIsVisible(!isVisible);
    setOpportunityId(id);
  };
  useEffect(() => {
    if (isVisible) {
      document.body.classList.add("opportunityDetailsModal");
    } else {
      document.body.classList.remove("opportunityDetailsModal");
    }

    return () => {
      document.body.classList.remove("opportunityDetailsModal");
    };
  }, [isVisible]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [isVisible]);

  return (
    <>
      {!isVisible && (
        <>
          <Card>
            <div className="recommendedSec">
              <div className="cardTitle">
                <h2>Your opportunities</h2>
              </div>
              <div className="applicationsActionGroup mb-3">
                <div className="rightButtons">
                  {appliedLabel?.map((status, index) => (
                    <Button key={index} className={activeButton === index ? "tickIcon primaryContainerRadiusBtn active" : "btn-secondary-radius"} onClick={() => handleButtonClick(index)}>
                      {status}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="recommendedSec">
                <Row className="spaceLeftRight4">
                  {Array.isArray(opportunities) && opportunities?.length > 0 ? (
                    opportunities?.map((opportunity, i) => {
                      return (
                        <Col lg="4" key={i}>
                          <Card className="instanceGreyCard">
                            <Link onClick={() => showOpportunityDetails(opportunity?.id)}>
                              <span className="font11">
                                {activeButton === 0 ? (
                                  <>Open</>
                                ) : (
                                  <>
                                    <CustomTimeAgo date={opportunity?.createdAt} />
                                  </>
                                )}
                              </span>
                              <h6>{opportunity?.opportunity_name}</h6>
                              <p>{opportunity?.opportunity_desc}</p>
                              <div className="commitment">{getOpportunityCommitTime(opportunity?.commit_time)} commitment</div>
                              <span className="instanceGreyBtn globalBtn ">
                                {getSkillHelper("location", opportunity)
                                  ?.map((location) => location)
                                  .join(", ")}
                              </span>

                              <span className="instanceGreyBtn remoteBtn">{opportunity?.engagement_type}</span>
                            </Link>
                            {activeButton === 4 && Array.isArray(opportunity?.opportunityFeedbackStatus) && (
                              <div className="mt-2">
                                {opportunity?.opportunityFeedbackStatus[0]?.user_review_status ? (
                                  // <h4 className="tickIcon primaryContainerRadiusBtn active">
                                  //   Feedback given
                                  // </h4>
                                  ""
                                ) : (
                                  <Link className="write-feedback-link" to={`/${role}/feedback/${opportunity?.id}?role=completed`}>
                                    Write feedback
                                  </Link>
                                )}
                              </div>
                            )}
                          </Card>
                        </Col>
                      );
                    })
                  ) : (
                    <p>No opportunities...</p>
                  )}
                </Row>
              </div>
            </div>
          </Card>
        </>
      )}
      {/* Opportunity Details popup */}
      {isVisible && (
        <div className="oportunityDetailsPopup">
          <CloseButton onClick={showOpportunityDetails} className="btn-secondary-cancel-icon" />
          <Opportunity id={opportunityId} setIsVisible={setIsVisible} />
        </div>
      )}
      {/* End */}
    </>
  );
};

export default AppliedOpportunities;
