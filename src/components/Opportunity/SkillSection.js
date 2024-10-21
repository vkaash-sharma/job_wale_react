import React from "react";
import { Badge } from "react-bootstrap";

const SkillSection = ({ skills, interests }) => {
  return (
    <>
      {skills && (
        <div className="skillsSec">
          <hr />
          <p className="font-bold">Skills</p>
          <div className="interestsGroup">
            {skills?.map((skillObj) => (
              <Badge key={skillObj?.skill?.id}>{skillObj?.skill?.name}</Badge>
            ))}
          </div>
        </div>
      )}
      {interests && (
        <div className="skillsSec">
          <hr />
          <p className="font-bold">Interests</p>
          <div className="interestsGroup">
            {interests?.map((skillObj) => (
              <Badge key={skillObj?.skill?.id}>{skillObj?.skill?.name}</Badge>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default SkillSection;
