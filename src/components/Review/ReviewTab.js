import React from "react";
import Stars from "./ReviewStarts";
import { fullName } from "_helpers/helper";
import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";

const ReviewTab = ({ reviews, role, type }) => {
  return (
    <div className="reviewsGroup">
      {Array.isArray(reviews) &&
        reviews.length > 0 &&
        reviews.map((review, i) => (
          <div className="reviewCard" key={i}>
            <Link
              to={`/applicant/profile/${
                role === "user"
                  ? review?.managerDetails?.id
                  : review?.userDetails?.id
              }`}
            >
              <Image
                roundedCircle
                src={
                  (role === "user"
                    ? review?.managerDetails?.profilePicture
                    : review?.userDetails?.profilePicture) ||
                  require("../../Assets/Images/user-default.png")
                }
                alt="profile-pic"
              />
            </Link>
            <div className="reviewData">
              <p className="userName">
                {role === "user"
                  ? fullName(review?.managerDetails)
                  : fullName(review?.userDetails)}
              </p>
              <p className="userProfession">
                {role === "user"
                  ? review?.managerDetails?.profile_title
                  : review?.userDetails?.profile_title}
              </p>

              {(role === "user" || role === "manager") && (
                <>
                  <div className="ratingSec">
                    {type === "sent" &&
                      ((role === "user" && review?.user_star_rating) ||
                        (role === "manager" &&
                          review?.manager_star_rating)) && (
                        <Stars
                          value={
                            role === "user"
                              ? review?.user_star_rating
                              : review?.manager_star_rating
                          }
                        />
                      )}

                    {type !== "sent" &&
                      ((role === "user" && review?.manager_star_rating) ||
                        (role === "manager" && review?.user_star_rating)) && (
                        <Stars
                          value={
                            role === "user"
                              ? review?.manager_star_rating
                              : review?.user_star_rating
                          }
                        />
                      )}
                  </div>
                  <p>
                    {type === "sent"
                      ? role === "user"
                        ? review?.user_review_desc
                        : review?.manager_review_desc
                      : role === "user"
                      ? review?.manager_review_desc
                      : review?.user_review_desc}
                  </p>
                </>
              )}
            </div>
          </div>
        ))}

      {Array.isArray(reviews) && reviews?.length === 0 && (
        <div className="reviewCard">
          <div className="reviewData reviewBlankSec">
            <div>
              <p className="userName"> No reviews...</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewTab;
