import CustomTimeAgo from "_helpers/dateMakerTimeAgo";
import { getOpportunityCommitTime, getSkillHelper } from "_helpers/helper";
import Opportunity from "_pages/User/Opportunities/Opportunity";
import React, { useCallback, useEffect, useState } from "react";
import { Button, Card, CloseButton, Col, Image, Row } from "react-bootstrap";
import { confirmAlert } from "react-confirm-alert";
import { Link } from "react-router-dom";
import { deleteActiveOpportunity } from "services/OpportunityServices";
import toastr from "toastr";

function OpportunitiesList({ opportunities, tabView, getActiveOpportunitiesByMng }) {
  const [isVisible, setIsVisible] = useState(false);
  const [opportunityId, setOpportunityId] = useState();
  const deleteOpportunity = useCallback(
    (id) => {
      confirmAlert({
        title: "Delete Active opportunity",
        message: "Are you sure that you want to Delete this opportunity?",
        buttons: [
          {
            label: "Yes",
            onClick: async () => {
              let response = await deleteActiveOpportunity(id);

              if (response?.status) {
                toastr.info(response.message || "Deleted successfully!");
                await getActiveOpportunitiesByMng();
              } else if (response?.message) {
                toastr.error(response.message || "could not delete");
              }
            },
          },
          {
            label: "No",
            onClick: () => {},
          },
        ],
      });
    },
    [getActiveOpportunitiesByMng]
  );

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
        <Card>
          <div className="cardTitle">{tabView !== "completed" ? <h2>Your active opportunities</h2> : <h2>Completed opportunities</h2>}</div>
          <div className="recommendedSec pt-3">
            <Row className="spaceLeftRight4">
              {Array.isArray(opportunities) && opportunities?.length > 0 ? (
                opportunities?.map((opportunity) => (
                  <Col lg="4" key={opportunity?.id}>
                    <Card className="instanceGreyCard">
                      <Link onClick={() => showOpportunityDetails(opportunity?.id)}>
                        <span className="font11">
                          <CustomTimeAgo date={opportunity?.createdAt} />
                        </span>
                        <h6>{opportunity?.opportunity_name}</h6>
                        <p>{opportunity?.opportunity_desc}</p>
                        <div className="commitment">{getOpportunityCommitTime(opportunity?.commit_time)} commitment</div>

                        <span className="instanceGreyBtn globalBtn ">
                          {getSkillHelper("location", opportunity)
                            ?.map((location) => location)
                            .join(", ")}
                        </span>
                        {/* )
                        )} */}
                        <span className="instanceGreyBtn remoteBtn">{opportunity?.engagement_type}</span>
                      </Link>
                      <div className="cardActions">
                        {tabView === "active" && (
                          <>
                            <div className="btnIconLeft">
                              {/* <Link variant="link" className="editIconBtn">
                        Edit
                      </Link> */}
                              <div
                                role="button"
                                onClick={() => {
                                  deleteOpportunity(opportunity?.id);
                                }}
                                onKeyUp={() => {
                                  deleteOpportunity(opportunity?.id);
                                }}>
                                <Button variant="link" className="deleteIconBtn"></Button>
                                <span className=" deleteIconText">Delete</span>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </Card>
                  </Col>
                ))
              ) : (
                <p>No Opportunities...</p>
              )}
            </Row>
          </div>
        </Card>
      )}

      {/* Opportunity Details popup */}
      {isVisible && (
        <div className="oportunityDetailsPopup">
          <CloseButton onClick={showOpportunityDetails} className="btn-secondary-cancel-icon" />
          <Opportunity id={opportunityId} setIsVisible={setIsVisible} tabView={tabView} />
        </div>
      )}
      {/* End */}
    </>
  );
}

export default OpportunitiesList;
