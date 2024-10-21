import React, { useState, useEffect } from "react";
import { Card, CloseButton, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import UserOpportunityCard from "./UserOpportunityCard";
import { getOpportunityCommitTime, getSkillHelper } from "_helpers/helper";
import Opportunity from "./Opportunities/Opportunity";
import Filter from "./Filter1";
import { getMoreOpportunities } from "services/OpportunityServices";

function Recommended({ opportunities, fetchRecommendedOpportunities, userData }) {
  const [index, setIndex] = useState(3);
  const [opportunityId, setOpportunityId] = useState();
  const initialOpportunities = opportunities.slice(0, index);
  const [moreOpportunitiesHere, setMoreOpportunitiesHere] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [filter, setFilter] = useState("");
  const [param, setParam] = useState("");
  const [filterCriteria, setFilterCriteria] = useState({
    location: localStorage.getItem("location") || "",
    skill: localStorage.getItem("skill") || "",
    urgency: localStorage.getItem("urgency") || "",
    commitment: localStorage.getItem("commitment") || "",
    interest: localStorage.getItem("interest") || "",
  });
  let [countofI, setCountofI] = useState(0);
  const viewAll = () => {
    setIndex(opportunities?.length);
  };

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isVisible) {
      document.body.classList.add("opportunityDetailsModal");
    } else {
      document.body.classList.remove("opportunityDetailsModal");
    }
    fetchRecommendedOpportunities();
    setPage(1);
    setMoreOpportunitiesHere([]);

    return () => {
      document.body.classList.remove("opportunityDetailsModal");
    };
  }, [isVisible, fetchRecommendedOpportunities]);

  useEffect(() => {
    setMoreOpportunitiesHere([]);
    // handleFilterChange({
    //   location: "",
    //   skill: "",
    //   urgency: "",
    //   commitment: "",
    //   interest: "",
    // });
    // setFilter("");
    fetchMoreOpportunities();
    setHasMore(true);
  }, [isVisible]);

  const showOpportunityDetails = (id) => {
    setIsVisible(!isVisible);
    setOpportunityId(id);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [isVisible]);

  // For Infinite scroll + More opportunities

  const loadMoreOpportunities = async () => {
    const response = await getMoreOpportunities(`/opportunity/more` + (param ? `?${param}` : ""));
    if (response && response?.data) {
      const newOpportunities = response?.data;
      // if (page === 1) {
      //   setMoreOpportunitiesHere([]);
      // }
      setMoreOpportunitiesHere([...moreOpportunitiesHere, ...newOpportunities]);
      if (!response.nextPage || !response?.TotalDataLength) setHasMore(false);
    } else {
      setHasMore(false);
    }
  };

  // Fetch more opportunity with filter

  useEffect(() => {
    const filterParams = Object.keys(filterCriteria)
      .filter((key) => filterCriteria[key] !== undefined && filterCriteria[key] !== null && filterCriteria[key] !== "")
      .map((key) => `${key}=${filterCriteria[key]}`)
      .join("&");
    setFilter(filterParams);
    let text = `page=${page}` + (filterParams ? `&${filterParams}` : "");
    setHasMore(true);
    setParam(text);
  }, [filterCriteria, page]);

  const fetchMoreOpportunities = () => {
    if (hasMore) {
      loadMoreOpportunities();
      setPage(page + 1);
    }
  };
  const handleFilterChange = (criteria) => {
    setPage(1);
    setFilterCriteria(criteria);
    setMoreOpportunitiesHere([]);
  };

  useEffect(() => {
    fetchMoreOpportunities();
    setHasMore(true);
  }, [filter]);

  return (
    <>
      {!isVisible && (
        <>
          <Card>
            <div className="recommendedSec">
              <div className="cardTitle">
                <h2>Recommended for you</h2>
                <p className="font-size-sm">Based on your profile and search history</p>
              </div>
              {userData?.isCompleted === 1 ? (
                <Row className="spaceLeftRight4">
                  {Array.isArray(opportunities) && opportunities?.length > 0 ? (
                    initialOpportunities?.map((opportunity, i) => {
                      return (
                        <>
                          <Col lg="4" key={i}>
                            <Card className="instanceGreyCard">
                              {/* <Link
                        to={{ pathname: `/opportunity/${opportunity?.id}` }}
                      > */}
                              <Link onClick={() => showOpportunityDetails(opportunity?.id)}>
                                <span className="font11">Open</span>
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
                            </Card>
                          </Col>
                        </>
                      );
                    })
                  ) : (
                    <p> No recommendations...</p>
                  )}
                </Row>
              ) : (
                <Row>
                  <p>
                    <span>
                      <Link to="/user/edit">Update</Link> your profile to get recommendations
                    </span>
                  </p>
                </Row>
              )}
              {index < opportunities?.length && userData?.isCompleted !== 0 && (
                <div className="viewAllBtn">
                  <button className="btn btnlinkPrimary" onClick={viewAll}>
                    View all
                  </button>
                </div>
              )}
            </div>
          </Card>
          <Filter onFilterChange={handleFilterChange} fetchMoreOpportunities={fetchMoreOpportunities} setPage={setPage} setHasMore={setHasMore} setMoreOpportunitiesHere={setMoreOpportunitiesHere} />
          <Card>
            <div className="recommendedSec">
              <div className="cardTitle">
                <h2>More opportunities</h2>
                <p className="font-size-sm">Based on your profile and search history</p>
              </div>

              <UserOpportunityCard opportunities={moreOpportunitiesHere} setIsVisible={setIsVisible} fetchMoreOpportunities={fetchMoreOpportunities} showOpportunityDetails={showOpportunityDetails} hasMore={hasMore} />
            </div>
          </Card>
        </>
      )}
      {/* Opportunity Details popup */}
      {isVisible && (
        <div className="oportunityDetailsPopup">
          <CloseButton onClick={showOpportunityDetails} className="btn-secondary-cancel-icon" />
          <Opportunity id={opportunityId} setIsVisible={setIsVisible} apply />
        </div>
      )}
      {/* End */}
    </>
  );
}

export default Recommended;
