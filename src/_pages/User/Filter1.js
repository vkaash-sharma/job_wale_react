import React, { useCallback, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { connect } from "react-redux";
// import {
//   getSkills,
//   getInterest,
//   getLocation,
// } from "services/UserService/SkillInterestLocationServices";

function Filter({
  onFilterChange,
  filter,
  fetchMoreOpportunities,
  setPage,
  setHasMore,
  setMoreOpportunitiesHere,
}) {
  const [skillOptions, setSkillOptions] = useState([]);
  const [interestOptions, setInterestOptions] = useState([]);
  const [locationOptions, setLocationOptions] = useState([]);
  const filterKeyArr = [
    "location",
    "skill",
    "urgency",
    "commitment",
    "interest",
  ];
  const filterSelectBox = document.querySelectorAll(".filterSelectionBoxReset");
  const handleFilterReset = () => {
    setSelectedLocation("");
    setSelectedSkill("");
    setSelectedUrgency("");
    setSelectedCommitment("");
    setSelectedInterest("");

    onFilterChange({
      location: "",
      skill: "",
      urgency: "",
      commitment: "",
      interest: "",
    });
    // setMoreOpportunitiesHere([]);
    // setPage(1);
    setHasMore(true);
    // fetchMoreOpportunities();
    for (const key of filterKeyArr) {
      localStorage.removeItem(key);
    }
  };
  useEffect(() => {
    const { locations, interests, skills } = filter;
    setSkillOptions(skills);
    setInterestOptions(interests);
    setLocationOptions(locations);
  }, [filter]);

  const [selectedLocation, setSelectedLocation] = useState(
    localStorage.getItem("location") || ""
  );
  const [selectedSkill, setSelectedSkill] = useState(
    localStorage.getItem("skill") || ""
  );
  const [selectedUrgency, setSelectedUrgency] = useState(
    localStorage.getItem("urgency") || ""
  );
  const [selectedCommitment, setSelectedCommitment] = useState(
    localStorage.getItem("commitment") || ""
  );
  const [selectedInterest, setSelectedInterest] = useState(
    localStorage.getItem("interest") || ""
  );

  const handleFilterChange = (property, value) => {
    switch (property) {
      case "location":
        setSelectedLocation(value);
        break;
      case "skill":
        setSelectedSkill(value);
        break;
      case "urgency":
        setSelectedUrgency(value);
        break;
      case "commitment":
        setSelectedCommitment(value);
        break;
      case "interest":
        setSelectedInterest(value);
        break;
      default:
        break;
    }
    // console.log(
    //   "filterChange1111",
    //   property,
    //   value,
    //   selectedSkill,
    //   selectedLocation
    // );
    onFilterChange({
      location: property === "location" ? value : selectedLocation,
      skill: property === "skill" ? value : selectedSkill,
      urgency: property === "urgency" ? value : selectedUrgency,
      commitment: property === "commitment" ? value : selectedCommitment,
      interest: property === "interest" ? value : selectedInterest,
    });
    localStorage.setItem(property, value);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    handleFilterChange(name, value);
  };

  // Usage in your event handlers:
  // const handleLocationChange = (event) => {
  //   const locationValue = event.target.value;
  //   handleFilterChange("location", locationValue);
  //   // localStorage.setItem("location", locationValue);
  // };

  // const handleSkillChange = (event) => {
  //   const skillValue = event.target.value;
  //   handleFilterChange("skill", skillValue);
  // };

  // const handleUrgencyChange = (event) => {
  //   const urgencyValue = event.target.value;
  //   handleFilterChange("urgency", urgencyValue);
  // };

  // const handleCommitmentChange = (event) => {
  //   const commitmentValue = event.target.value;
  //   handleFilterChange("commitment", commitmentValue);
  // };

  // const handleInterestChange = (event) => {
  //   const interestValue = event.target.value;
  //   handleFilterChange("interest", interestValue);
  // };
  return (
    <>
      <div className="filterSec">
        <div className="filterAction">
          <Form.Select
            className="filterSelectBox filterSelectionBoxReset"
            onChange={handleInputChange}
            name={"location"}
            value={selectedLocation}
          >
            <option value="">Location</option>
            {Array.isArray(locationOptions) && locationOptions.length > 0 ? (
              locationOptions.map((option, index) => (
                <option key={index} value={option.label}>
                  {option.label}
                </option>
              ))
            ) : (
              <option>No Location's Found</option>
            )}
          </Form.Select>

          <Form.Select
            className="filterSelectBox filterSelectionBoxReset"
            onChange={handleInputChange}
            name={"skill"}
            value={selectedSkill}
          >
            <option value="">Skills</option>
            {Array.isArray(skillOptions) && skillOptions.length > 0 ? (
              skillOptions.map((option, index) => (
                <option key={index} value={option.label}>
                  {option.label}
                </option>
              ))
            ) : (
              <option>No Skills Found</option>
            )}
          </Form.Select>

          <Form.Select
            className="filterSelectBox filterSelectionBoxReset"
            onChange={handleInputChange}
            name={"urgency"}
            value={selectedUrgency}
          >
            <option value="">Urgency</option>
            <option value="1">Emergency opportunity</option>
            <option value="0">Not Emergency opportunity</option>
          </Form.Select>
          <Form.Select
            className="filterSelectBox filterSelectionBoxReset"
            onChange={handleInputChange}
            name={"commitment"}
            value={selectedCommitment}
          >
            <option value="">Commitment time</option>
            <option value={5}>&lt;5%</option>
            <option value={20}>20%</option>
            <option value={40}>40%</option>
            <option value={60}>60%</option>
            <option value={80}>80%</option>
            <option value={100}>100%</option>
          </Form.Select>

          <Form.Select
            className="filterSelectBox filterSelectionBoxReset"
            onChange={handleInputChange}
            name={"interest"}
            value={selectedInterest}
          >
            <option value="">Interests</option>
            {Array.isArray(interestOptions) && interestOptions.length > 0 ? (
              interestOptions.map((option, index) => (
                <option key={index} value={option.label}>
                  {option.label}
                </option>
              ))
            ) : (
              <option>No Interests Found</option>
            )}
          </Form.Select>
        </div>
        <Button
          className="btnlinkSecondary"
          variant="link"
          onClick={handleFilterReset}
          disabled={[...filterSelectBox].every(
            (filter) => filter.selectedIndex === 0
          )}
        >
          Reset filters
        </Button>
      </div>
    </>
  );
}
const mapStateToProps = (state) => ({
  filter: state.filter, // Map the 'filter' state to a prop
});

export default connect(mapStateToProps)(Filter);
