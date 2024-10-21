import React, { useEffect, useState } from "react";
import { Button, Card, CloseButton, Nav, Tab } from "react-bootstrap";
import Reviews from "../../components/Review/Reviews";
import { fullName, getOpportunityCommitTime } from "_helpers/helper";
import Interests1 from "./Interests1";
import Skills1 from "./Skills1";
import UserOpportunityCard from "./UserOpportunityCard";
import Opportunity from "./Opportunities/Opportunity";

function UserProfileData({
  userData,
  endorsement,
  filteredOpportunitiesBefore,
  filteredOpportunitiesAfter,
  posted,
  applied,
  postedOpportunity,
  appliedOpportunity,
}) {
  const currentLocation = window.location.pathname;
  const [activeButton, setActiveButton] = useState(1);
  const [opportunityId, setOpportunityId] = useState();

  const handleButtonClick = (buttonNumber) => {
    setActiveButton(buttonNumber);
  };
  const [isVisible, setIsVisible] = useState(false);

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

  const showOpportunityDetails = (id) => {
    setIsVisible(!isVisible);
    setOpportunityId(id);
  };
  useEffect(() => {
    window.scrollTo({
      top: window.scrollY + 170,
      behavior: "smooth",
    });
  }, [isVisible]);

  const currentUrl = window.location.href;
  const url = new URL(currentUrl);
  const pathWithoutId = url.pathname.replace(/\/\d+$/, "");
  return (
    <Tab.Container defaultActiveKey="Profile">
      <Card>
        <div className="profileDetailsSec">
          <div className="profileCover">
            <div className="profilePic">
              <img
                src={
                  userData?.profilePicture
                    ? userData?.profilePicture
                    : require("../../Assets/Images/user-default.png")
                }
                alt="profile-pic"
              />
            </div>
          </div>
          <h2>{fullName(userData)}</h2>
          <h4>{userData?.profile_title}</h4>
          <p>{userData?.profile_desc}</p>
        </div>
        {currentLocation === "/manager/profile" ||
        pathWithoutId === "/applicant/profile" ||
        pathWithoutId === "/manager/profile" ? (
          <div className="whoopCustomTab mt-4">
            <Nav variant="pills" justify>
              <Nav.Item>
                <Nav.Link eventKey="Profile">Profile</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="Opportunities">Opportunities</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="Reviews">Reviews</Nav.Link>
              </Nav.Item>
            </Nav>
          </div>
        ) : (
          ""
        )}
      </Card>
      <Card>
        <Tab.Content>
          <Tab.Pane eventKey="Profile">
            <div className="profileOtherInfoSec">
              <div className="otherInfoSec">
                <h5>Availability for opportunities</h5>
                <div className="opportunitiesGroup">
                  <div className="opportunitiesSec">
                    <h4>{getOpportunityCommitTime(userData?.time_availability)} available</h4>
                    <p>Reserved for WHO opportunities</p>
                  </div>
                  <div className="whoTaskSec">
                    <p>Locked on WHO tasks</p>
                  </div>
                </div>
              </div>
              <hr className="divider" />
              <Interests1 interest={userData?.userSkill} />
              <hr className="divider" />
              <Skills1
                userSkill={userData?.userSkill}
                location={userData?.userSkill}
                endorsement={endorsement}
              />
            </div>
          </Tab.Pane>
          <Tab.Pane eventKey="Opportunities">
            {!isVisible && (
              <>
                <div className="applicationsActionGroup pt-0 pb-4 ">
                  <div className="rightButtons">
                    <Button
                      className={
                        activeButton === 1
                          ? "tickIcon primaryContainerRadiusBtn active"
                          : "btn-secondary-radius"
                      }
                      onClick={() => handleButtonClick(1)}
                    >
                      {posted ? "Posted" : "Active opportunities"}
                    </Button>
                    <Button
                      className={
                        activeButton === 2
                          ? "tickIcon primaryContainerRadiusBtn active"
                          : "btn-secondary-radius"
                      }
                      onClick={() => handleButtonClick(2)}
                    >
                      {applied ? "Applied" : "Completed"}
                    </Button>
                  </div>
                </div>
                {activeButton === 1 && (
                  <div className="recommendedSec">
                    <UserOpportunityCard
                      setIsVisible={setIsVisible}
                      opportunities={
                        posted
                          ? postedOpportunity || []
                          : filteredOpportunitiesAfter || []
                      }
                      showProfile={"activeOpportunities"}
                      showOpportunityDetails={showOpportunityDetails}
                    />
                  </div>
                )}
                {activeButton === 2 && (
                  <div className="recommendedSec">
                    <UserOpportunityCard
                      setIsVisible={setIsVisible}
                      opportunities={
                        applied
                          ? appliedOpportunity || []
                          : filteredOpportunitiesBefore || []
                      }
                      showProfile={"completedOpportunities"}
                      showOpportunityDetails={showOpportunityDetails}
                    />
                  </div>
                )}
              </>
            )}

            {isVisible && (
              <div className="oportunityDetailsPopup">
                <CloseButton
                  onClick={showOpportunityDetails}
                  className="btn-secondary-cancel-icon"
                />
                <Opportunity id={opportunityId} setIsVisible={setIsVisible} />
              </div>
            )}
          </Tab.Pane>

          <Tab.Pane eventKey="Reviews">
            <Reviews
              role={"manager"}
              userData={userData}
              activeTab={"reviews"}
              posted={posted}
            />
          </Tab.Pane>
        </Tab.Content>
      </Card>
    </Tab.Container>
  );
}

export default UserProfileData;
