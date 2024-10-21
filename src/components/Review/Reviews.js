import { fullName } from "_helpers/helper";
import React, { useCallback, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Stars from "./ReviewStarts";
import { Link } from "react-router-dom";
import ReviewTab from "./ReviewTab";
import ReviewsToDO from "./ReviewsToDO";
import { getAllTodos } from "services/TodoServices";
import { getAllReviews } from "services/ReviewServices";

function Reviews({ role, posted, activeTab }) {
  const [allTodos, setAllTodos] = useState("");
  const [reviews, setReviews] = useState("");

  const getAllTodosHere = useCallback(async () => {
    let response = await getAllTodos(role);
    if (response && response.status) {
      setAllTodos(response?.data);
    }
  }, []);

  useEffect(() => {
    if (activeTab === "reviews") getAllTodosHere();
  }, [activeTab]);
  const [activeButton, setActiveButton] = useState(posted !== 1 ? 1 : 2);

  const getAllReviewsData = useCallback(async (todoType) => {
    let response = await getAllReviews(role, todoType);
    if (response && response.status) {
      setReviews(response?.data);
    }
  }, []);

  useEffect(() => {
    if (activeButton === 1) {
      getAllTodosHere();
    } else if (activeButton === 2) {
      getAllReviewsData("received");
    } else if (activeButton === 3) {
      getAllReviewsData("sent");
    }
  }, [activeButton, role]);

  const handleButtonClick = (buttonNumber) => {
    setActiveButton(buttonNumber);
  };

  const currentUrl = window.location.pathname;
  const [feedbackURL, setFeedbackURL] = useState();

  useEffect(() => {
    let newFeedbackURL = "/user/feedback";

    if (currentUrl === "/manager/dashboard") {
      newFeedbackURL = "/manager/feedback";
    }

    setFeedbackURL(newFeedbackURL);
  }, [currentUrl]);

  return (
    <>
      <div className="applicationsActionGroup">
        <div className="rightButtons">
          {posted !== 1 && (
            <Button
              className={
                activeButton === 1
                  ? "tickIcon primaryContainerRadiusBtn active"
                  : "btn-secondary-radius"
              }
              onClick={() => handleButtonClick(1)}
            >
              To do
            </Button>
          )}
          <Button
            className={
              activeButton === 2
                ? "tickIcon primaryContainerRadiusBtn active"
                : "btn-secondary-radius"
            }
            onClick={() => handleButtonClick(2)}
          >
            Received
          </Button>
          <Button
            className={
              activeButton === 3
                ? "tickIcon primaryContainerRadiusBtn active"
                : "btn-secondary-radius"
            }
            onClick={() => handleButtonClick(3)}
          >
            Sent
          </Button>
        </div>
      </div>
      {/* For TODO */}
      {activeButton === 1 && posted !== 1 && (
        <ReviewsToDO todos={allTodos} role={role} feedbackURL={feedbackURL} />
      )}

      {/* For Received */}
      {activeButton === 2 && (
        <ReviewTab reviews={reviews} role={role} type={"receive"} />
      )}

      {/* For Sent */}
      {activeButton === 3 && (
        <ReviewTab reviews={reviews} role={role} type={"sent"} />
      )}
    </>
  );
}

export default Reviews;
