import { fullName } from "_helpers/helper";
import React, { useEffect, useState } from "react";
import { Button, Image } from "react-bootstrap";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { Link, useNavigate } from "react-router-dom";

const DashboadProfile = ({ manager, userData }) => {
  const navigate = useNavigate();
  const [showSkeleton, setShowSkeleton] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSkeleton(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      <div className="profileShortInfoSec">
        <div className="profilePic">
          <Image
            roundedCircle
            src={
              userData?.profilePicture ||
              require("../../Assets/Images/user-default.png")
            }
            alt="profile-pic"
          />

          <div className="pInfo">
            <h6>{fullName(userData)}</h6>
            <p className="font11">{userData?.profile_title}</p>
          </div>
        </div>
        {showSkeleton ? (
          <p>
            <Skeleton count={5} />
          </p>
        ) : (
          <p className="profileShortDesc">
            {userData?.profile_desc ? userData?.profile_desc : ""}
          </p>
        )}
        <div className="buttonGroup">
          {!manager && (
            <Link
              to="/user/edit"
              className={`btn ${
                userData?.isCompleted === 0
                  ? "btn-primary-radius "
                  : "btn-secondary-outline"
              }`}
            >
              {/* bg-success text-white */}
              Edit profile
            </Link>
          )}
          {manager ? (
            <Button
              className="btn btn-secondary-outline"
              onClick={() => {
                navigate("/user/dashboard", { replace: true });
              }}
            >
              Switch to User
            </Button>
          ) : (
            <Button
              className="btn btn-secondary-outline"
              onClick={() => {
                navigate("/manager/dashboard", { replace: true });
              }}
            >
              Switch to Manager
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default DashboadProfile;
