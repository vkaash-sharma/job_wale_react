import React, {useCallback, useEffect, useState} from "react";
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import "../../Assets/Styles/profile.scss";
import Select from "react-select";
import {IS_MOBILE, auth_user, fullName} from "../../_helpers/helper";
import {UserService} from "../../services/UserService/UserService";
import {isEmptyObject} from "jquery";
import {Validation} from "../../_helpers/Validation/Validation";
import toastr from "toastr";
import RangeSlider from "react-bootstrap-range-slider";

import InputError from "components/Form/InputError/InputError";
import {setUserData} from "redux/actions/UserActions";
import JwtAuthService from "services/JwtAuthService";
import CropImage from "components/CropImage";
import {connect} from "react-redux";

export const rules = [
  {
    field_name: "firstName",
    label: "First name",
    type: "string",
    maxLength: 32,
    isRequired: true,
  },
  {
    field_name: "lastName",
    label: "Last name",
    type: "string",
    maxLength: 32,
    isRequired: true,
  },
  {
    field_name: "profile_title",
    label: "Job title",
    type: "string",
    maxLength: 64,

    isRequired: true,
  },
  {
    field_name: "profile_desc",
    label: "Description",
    type: "string",
    maxLength: 2024,
    minLength: 20,

    isRequired: true,
  },
  {
    field_name: "skills",
    label: "Skills",
    isRequired: true,
  },
  {
    field_name: "interests",
    label: "Interests",
    isRequired: true,
  },
  {
    field_name: "locations",
    label: "Locations",
    isRequired: true,
  },
  {
    field_name: "time_availability",
    label: "Time Availability",
    isRequired: true,
  },
];
function EditProfile({
  filter,
  register,
  // registerForm,
  // newUserId,
  // completeProfile,
}) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    profile_title: "",
    profile_desc: "",
    interests: [],
    skills: [],
    locations: [],
    time_availability: 0,
    profilePicture: "",
  });

  //
  const [skillOptions, setSkillOptions] = useState([]);
  const [interestOptions, setInterestOptions] = useState([]);
  const [locationOptions, setLocationOptions] = useState([]);
  const [charCount, setCharCount] = useState(0);
  const totalCount = 2024;
  const [user, setUser] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({});
  const [image, setImage] = useState({preview: "", data: ""});
  const [imgCrop, setImgCrop] = useState({
    src: "",
    showImage: false,
    cropImage: false,
    crop: {
      unit: "%",
      x: 0,
      y: 0,
      width: 50,
      height: 50,
    },
  });
  const [imageError, setImageError] = useState("");
  const navigate = useNavigate();
  const goBack = async (e) => {
    e.preventDefault();
    if (register) {
      const data = await UserService.skipById(auth_user().id);
      if (data?.status) {
        navigate("/user/dashboard");
      }
    } else navigate(-1);
  };
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      if (
        e.target.files[0]?.name &&
        !e.target.files[0]?.name?.match(
          /\.(jpg|jpeg|png|gif|svg|webp|bmp|xpm|BMP)$/
        )
      ) {
        setImageError("Please upload an image file");
        return;
      }
      setImageError("");
      const img = {
        preview: e.target.files[0]
          ? URL.createObjectURL(e.target.files[0])
          : "",
        data: e.target.files[0],
      };
      setImage(img);
      if (img?.preview) {
        setImgCrop((prev) => ({
          ...prev,
          src: img.preview,
          showImage: true,
          cropImage: true,
        }));
      } else {
        setImgCrop({
          src: "",
          showImage: false,
          cropImage: false,
        });
      }
    }
  };

  const getuser = async () => {
    const response = await UserService.loggedUser();
    if (response?.status) {
      setUser(response?.data);
    }
  };
  useEffect(() => {
    if (!register) {
      getuser();
    }
  }, []);

  const getSkill = (skillKey) => {
    const skillSet = user?.userSkill
      ?.filter((value) => value?.type === skillKey)
      ?.map((skill) => skill?.skillInterest?.id);
    return skillSet;
  };
  useEffect(() => {
    const {locations, interests, skills} = filter;
    setSkillOptions(skills ? skills : []);
    setInterestOptions(interests ? interests : []);
    setLocationOptions(locations ? locations : []);
  }, [filter]);

  useEffect(() => {
    if (!isEmptyObject(user)) {
      setForm({
        firstName: user.firstName ? user.firstName : "",
        lastName: user.lastName ? user.lastName : "",
        profile_title: user.profile_title ? user.profile_title : "",
        profile_desc: user.profile_desc ? user.profile_desc : "",
        skills: getSkill("skill") || "",
        interests: getSkill("interest") || "",
        locations: getSkill("location") || "",
        time_availability: user?.time_availability || 0,
        profilePicture: user?.profilePicture,
      });
      setCharCount(user.profile_desc ? user.profile_desc?.length : 0);
    }
  }, [user]);
  const onChange = ({target: {name, value}}) => {
    if (name === "time_availability") {
      value = parseInt(value, 10);
    }

    if (name === "profile_desc") {
      setCharCount(value?.length);
    }
    setForm((prev) => {
      const data = {...prev, [name]: value};

      return data;
    });
  };
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
    console.log("Before removal:", name, valueToRemove);
    setForm((prev) => ({
      ...prev,
      [name]: prev[name]?.filter((value) => value !== valueToRemove),
    }));
    console.log("After removal:", name, valueToRemove);
  };
  const checkValidation = useCallback(
    (form) => {
      /**call validation file for validation */

      let errorObj = Validation(form, rules);
      if (form.interests.length === 0) {
        errorObj.interests = "Interest is required.";
      }
      if (form.skills.length === 0) {
        errorObj.skills = "Skill is required.";
      }

      if (form.locations.length === 0) {
        errorObj.locations = "Location is required.";
      }

      return errorObj;
    },
    [form]
  );

  const onCropImage = (src, fileName) => {
    setImgCrop((prev) => ({
      ...prev,
      src: src,
      fileName: 'profile.jpg'
    }));
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    const errorObj = checkValidation(form);
    setError(errorObj);
    let flag = 0;
    if (errorObj)
      Object.keys(errorObj).forEach((index) => {
        if (errorObj[index] !== "") {
          flag = 1;
        }
      });

    if (
      image?.data?.name &&
      !image?.data?.name?.match(/\.(jpg|jpeg|png|gif|svg|webp|bmp|xpm|BMP)$/)
    ) {
      toastr.error("Please select valid image.");
      flag = 1;
    }
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
    let data1;
    if (imgCrop.src) {
      const dataImage = new FormData();
      console.log(imgCrop);
      let blob = await fetch(imgCrop.src).then((r) => r.blob());
      dataImage.append("file", blob, imgCrop.fileName);
      data1 = await UserService.userImage(dataImage);
    }
    if (imgCrop.src && !data1?.status && data1?.message) {
      toastr.warning(data1.message);
    } else if (data1?.status || !imgCrop.src) {
      let data = await UserService.updateLoggedUser({
        form,
      });
      if (data) {
        if (data.status) {
          setUser(data?.data);
          JwtAuthService.setUser(data?.data);
          toastr.success(data?.message || "Profile Saved");
          navigate(`${IS_MOBILE() ? "/mobile" : ""}/user/dashboard`);
        } else if (data && data.message) {
          toastr.warning(data.message);
        }
      }
    }
    setIsLoading(false);
  };

  const onRegister = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    delete form.firstName;
    delete form.lastName;
    delete form.profilePicture;
    const errorObj = checkValidation(form);
    setError(errorObj);
    let flag = 0;
    if (errorObj)
      Object.keys(errorObj).forEach((index) => {
        if (errorObj[index] !== "") {
          flag = 1;
        }
      });

    if (flag !== 0) return false;

    setIsLoading(true);

    let data = await UserService.createUserCompleteDetails({
      ...form,
      id: auth_user().id,
    });
    if (data) {
      if (data.status) {
        setUser(data?.data);
        JwtAuthService.setUser(data?.data);
        toastr.success("Success");
        navigate(`/user/dashboard`);
      } else if (data && data.message) {
        toastr.warning(data.message);
      }
    }

    setIsLoading(false);
  };
  return (
    <>
      <div
        className={
          register ? "signupScreen wrapper" : "editProfileScreen wrapper"
        }
      >
        <Container>
          <Row>
            {!register && (
              <Col lg="3">
                <div className="viewProfileShortInfo">
                  {/* <div className="profilePic editProfilePic"> */}
                  <div
                    className={
                      image?.preview ? "w-100" : "profilePic editProfilePic"
                    }
                  >
                    <CropImage
                      selectedFile={
                        user?.profilePicture ||
                        require("../../Assets/Images/user-default.png")
                      }
                      onCropImage={onCropImage}
                      imgCrop={imgCrop}
                      setImgCrop={setImgCrop}
                      handleFileSelect={handleFileChange}
                    />
                  </div>
                  <div className="userInfo">
                    {imageError && <p className="text-danger">{imageError}</p>}
                    <h6>{fullName(user)}</h6>
                    <span>{user?.profile_title}</span>
                    <div className="pt-4">
                      <Link
                        to="/user/view"
                        className="btn btn-secondary-outline"
                      >
                        View profile
                      </Link>
                    </div>
                  </div>
                </div>
              </Col>
            )}
            <Col lg={register ? "" : "9"}>
              <Card>
                <div className="profileFormSec">
                  {register ? (
                    <h1>Complete details</h1>
                  ) : (
                    <h1>{fullName(user)}</h1>
                  )}
                  <Form className="pt-3 whoopForm">
                    <div className="formInnerSec">
                      {!register && (
                        <Form.Group className="mb-3">
                          <Form.Label>Your Name</Form.Label>
                          {/* =====================firstName======================*/}
                          <div className="row row-cols-2 g-2">
                            <div className="col">
                              <Form.Control
                                placeholder="First name"
                                name="firstName"
                                onChange={onChange}
                                value={form?.firstName}
                              />
                              <InputError
                                submitted={submitted}
                                error={error}
                                name="firstName"
                              />
                            </div>
                            <div className="col">
                              {/* ================lastName======================== */}
                              <Form.Control
                                placeholder="Last name"
                                name="lastName"
                                onChange={onChange}
                                value={form?.lastName}
                              />
                              <InputError
                                submitted={submitted}
                                error={error}
                                name="lastName"
                              />
                            </div>
                          </div>
                        </Form.Group>
                      )}
                      <Form.Group className="mb-3">
                        <Form.Label>Job title</Form.Label>
                        <Form.Control
                          placeholder="Job title"
                          name="profile_title"
                          onChange={onChange}
                          value={form?.profile_title}
                        />
                        <InputError
                          submitted={submitted}
                          error={error}
                          name="profile_title"
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                          as="textarea"
                          placeholder="Placeholder text"
                          name="profile_desc"
                          onChange={onChange}
                          value={form?.profile_desc}
                        />
                        <div>
                          <InputError
                            submitted={submitted}
                            error={error}
                            name="profile_desc"
                          />
                          <span
                            className={`float-end font-size-sm ${charCount > totalCount ? "text-danger" : ""
                              }`}
                          >
                            {charCount}/{totalCount}
                          </span>
                        </div>
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>My interests</Form.Label>
                        <Select
                          value={interestOptions.filter((obj) =>
                            form?.interests.includes(obj.value)
                          )}
                          onChange={(e) => onChangeMultiSelect(e, "interests")}
                          name="interests"
                          isMulti={true}
                          options={interestOptions}
                          placeholder="Type to search"
                          className="customMultiselectBox"
                          controlShouldRenderValue={false}
                          menuPortalTarget={document.body}
                          styles={{
                            indicatorSeparator: () => {},
                            menuPortal: (base) => ({...base, zIndex: 9999}),
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
                                <button
                                  onClick={() => removeValue("interests", item)}
                                ></button>
                              </li>
                            ))}
                          </ul>
                        )}
                        <InputError
                          submitted={submitted}
                          error={error}
                          name="interests"
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>My skills</Form.Label>
                        <Select
                          value={skillOptions.filter((obj) =>
                            form?.skills.includes(obj.value)
                          )}
                          onChange={(e) => onChangeMultiSelect(e, "skills")}
                          isMulti={true}
                          name="skills"
                          options={skillOptions}
                          placeholder="Type to search"
                          className="customMultiselectBox"
                          controlShouldRenderValue={false}
                          menuPortalTarget={document.body}
                          styles={{
                            indicatorSeparator: () => {},
                            menuPortal: (base) => ({...base, zIndex: 9999}),
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
                                <button
                                  onClick={() => removeValue("skills", item)}
                                ></button>
                              </li>
                            ))}
                          </ul>
                        )}
                        <InputError
                          submitted={submitted}
                          error={error}
                          name="skills"
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Locations</Form.Label>
                        <Select
                          value={locationOptions.filter((obj) =>
                            form?.locations.includes(obj.value)
                          )}
                          onChange={(e) => onChangeMultiSelect(e, "locations")}
                          isMulti={true}
                          name="locations"
                          options={
                            Array.isArray(locationOptions) &&
                            locationOptions.length > 0 &&
                            locationOptions.filter((value) => value.value !== 7)
                          }
                          placeholder="Type to search"
                          className="customMultiselectBox"
                          controlShouldRenderValue={false}
                          menuPortalTarget={document.body}
                          styles={{
                            indicatorSeparator: () => {},
                            menuPortal: (base) => ({...base, zIndex: 9999}),
                          }}
                        />
                        {form?.locations.length > 0 && (
                          <ul className="selected-options">
                            {form.locations?.map((item) => (
                              <li key={item} className="selected-option">
                                <label>
                                  {locationOptions
                                    .filter((obj) => item === obj.value)
                                    .map((filteredItem) => (
                                      <div key={filteredItem.value}>
                                        <span>{filteredItem.label}</span>
                                      </div>
                                    ))}
                                </label>
                                <button
                                  onClick={() => removeValue("locations", item)}
                                ></button>
                              </li>
                            ))}
                          </ul>
                        )}
                        <InputError
                          submitted={submitted}
                          error={error}
                          name="locations"
                        />
                      </Form.Group>
                      <Form.Group className="rangeSliderSec mb-4">
                        <Form.Label className="mb-0">
                          Time availability
                        </Form.Label>
                        <RangeSlider
                          value={form.time_availability}
                          min={0}
                          max={100}
                          step={10}
                          variant="success"
                          tooltipPlacement="top"
                          onChange={onChange}
                          name="time_availability"
                        />
                        <div className="stepsInfo">
                          <span>&lt;5%</span>
                          <span>20%</span>
                          <span>40%</span>
                          <span>60%</span>
                          <span>80%</span>
                          <span>100%</span>
                        </div>
                        <InputError
                          submitted={submitted}
                          error={error}
                          name="time_availability"
                        />
                      </Form.Group>
                    </div>
                    <div className="formBtnGroup">
                      <button
                        className={
                          register ? "btn-skip " : "btn-secondary-cancel-icon"
                        }
                        onClick={goBack}
                      >
                        Skip
                      </button>
                      <Button
                        variant="primary"
                        className="tickIcon completeProfileButton"
                        disabled={isLoading}
                        onClick={register ? onRegister : onSubmit}
                      >
                        Save
                      </Button>
                    </div>
                  </Form>
                </div>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    filter: state.filter,
  };
};

export default connect(mapStateToProps, {setUserData})(EditProfile);
