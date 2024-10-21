import { fullName } from "_helpers/helper";
import React from "react";
import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";

const ReviewsToDO = ({ todos, role, type }) => {
  return (
    <div className="reviewsGroup">
      {Array.isArray(todos) && todos.length > 0 ? (
        todos.map((todo, i) => (
          <div className="reviewCard" key={i}>
            <Link
              to={`/applicant/profile/${
                todo?.userDetails?.id || todo?.user?.id
              }`}
            >
              <Image
                roundedCircle
                src={
                  role === "user"
                    ? todo?.managerDetails?.profilePicture
                    : todo?.userDetails?.profilePicture ||
                      todo?.user?.profilePicture ||
                      require("../../Assets/Images/user-default.png")
                }
                alt="profile-pic"
              />
            </Link>
            <div className="reviewData reviewBlankSec">
              <div>
                <p className="userName">
                  {" "}
                  {role === "user"
                    ? fullName(todo?.managerDetails)
                    : fullName(todo?.userDetails || todo?.user)}
                </p>
                <p className="userProfession">
                  {" "}
                  {role === "user"
                    ? todo?.managerDetails?.profile_title
                    : todo?.userDetails?.profile_title}
                </p>
              </div>
              {todo?.user?.userFeedbackDetails[0]?.manager_review_status ? (
                ""
              ) : (
                <Link
                  className="btn-secondary-outline sendIcon"
                  to={`/${role}/feedback/${todo?.opportunity_id}?role=${role}`}
                  state={todo}
                >
                  Write feedback
                </Link>
              )}
            </div>
          </div>
        ))
      ) : (
        <p className="userName">{type !== "completed" && "No to do..."}</p>
      )}
    </div>
  );
};

export default ReviewsToDO;
