import React from "react";
import { Badge } from "react-bootstrap";

function Interests({ interest }) {
  return (
    <>
      <div className="otherInfoSec">
        <h5>Interests</h5>
        <div className="interestsGroup">
          {Array.isArray(interest) && interest?.length > 0 ? (
            interest?.map((userInterest) => {
              if (userInterest?.type === "interest") {
                return (
                  <Badge key={userInterest?.id}>
                    {" "}
                    {userInterest?.skillInterest?.name}
                  </Badge>
                );
              }
              return null;
            })
          ) : (
            <p>No interest</p>
          )}
        </div>
      </div>
    </>
  );
}

export default Interests;
