import { Card, Col, Container, Nav, Row, Tab } from "react-bootstrap";
import "../../Assets/Styles/profile.scss";
import "../../Assets/Styles/dashboard.scss";
import Skills1 from "./Skills1";
import Interests1 from "./Interests1";
import Recommended1 from "./Recommended1";
import { useState, useEffect, useCallback } from "react";
import { UserService } from "../../services/UserService/UserService";
import DashboadProfile from "components/Dashboard/DashboadProfile";
import {
  allAppliedOpportunity,
  getRecommendedOpportunities,
} from "services/OpportunityServices";
import AppliedOpportunities from "./Opportunities/AppliedOpportunities";
import { setRole } from "redux/actions/RoleAction";
import { connect } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Reviews from "components/Review/Reviews";
import {getOpportunityCommitTime} from "_helpers/helper";

function UserDashboard1({ dispatch }) {
  const [userData, setUserData] = useState({});
  const [endorsement, setEndorsement] = useState("");

  const [appliedOpportunities, setAppliedOpportunities] = useState([]);

  // Get the current URL with query params.
  const currentUrl = window.location.href;
  const url = new URL(currentUrl);
  const tabValue = url.searchParams.get("tab");
  const [activeTab, setActiveTab] = useState(
    tabValue ? tabValue : "recommended"
  );

  const getUser = async () => {
    const response = await UserService.loggedUser();
    if (response?.status) {
      setUserData(response?.data);
      setEndorsement(response?.endorsement);
    }
  };

  useEffect(() => {
    getUser();
  }, [activeTab]);

  useEffect(() => {
    dispatch(setRole("user"));
  }, [dispatch]);
  const getAppliedOpportunity = useCallback(async (status) => {
    let response = await allAppliedOpportunity("type=" + status);
    if (response && response.status && Array.isArray(response?.data)) {
      setAppliedOpportunities(response?.data);
    }
  }, []);

  const handleTabSelect = (selectedTab) => {
    setActiveTab(selectedTab);
  };

  useEffect(() => {
    window.history.pushState(
      {},
      null,
      activeTab ? `?tab=${activeTab.toLocaleLowerCase()}` : ""
    );
  }, [activeTab]);

  // For Recommended Opportunities
  const [recommendedOpportunities, setRecommendedOpportunities] = useState([]);
  const fetchRecommendedOpportunities = useCallback(async () => {
    const response = await getRecommendedOpportunities();
    if (response && response?.data) {
      setRecommendedOpportunities(response?.data);
    }
  }, []);

  return (
    <>
      <div className="dashboardScreen wrapper">
        <Container>
          <Row>
            <Col lg="4">
              <DashboadProfile userData={userData} />

              <div className="profileOtherInfoSec">
                <hr className="divider" />
                <div className="otherInfoSec">
                  <h5>Availability for opportunities</h5>
                  <div className="opportunitiesGroup">
                    <div className="opportunitiesSec w-100">
                      <h4>{getOpportunityCommitTime(userData?.time_availability)} available</h4>
                      <p>Reserved for WHO opportunities</p>
                    </div>
                  </div>
                </div>
                <hr className="divider" />
                <Interests1 interest={userData?.userSkill} />
                <hr className="divider" />
                <Skills1
                  userSkill={userData?.userSkill}
                  endorsement={endorsement}
                />
              </div>
            </Col>
            <Col lg="8">
              <div className="dashboardMainData ">
                <Tab.Container defaultActiveKey={activeTab}>
                  <div className="whoopCustomTab ">
                    <Nav variant="pills" justify onSelect={handleTabSelect}>
                      <Nav.Item>
                        <Nav.Link eventKey="recommended">Recommended</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="opportunities">
                          Opportunities
                        </Nav.Link>
                      </Nav.Item>
                      {/* <Nav.Item>
                      <Nav.Link eventKey="Wishlist">Wishlist</Nav.Link>
                    </Nav.Item> */}
                      <Nav.Item>
                        <Nav.Link eventKey="reviews">Reviews</Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </div>

                  <Tab.Content className="mt-4 employee-tabs">
                    <Tab.Pane eventKey="recommended">
                      <Recommended1
                        opportunities={recommendedOpportunities}
                        fetchRecommendedOpportunities={
                          fetchRecommendedOpportunities
                        }
                        userData={userData}
                      />
                    </Tab.Pane>

                    <Tab.Pane eventKey="opportunities">
                      <AppliedOpportunities
                        role={"user"}
                        opportunities={appliedOpportunities}
                        getAppliedOpportunity={getAppliedOpportunity}
                        activeTab={activeTab}
                      />
                    </Tab.Pane>
                    {/* <Tab.Pane eventKey="Wishlist">
                    <Wishlist />
                  </Tab.Pane> */}
                    <Tab.Pane eventKey="reviews">
                      <Card>
                        <div className="recommendedSec">
                          <div className="cardTitle">
                            <h2>Reviews</h2>
                            <p className="font-size-sm">
                              See reviews you received as well as the ones you
                              sent to others
                            </p>
                          </div>
                          <Reviews
                            role={"user"}
                            userData={userData}
                            activeTab={activeTab}
                            posted={1}
                          />
                        </div>
                      </Card>
                    </Tab.Pane>
                  </Tab.Content>
                </Tab.Container>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

// export default UserDashboard1;
export default connect(null, { dispatch: setRole })(UserDashboard1);
