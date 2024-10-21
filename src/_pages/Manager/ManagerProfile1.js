import React, { useState, useEffect, useCallback } from "react";
import { Button, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import UserProfileData1 from "_pages/User/UserProfileData1";
import { UserService } from "services/UserService/UserService";
import moment from "moment";
import { getMoreOpportunities } from "services/OpportunityServices";

function Review() {
  const currentDate = moment();
  const [endorsement, setEndorsement] = useState("");

  const [userData, setUserData] = useState();
  const [filteredOpportunitiesBefore, setFilteredOpportunitiesBefore] =
    useState([]);
  const [filteredOpportunitiesAfter, setFilteredOpportunitiesAfter] = useState(
    []
  );
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };
  //getCurrentLoggedInUser
  const getCurrentLoggedInUser = async () => {
    const response = await UserService.loggedUser();

    if (response?.status) {
      setUserData(response?.data);
      setEndorsement(response?.endorsement);
    }
  };

  const filterOpportunities = (opportunities) => {
    const beforeToday = [];
    const afterToday = [];

    opportunities.forEach((opportunity) => {
      const projectEndDate = moment(opportunity?.project_end);
      if (projectEndDate.isBefore(currentDate)) {
        beforeToday.push(opportunity);
      } else {
        afterToday.push(opportunity);
      }
    });

    setFilteredOpportunitiesBefore(beforeToday);
    setFilteredOpportunitiesAfter(afterToday);
  };

  useEffect(() => {
    getCurrentLoggedInUser();
    fetchMoreOpportunities();
  }, []);

  const fetchMoreOpportunities = useCallback(async () => {
    const response = await getMoreOpportunities("/opportunity/more");
    if (response && response?.data) {
      filterOpportunities(response?.data);
    }
  }, []);

  return (
    <>
      <div className="profileScreen wrapper">
        <Container>
          <div className="profileWrapper">
            <div className="backLargeBtn">
              <Button
                onClick={goBack}
                className="btn btn-secondary-outline backIcon"
              >
                Back to Applications
              </Button>
            </div>
            <UserProfileData1
              userData={userData}
              filteredOpportunitiesBefore={filteredOpportunitiesBefore}
              filteredOpportunitiesAfter={filteredOpportunitiesAfter}
              endorsement={endorsement}
            />
          </div>
        </Container>
      </div>
    </>
  );
}

export default Review;
