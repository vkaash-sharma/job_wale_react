import { Badge, Button, Card, Col, Image, Row } from "react-bootstrap";
import { useNavigate } from "react-router";
import { activeTeamsById, applyOpportunity, completedTeamsById, opportunitiesById } from "services/OpportunityServices";
import { useCallback, useEffect, useState } from "react";
import { DDMMMYYYYFormat, YYYYMMDDHHMMSSFormat, auth_user, fullName, getOpportunityCommitTime } from "_helpers/helper";
import toastr from "toastr";
import SkillSection from "../../../components/Opportunity/SkillSection";
import TeamView from "components/Opportunity/TeamView";
import { confirmAlert } from "react-confirm-alert";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
/* eslint-disable react/prop-types */
function Opportunity({ id, setIsVisible, apply, tabView, role }) {
  const [opportunity, setOpportunity] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [teams, setTeams] = useState("");

  // const { id } = useParams();
  const navigate = useNavigate();

  const goToEditProfile = () => {
    navigate("/user/edit");
  };
  const authUser = auth_user();

  const getSkill = (skillKey) => {
    const skillSet = opportunity?.opportunitySkill?.filter((value) => value?.type === skillKey)?.map((skill) => skill);
    return skillSet;
  };

  const getOpportunitiesById = useCallback(async () => {
    let response = await opportunitiesById(id);
    if (response && response.status) {
      setOpportunity(response.data);
    }
  }, [id]);

  const getTeamsById = useCallback(async () => {
    let response = await completedTeamsById(id);
    if (response && response.status) {
      setTeams(response?.data);
    }
  }, [id]);
  const getActiveTeamsById = useCallback(async () => {
    let response = await activeTeamsById(id);
    if (response && response.status) {
      setTeams(response?.data);
    }
  }, [id]);

  useEffect(() => {
    if (tabView === "active") getActiveTeamsById();
  }, [getActiveTeamsById, tabView]);

  useEffect(() => {
    if (tabView === "completed") getTeamsById();
  }, [getTeamsById, tabView]);
  useEffect(() => {
    getOpportunitiesById();
  }, [getOpportunitiesById]);
  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    confirmAlert(
      !authUser.isCompleted
        ? // ? {
          //     title: "Incomplete Profile!",
          //     message: "Complete your profile to apply",
          //     buttons: [
          //       {
          //         label: "Complete",
          //         onClick: goToEditProfile,
          //       },
          //       // {
          //       //   label: "No",
          //       //   onClick: () => {},
          //       // },
          //     ],
          //   }
          {
            customUI: ({ onClose }) => {
              return (
                <div className="custom-ui-error">
                  <div className="error-icon">&#9888;</div>
                  <h1>Incomplete Profile!</h1>
                  <p className="error-message">Complete your profile to apply.</p>
                  <Button
                    onClick={() => {
                      onClose();
                      goToEditProfile();
                    }}>
                    Complete profile
                  </Button>
                </div>
              );
            },
          }
        : {
            title: "Application",
            message: "Do you want to apply?",
            buttons: [
              {
                label: "Yes",
                onClick: async () => {
                  const formData = {
                    opportunity_id: opportunity.id,
                    project_start: YYYYMMDDHHMMSSFormat(opportunity.project_start),
                    project_end: YYYYMMDDHHMMSSFormat(opportunity.project_end),
                  };
                  let response = await applyOpportunity(formData);

                  if (!response?.status) {
                    toastr.error(response?.message || "something went wrong");
                    return;
                  } else {
                    toastr.success(response?.message || "successfully applied");
                    setIsVisible(false);
                  }
                  setIsLoading(false);
                },
              },
              {
                label: "No",
                onClick: () => {},
              },
            ],
          }
    );
    setIsLoading(false);
  };
  const hasGlobal = (getSkill("location") || []).some((value) => value?.skill?.name.toLowerCase().includes("global".toLowerCase()));

  return (
    <div className="opportunityDetails">
      {/* <Container>
          <Row>
            <Col lg="4" className="pt-4">
              <RelatedOpportunities />
            </Col>
            <Col lg="8">
              <Filter /> */}
      <Card>
        <div className="opportunityDetailSec">
          <div className="cardTitle">
            <div className="dataSec">
              <h2>{opportunity?.opportunity_name}</h2>
              {hasGlobal && <span className="instanceGreyBtn globalBtn">Global</span>}
              <span className="instanceGreyBtn remoteBtn">{opportunity?.engagement_type}</span>
              <Link to={`/manager/profile/` + opportunity?.userId}>
                <div className="profilePic">
                  <Image roundedCircle src={opportunity?.user?.profilePicture || require("../../../Assets/Images/user-default.png")} alt="profile-pic" />
                  <p>{fullName(opportunity?.user)}</p>
                </div>
              </Link>
            </div>
            {apply && (
              <div className="titleActionSec">
                {Array.isArray(opportunity?.opportunitiesAppliedData) && opportunity?.opportunitiesAppliedData.length !== 0 ? (
                  <Badge bg="primary">Applied</Badge>
                ) : (
                  <Button onClick={(e) => onSubmit(e)} disabled={isLoading || opportunity.userId === authUser.id} className={opportunity.userId === authUser.id && "btn btn-secondary"}>
                    Apply
                  </Button>
                )}
              </div>
            )}
          </div>

          <div className="opportunityShortDetails">
            <Row xs={1} md={2} lg={3} xl={5}>
              <Col xs={12} md={6} lg={4} xl={2}>
                <label className="font-size-sm">Urgency:</label>
                <p className={opportunity?.emg_opportunity ? "text-danger font-size-sm" : "text-primary font-size-sm"}>{opportunity?.emg_opportunity ? "Urgent" : "Not urgent"}</p>
              </Col>
              <Col xs={12} md={6} lg={4} xl={3}>
                <label className="font-size-sm">Recruit Period:</label>
                <p className="font-size-sm">
                  <span className="text-unbreak">{DDMMMYYYYFormat(opportunity?.recruit_start)}</span> - <span className="text-unbreak">{DDMMMYYYYFormat(opportunity?.recruit_end)}</span>
                </p>
              </Col>
              <Col xs={12} md={6} lg={4} xl={3}>
                <label className="font-size-sm">Project Period:</label>
                <p className="font-size-sm">
                  <span className="text-unbreak">{DDMMMYYYYFormat(opportunity?.project_start)}</span> - <span className="text-unbreak">{DDMMMYYYYFormat(opportunity?.project_end)}</span>
                </p>
              </Col>
              <Col xs={12} md={6} lg={4} xl={2}>
                <label className="font-size-sm">Location:</label>
                {Array.isArray(getSkill("location")) &&
                  getSkill("location")?.map((location) => (
                    <p key={location.id} className="font-size-sm mb-0">
                      {location?.skill?.name}
                    </p>
                  ))}
              </Col>
              <Col xs={12} md={6} lg={4} xl={2}>
                <label className="font-size-sm sm-mt-1">Commitment level:</label>
                <div className="commitment">{getOpportunityCommitTime(opportunity?.commit_time)} commitment</div>
              </Col>
            </Row>
          </div>

          <p>{opportunity?.opportunity_desc}</p>
        </div>

        <SkillSection skills={getSkill("skill")} interests={getSkill("interest")} />
        {tabView === "completed" && <TeamView status="completed" applications={teams} />}
        {tabView === "active" && <TeamView status="active" applications={teams} getActiveTeamsById={getActiveTeamsById} />}
      </Card>
      {/* </Col>
          </Row>
        </Container> */}
    </div>
  );
}
const mapStateToProps = (state) => ({
  role: state.role.role.role,
});

// export default Opportunity;
export default connect(mapStateToProps)(Opportunity);
