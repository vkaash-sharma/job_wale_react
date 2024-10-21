import React, { useCallback, useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css";
import RangeSlider from "react-bootstrap-range-slider";
import Select from "react-select";
import { initialForm, rules } from "./DATA";
import { Validation } from "_helpers/Validation/Validation";
import InputError from "components/Form/InputError/InputError";
import { createOpportunity } from "services/OpportunityServices";
import toastr from "toastr";

import { connect } from "react-redux";

function CreateOpportunity({ role, filter }) {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState({});
  const [skillOptions, setSkillOptions] = useState([]);
  const [location, setLocation] = useState([]);
  const [interestOptions, setInterestOptions] = useState([]);

  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [charCount, setCharCount] = useState(0);
  const totalCount = 2024;

  /* Handle Engagement Button Click */
  const handleEngagementClick = (engagementType) => {
    if (engagementType) setForm((prev) => ({ ...prev, engagementType }));
  };

  const goBack = () => {
    navigate(-1);
  };

  const onChange = ({ target: { name, type, checked, value } }) => {
    if (name === "description") {
      setCharCount(value?.length);
    }
    console.log(name, value);
    setForm((prev) => {
      const data = { ...prev, [name]: type === "checkbox" ? checked : value };

      return data;
    });
  };

  useEffect(() => {
    const { locations, interests, skills } = filter;
    setSkillOptions(skills);
    setInterestOptions(interests);
    setLocation(locations);
  }, [filter]);

  const onChangeMultiSelect = (e, name) => {
    // Extract the "value" property from each object in the array
    const selectedValues = e.map((item) => item.value);

    setForm((prev) => {
      return {
        ...prev,
        [name]: selectedValues, // Update the specific form field with the array of selected values
      };
    });
  };
  const removeValue = (name, valueToRemove) => {
    setForm((prev) => ({
      ...prev,
      [name]: prev[name]?.filter((value) => value !== valueToRemove),
    }));
  };

  const checkValidation = useCallback(() => {
    /**call validation file for validation */

    let errorObj = Validation(form, rules);
    if (form.location.length === 0) {
      errorObj.location = "Location is required.";
    }
    if (form.skills.length === 0) {
      errorObj.skills = "Skill is required.";
    }
    if (form.interests.length === 0) {
      errorObj.interests = "Interest is required.";
    }
    if (form.engagementType.length === 0) {
      errorObj.engagementType = "Engagement Type is required.";
    }

    if (Date.parse(form.projectStartDate) > Date.parse(form.projectEndDate)) {
      errorObj.projectEndDate = "Project end date should be greater than start date";
      // toastr.error("Project end date should be greater than start date");
    }

    if (Date.parse(form.recruitmentStartDate) > Date.parse(form.recruitmentEndDate)) {
      errorObj.recruitmentEndDate = "Recruitment end date should be greater than start date";
      // toastr.error("Recruitment end date should be greater than start date");
    }
    if (Date.parse(form.projectStartDate) <= Date.parse(form.recruitmentEndDate)) {
      errorObj.projectStartDate = "Project start date should be greater than recruitment end date";
      // toastr.error(
      //   "Project start date should be greater than recruitment end date"
      // );
    }
    console.log("error", errorObj);
    return errorObj;
  }, [form]);

  const minDate = () => {
    const today = new Date().toISOString().split("T")[0];
    return today;
  };
  const onSubmit = async (e) => {
    e.preventDefault();

    setSubmitted(true);

    const errorObj = checkValidation();
    setError(errorObj);
    let flag = 0;
    if (errorObj)
      Object.keys(errorObj).forEach((index) => {
        if (errorObj[index] !== "") {
          flag = 1;
        }
      });

    let errorMsg = 1;

    Object.values(errorObj)
      .filter((d) => d)
      .forEach((d, i) => {
        if (i === 0 && errorMsg && typeof d !== "object") {
          toastr.error(d);
          errorMsg = 0;
        } else if (typeof d === "object") {
          Object.values(d)
            .filter((d) => d && typeof d !== "object")
            .forEach((d, i) => {
              if (i === 0 && errorMsg) {
                toastr.error(d);
                errorMsg = 0;
              }
            });
        }
      });

    if (flag !== 0) return false;
    setIsLoading(true);

    const response = await createOpportunity(form);

    if (!response?.status) {
      toastr.error(response?.message || "something went wrong");
      setIsLoading(false);

      return;
    } else {
      toastr.success(response?.message || "successfully added");
      navigate(`/${role}/dashboard`);
    }
    setIsLoading(false);
  };

  return (
    <>
      <div className="CreateOpportunityScreen wrapper">
        <div className="formTopActionSec">
          <Container>
            <Row>
              <Col>
                <div className="headerActionGroup">
                  <Button className="btn-secondary-cancel-icon" onClick={goBack}>
                    {/* cancel */}
                  </Button>
                  {/* <Link
                    variant="primary"
                    className="tickIcon btn btn-primary"
                    to="/user/dashboard"
                  >
                    Add opportunity
                  </Link> */}
                  <Button className="tickIcon btn btn-primary" onClick={(e) => onSubmit(e)} disabled={isLoading}>
                    Add opportunity
                  </Button>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        <Container>
          <Card className="opportunityFormSec">
            <h1>Create opportunity</h1>
            <Form className="pt-3 whoopForm">
              <div className="formInnerSec">
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control placeholder="Placeholder text" name="opportunityName" onChange={onChange} value={form?.opportunityName} />
                  <InputError submitted={submitted} error={error} name="opportunityName" />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control as="textarea" placeholder="Placeholder text" name="description" onChange={onChange} value={form?.description} />
                  <div>
                    <InputError submitted={submitted} error={error} name="description" />
                    <span className={`float-end font-size-sm ${charCount > totalCount ? "text-danger" : ""}`}>
                      {charCount}/{totalCount}
                    </span>
                  </div>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Skills</Form.Label>
                  <Select
                    value={skillOptions?.filter((obj) => form?.skills.includes(obj.value))}
                    isMulti={true}
                    name="skills"
                    options={skillOptions}
                    onChange={(e) => onChangeMultiSelect(e, "skills")}
                    placeholder="Type to search"
                    className="customMultiselectBox"
                    controlShouldRenderValue={false}
                    styles={{
                      indicatorSeparator: () => {},
                    }}
                  />

                  {form?.skills.length > 0 && (
                    <ul className="selected-options">
                      {form.skills?.map((item) => (
                        <li key={item} className="selected-option">
                          <label>
                            {skillOptions
                              .filter((obj) => item === obj.value)
                              .map((filteredItem) => (
                                <div key={filteredItem.value}>
                                  <span>{filteredItem.label}</span>
                                </div>
                              ))}
                          </label>
                          <button onClick={() => removeValue("skills", item)}></button>
                        </li>
                      ))}
                    </ul>
                  )}

                  <InputError submitted={submitted} error={error} name="skills" />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Interests</Form.Label>
                  <Select
                    value={interestOptions?.filter((obj) => form?.interests.includes(obj.value))}
                    isMulti={true}
                    name="interests"
                    options={interestOptions}
                    onChange={(e) => onChangeMultiSelect(e, "interests")}
                    placeholder="Type to search"
                    className="customMultiselectBox"
                    controlShouldRenderValue={false}
                    styles={{
                      indicatorSeparator: () => {},
                    }}
                  />

                  {form?.interests.length > 0 && (
                    <ul className="selected-options">
                      {form.interests?.map((item) => (
                        <li key={item} className="selected-option">
                          <label>
                            {interestOptions
                              .filter((obj) => item === obj.value)
                              .map((filteredItem) => (
                                <div key={filteredItem.value}>
                                  <span>{filteredItem.label}</span>
                                </div>
                              ))}
                          </label>
                          <button onClick={() => removeValue("interests", item)}></button>
                        </li>
                      ))}
                    </ul>
                  )}

                  <InputError submitted={submitted} error={error} name="interests" />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Recruitment start & end date</Form.Label>
                  <div className="startEndDate">
                    <Form.Control placeholder="Start date" type="date" onKeyDown={(e) => e.preventDefault()} name="recruitmentStartDate" onChange={onChange} min={minDate()} value={form?.recruitmentStartDate} />
                    <Form.Control placeholder="End date" type="date" name="recruitmentEndDate" onKeyDown={(e) => e.preventDefault()} onChange={onChange} min={minDate()} value={form?.recruitmentEndDate} />
                  </div>
                  <div className="d-flex justify-content-between">
                    <InputError submitted={submitted} error={error} name="recruitmentStartDate" />
                    <InputError submitted={submitted} error={error} name="recruitmentEndDate" />
                  </div>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Project start & end date</Form.Label>
                  <div className="startEndDate">
                    <Form.Control placeholder="Start date" name="projectStartDate" onKeyDown={(e) => e.preventDefault()} type="date" min={minDate()} onChange={onChange} value={form?.projectStartDate} />
                    <Form.Control placeholder="End date" type="date" name="projectEndDate" onKeyDown={(e) => e.preventDefault()} onChange={onChange} min={minDate()} value={form?.projectEndDate} />
                  </div>
                  <div className="d-flex justify-content-between">
                    <InputError submitted={submitted} error={error} name="projectStartDate" />
                    <InputError submitted={submitted} error={error} name="projectEndDate" />
                  </div>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Location</Form.Label>

                  <Select
                    value={location?.filter((obj) => form?.location.includes(obj.value))}
                    onChange={(e) => onChangeMultiSelect(e, "location")}
                    isMulti={true}
                    options={form.location.length ? (form.location.includes(7) ? location.filter((value) => value.value === 7) : location.filter((value) => value.value !== 7)) : location}
                    name="location"
                    placeholder="Type to search"
                    className="customMultiselectBox"
                    controlShouldRenderValue={false}
                    menuPortalTarget={document.body}
                    styles={{
                      indicatorSeparator: () => {},
                      menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                    }}
                  />
                  {form?.location.length > 0 && (
                    <ul className="selected-options">
                      {form.location?.map((item) => (
                        <li key={item} className="selected-option">
                          <label>
                            {location
                              .filter((obj) => item === obj.value)
                              .map((filteredItem) => (
                                <div key={filteredItem.value}>
                                  <span>{filteredItem.label}</span>
                                </div>
                              ))}
                          </label>
                          <button onClick={() => removeValue("location", item)}></button>
                        </li>
                      ))}
                    </ul>
                  )}
                  <InputError submitted={submitted} error={error} name="location" />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Engagement Type</Form.Label>
                  <div className="applicationsActionGroup pt-0 pb-4">
                    <div className="rightButtons">
                      {["Remote", "In Person", "Hybrid"].map((engage) => (
                        <Button className={`rounded-pill btn p-2 ${form?.engagementType === engage ? "tickIcon  btn-success active " : "btn-secondary-radius"}`} onClick={() => handleEngagementClick(engage)}>
                          {engage}
                        </Button>
                      ))}
                    </div>
                  </div>
                  <InputError submitted={submitted} error={error} name="engagementType" />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Check type="switch" name="emergency" id="custom-switch" label="Emergency opportunity" onChange={onChange} value={form?.emergency} />
                </Form.Group>

                <Form.Group className="rangeSliderSec mb-4">
                  <Form.Label className="mb-0">Required time commitment</Form.Label>
                  <RangeSlider value={form?.commitTime} name="commitTime" min={0} max={100} step={10} trac variant="success" onChange={onChange} />
                  <div className="stepsInfo">
                    <span>&lt;5%</span>
                    <span>20%</span>
                    <span>40%</span>
                    <span>60%</span>
                    <span>80%</span>
                    <span>100%</span>
                  </div>
                </Form.Group>
              </div>
            </Form>
          </Card>
        </Container>
      </div>
    </>
  );
}

// export default CreateOpportunity;
const mapStateToProps = (state) => {
  return {
    role: state.role.role.role,
    filter: state.filter,
  };
};

export default connect(mapStateToProps)(CreateOpportunity);
