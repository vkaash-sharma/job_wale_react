import { useCallback, useEffect, useState } from "react";
import Reviews from "../../components/Review/Reviews";
import OpportunitiesList1 from "./OpportunitiesList1";
import DashboadProfile from "components/Dashboard/DashboadProfile";
import { Card, Col, Container, Image, Nav, Row, Tab } from "react-bootstrap";
import { UserService } from "services/UserService/UserService";
import Applications1 from "./Application1";
import moment from "moment";
import { getMoreOpportunities } from "services/OpportunityServices";
import {
  GetActiveMngOpportunities,
  GetCompletedMngOpportunities,
} from "services/ManagerServices/GetMngOpportunities";
import { setRole } from "redux/actions/RoleAction";
import { connect } from "react-redux";

function ManagerDashboard1({ dispatch }) {
  const currentDate = moment();
  const [userData, setUserData] = useState({});

  const getuser = async () => {
    const response = await UserService.loggedUser();
    if (response?.status) {
      setUserData(response?.data);
    }
  };

  useEffect(() => {
    dispatch(setRole("manager"));
  }, [dispatch]);

  useEffect(() => {
    getuser();
  }, []);

  // Get the current URL with query params.
  const currentUrl = window.location.href;
  const url = new URL(currentUrl);
  const tabValue = url.searchParams.get("tab");

  const [activeTab, setActiveTab] = useState(tabValue ? tabValue : "active");
  const handleTabSelect = (selectedTab) => {
    setActiveTab(selectedTab);
  };
  useEffect(() => {
    window.history.pushState({}, null, activeTab ? `?tab=${activeTab}` : "");
  }, [activeTab]);

  const [activeMngOpportunities, setActiveMngOpportunities] = useState([]);
  const getActiveOpportunitiesByMng = useCallback(async () => {
    let response = await GetActiveMngOpportunities();
    if (response && response.status) {
      setActiveMngOpportunities(response?.data);
    }
  }, []);

  const [completedMngOpportunities, setCompletedMngOpportunities] = useState(
    []
  );
  const getCompleteOpportunitiesByMng = useCallback(async () => {
    let response = await GetCompletedMngOpportunities();
    if (response && response.status) {
      setCompletedMngOpportunities(response?.data);
    }
  }, []);

  useEffect(() => {
    if (activeTab === "active") {
      getActiveOpportunitiesByMng();
    } else if (activeTab === "completed") {
      getCompleteOpportunitiesByMng();
    }
  }, [getActiveOpportunitiesByMng, getCompleteOpportunitiesByMng, activeTab]);

  return (
    <>
      <div className="dashboardScreen wrapper">
        <Container>
          <Row>
            <Col lg="4">
              <DashboadProfile manager userData={userData} />
              <hr className="manager-divider" />
            </Col>

            <Col lg="8" className="dashboardMainData">
              <Tab.Container defaultActiveKey={activeTab}>
                <div className="whoopCustomTab">
                  <Nav variant="pills" justify onSelect={handleTabSelect}>
                    <Nav.Item>
                      <Nav.Link eventKey="active">Active</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="completed">Completed</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="applications">Applications</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="reviews">Reviews</Nav.Link>
                    </Nav.Item>
                  </Nav>
                </div>

                <Tab.Content className="mt-4">
                  <Tab.Pane eventKey="active">
                    <OpportunitiesList1
                      opportunities={activeMngOpportunities}
                      getActiveOpportunitiesByMng={getActiveOpportunitiesByMng}
                      tabView={"active"}
                    />
                  </Tab.Pane>
                  <Tab.Pane eventKey="completed">
                    <OpportunitiesList1
                      opportunities={completedMngOpportunities}
                      getActiveOpportunitiesByMng={getActiveOpportunitiesByMng}
                      tabView={"completed"}
                    />
                  </Tab.Pane>
                  <Tab.Pane eventKey="applications">
                    <Card>
                      <div className="cardTitle">
                        <h2>People who applied</h2>
                        <p className="font-size-sm">
                          See if they are a good fit and accept or decline their
                          application
                        </p>
                      </div>
                      <Applications1 activeTab={activeTab} />
                    </Card>
                  </Tab.Pane>
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
                          role={"manager"}
                          userData={userData}
                          activeTab={activeTab}
                        />
                      </div>
                    </Card>
                  </Tab.Pane>
                </Tab.Content>
              </Tab.Container>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

// export default ManagerDashboard1;
export default connect(null, { dispatch: setRole })(ManagerDashboard1);
