import { fullName } from "_helpers/helper";
import ReviewsToDO from "components/Review/ReviewsToDO";
import React, { useCallback, useState } from "react";
import { Badge, Card, Col, Image, Row } from "react-bootstrap";
import { confirmAlert } from "react-confirm-alert";
import { Link } from "react-router-dom";
import { setApplicationStatus } from "services/ManagerServices/ApplicationStatusHandle";
import toastr from "toastr";

const TeamView = ({ status, applications, getActiveTeamsById }) => {
  //   const [applications, setApplications] = useState("");
  const appliedLabel = ["Applied", "Accepted", "Not Selected", "In Progress", "Completed"];
  // const [applications, setApplications] = useState("");
  // const getApplication = useCallback(async () => {
  //   let response = await getApplicantById(id);
  //   if (response && response.status) {
  //     setUserData(response.data);
  //   }
  // }, [id]);

  const handleStatusConfirm = useCallback((e, id, status) => {
    e.preventDefault();
    console.log("status", status);
    confirmAlert({
      title: "Application",
      message: `Do you want to ${status}?`,
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            let response = await setApplicationStatus(id, status);
            if (response?.status) {
              getActiveTeamsById();
              toastr.info(response.message || status + "ed");
            } else if (response?.message) {
              toastr.info(response.message);
            }
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  }, []);
  return (
    <>
      {/* <Card className="interestsGroup reviewCard"> */}
      {/* <div className="interestsGroup">
          <Badge>Teams</Badge>
        </div> */}
      {/* {status === "active" && (
        <div className="interestsGroup">
          <Col md={6}>
            <Badge>Teams</Badge>
          </Col>
        </div>
      )} */}
      {Array.isArray(applications) && applications.length > 0 && (
        <div className="reviewsGroup">
          <div className="skillsSec">
            {/* {status !== "completed" &&  */}
            <p className="font-bold">Teams</p>
            {/* } */}
          </div>

          {status === "active" &&
            Array.isArray(applications) &&
            applications.length > 0 &&
            applications?.map((application) => (
              <div key={application?.id} className="reviewCard">
                <div className="reviewCard pt-5">
                  <Link to={`/applicant/profile/${application?.user?.id}`}>
                    <Image src={application?.user?.profilePicture || require("../../Assets/Images/user-default.png")} roundedCircle alt="user-pic" />
                  </Link>
                </div>
                <div className="reviewData reviewBlankSec">
                  <p>{fullName(application?.user)}</p>
                  {application?.opp_status === 0 && (
                    <div className="buttonActionGroup">
                      <Link
                        label="yes"
                        variant="link"
                        className="tickIconBtn"
                        onClick={(e) => {
                          handleStatusConfirm(e, application?.id, "accept");
                        }}>
                        Verify
                      </Link>
                      <Link
                        label="No"
                        variant="link"
                        className="closeIconBtn"
                        onClick={(e) => {
                          handleStatusConfirm(e, application?.id, "reject");
                        }}>
                        Remove
                      </Link>
                    </div>
                  )}
                  {application?.opp_status > 0 && <div md={4}>{appliedLabel[application?.opp_status]}</div>}
                </div>
              </div>
            ))}

          {status === "completed" && (
            <>
              <ReviewsToDO todos={applications} feedbackURL={"/manager/feedback"} role={"manager"} type="completed" />
            </>
          )}
        </div>
      )}
      {/* </Card> */}
    </>
  );
};

export default TeamView;



