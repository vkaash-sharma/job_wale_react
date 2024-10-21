import SkillLocationSection from "components/Opportunity/SkillLocationSection";
import React from "react";

function Skills({ userSkill, endorsement, location }) {
  return (
    <>
      <SkillLocationSection
        title="Skills"
        type="skill"
        userSkills={userSkill}
      />
      <hr className="divider" />
      <SkillLocationSection
        title="Locations"
        type="location"
        userSkills={userSkill}
      />
      <hr className="divider" />

      <div className="otherInfoSec">
        <h5 className="mb-2">Endorsements</h5>
        <p className="subtitle">
          Skills that were previously demonstrated on finished opportunities.
        </p>
        <div className="skillsGroup">
          <ul className="endorsements">
            {endorsement && Object.keys(endorsement).some((value) => value)
              ? Object.keys(endorsement)?.map((key) => {
                  const value = endorsement[key];
                  return (
                    <li key={key}>
                      <label>{key}</label>
                      <span>{value ? value : 0} whoops</span>
                    </li>
                  );
                })
              : "No endorsements"}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Skills;
