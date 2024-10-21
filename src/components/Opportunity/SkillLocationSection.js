const SkillLocationSection = ({ title, type, userSkills }) => {
  const filteredSkills = userSkills?.filter((skill) => skill?.type === type);

  return (
    <div className="otherInfoSec">
      <h5>{title}</h5>
      <div className="skillsGroup">
        <ul>
          {Array.isArray(filteredSkills) && filteredSkills.length > 0 ? (
            filteredSkills.map((skill, i) => (
              <li key={skill.id}>
                <label>{skill?.skillInterest?.name}</label>
              </li>
            ))
          ) : (
            <p>{`No ${title.toLowerCase()} added`}</p>
          )}
        </ul>
      </div>
    </div>
  );
};
export default SkillLocationSection;
