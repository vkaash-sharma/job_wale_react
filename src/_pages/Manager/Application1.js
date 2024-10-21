import { fullName } from "_helpers/helper";
import React, { useCallback, useEffect, useState } from "react";
import { Button, Card, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getApplication } from "services/ApplicationService";
import { setApplicationStatus } from "services/ManagerServices/ApplicationStatusHandle";
import toastr from "toastr";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

function Applications({ activeTab }) {
  const [applications, setApplications] = useState("");

  const getAppliedApplication = useCallback(async () => {
    let response = await getApplication();
    if (response && response.status) {
      setApplications(response?.data);
    }
  }, []);

  useEffect(() => {
    if (activeTab === "applications") {
      getAppliedApplication();
    }
  }, [getAppliedApplication, activeTab]);

  const handleStatusConfirm = useCallback((e, id, status) => {
    e.preventDefault();
    confirmAlert({
      title: "Application",
      message: `Do you want to ${status}?`,
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            let response = await setApplicationStatus(id, status);
            if (response?.status) {
              getAppliedApplication();
              return toastr.info(response.message || status + "ed");
            } else if (response?.message) {
              return toastr.info(response.message);
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
      <div className="recommendedSec">
        <div className="applicationsGroup">
          {Array.isArray(applications) && applications.length > 0 ? (
            applications?.map((application) => (
              <Card key={application?.id} className="instanceGreyCard">
                <div className="applicationsInner">
                  <Link to={`/applicant/profile/${application?.user.id}`}>
                    <div className="userProfileSec" key={application?.id}>
                      <div className="profilePic">
                        <Image
                          src={
                            application.user.profilePicture ||
                            require("../../Assets/Images/user-default.png")
                          }
                          roundedCircle
                          alt="user-pic"
                        />
                        <p>{fullName(application?.user)}</p>
                      </div>

                      <div className="buttonActionGroup">
                        <button
                          label="yes"
                          variant="link"
                          className="tickIconBtn"
                          onClick={(e) => {
                            handleStatusConfirm(e, application?.id, "accept");
                          }}
                        >
                          {/* Verify */}
                        </button>
                        <button
                          label="No"
                          variant="link"
                          className="closeIconBtn"
                          onClick={(e) => {
                            handleStatusConfirm(e, application?.id, "reject");
                          }}
                        >
                          {/* Remove */}
                        </button>
                      </div>
                    </div>
                  </Link>

                  <div className="appliedInfoSec">
                    <span className="font11">Applied for</span>
                    <h6>{application?.opportunityDetails?.opportunity_name}</h6>
                    <p class="truncate-lines">
                      {application?.opportunityDetails?.opportunity_desc}
                    </p>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <p>No Applications...</p>
          )}
        </div>
      </div>
    </>
  );
}

export default Applications;
