import React, { useCallback, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import UserProfileData from "_pages/User/UserProfileData1";
import { getApplicantById } from "services/ApplicationService";
import {
  GetPostedOpportunities,
  getAppliedOpportunities,
} from "services/ManagerServices/ApplicantProfileHandle";

function ApplicantProfile() {
  const { id } = useParams();
  const [userData, setUserData] = useState();
  const [endorsement, setEndorsement] = useState("");

  const getProfileDetails = useCallback(async () => {
    let response = await getApplicantById(id);
    if (response && response.status) {
      setUserData(response.data);
      setEndorsement(response?.endorsement);
    }
  }, [id]);
  useEffect(() => {
    getProfileDetails();
  }, [getProfileDetails]);

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const [postedOpportunity, setPostedOpportunity] = useState([]);
  const fetchPostedOpportunities = useCallback(async (id) => {
    const response = await GetPostedOpportunities(id);
    if (response && response?.data) {
      setPostedOpportunity(response?.data);
    }
  }, []);

  const [appliedOpportunity, setAppliedOpportunity] = useState([]);
  const fetchAppliedOpportunities = useCallback(async (id) => {
    const response = await getAppliedOpportunities(id);
    if (response && response?.data) {
      setAppliedOpportunity(response?.data);
    }
  }, []);

  useEffect(() => {
    fetchAppliedOpportunities(id);
    fetchPostedOpportunities(id);
  }, []);

  return (
    <>
      <div className="profileScreen wrapper">
        <Container>
          <div className="profileWrapper">
            <div className="backLargeBtn">
              <Link
                onClick={goBack}
                className="btn btn-secondary-outline backIcon"
              >
                Back to Applications
              </Link>
            </div>
            <UserProfileData
              userData={userData}
              postedOpportunity={postedOpportunity}
              appliedOpportunity={appliedOpportunity}
              endorsement={endorsement}
              posted={1}
              applied={1}
            />
          </div>
        </Container>
      </div>
    </>
  );
}

export default ApplicantProfile;
