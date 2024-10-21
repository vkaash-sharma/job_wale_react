import React from "react";
import { Card, Col, Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { fullName, getOpportunityCommitTime, getSkillHelper } from "_helpers/helper";
import InfiniteScroll from "react-infinite-scroll-component";

function UserOpportunityCard({ opportunities, showProfile, showOpportunityDetails, fetchMoreOpportunities, hasMore }) {
  // Get the current URL with query params.
  const currentUrl = window.location.href;
  const url = new URL(currentUrl);
  const pathWithParams = url.pathname + url.search;
  const pathWithoutId = url.pathname.replace(/\/\d+$/, "");
  return (
    (pathWithParams === "/user/dashboard?tab=recommended" || pathWithParams === "/user/dashboard" || pathWithParams === "/manager/profile" || pathWithoutId === "/applicant/profile" || pathWithoutId === "/manager/profile") && (
      <InfiniteScroll style={{ minHeight: "60vh" }} dataLength={opportunities.length} useWindow={true} next={fetchMoreOpportunities} hasMore={hasMore} loader={<h4 className="cardTitle">Loading...</h4>} endMessage={<h4 className="cardTitle fs-5 mt-4 text-center w-100">{!opportunities.length ? "No opportunity..." : "You have seen all..."}.</h4>}>
        <Row>
          {Array.isArray(opportunities) &&
            opportunities?.length > 0 &&
            opportunities?.map((opportunity, i) => {
              return (
                <Col lg="12" key={i}>
                  <Card className="instanceGreyCard instanceBigCard">
                    <Link onClick={() => showOpportunityDetails(opportunity?.id)}>
                      <div
                        className="instanceLeftSec"
                        style={{
                          maxWidth: showProfile === "completedOpportunities" || showProfile === "activeOpportunities" ? "100%" : "",
                        }}>
                        <span className="font11">Open</span>

                        <h6>{opportunity?.opportunity_name}</h6>
                        <p className="truncate-lines">{opportunity?.opportunity_desc}</p>
                        <div className="commitment">{getOpportunityCommitTime(opportunity?.commit_time)} commitment</div>
                        <span className="instanceGreyBtn globalBtn ">
                          {getSkillHelper("location", opportunity)
                            ?.map((location) => location)
                            .join(", ")}
                        </span>
                        <span className="instanceGreyBtn remoteBtn">{opportunity?.engagement_type}</span>
                      </div>
                      {showProfile !== "completedOpportunities" && showProfile !== "activeOpportunities" && (
                        <div className="instanceRightSec">
                          <Image roundedCircle src={opportunity?.user?.profilePicture || require("../../Assets/Images/user-default.png")} alt="profile-pic" />
                          <p className="font-size-sm">{fullName(opportunity?.user)}</p>
                        </div>
                      )}
                    </Link>
                  </Card>
                </Col>
              );
            })}
        </Row>
      </InfiniteScroll>
    )
  );
}
export default UserOpportunityCard;
