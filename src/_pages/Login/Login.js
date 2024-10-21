import React, { Component } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { loginWithEmailAndPassword } from "../../redux/actions/LoginActions";
import {
  setSkills,
  setLocations,
  setInterests,
} from "../../redux/actions/FilterAction";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  Navigate,
  Link,
  useLocation,
  useNavigate,
  redirect,
} from "react-router-dom";
import toastr from "toastr";
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
// import logo from "../../Assets/Images/logo.png";
// import loginImg from "../../Assets/Images/loginImg.jpg";
// import error from "../../Assets/Images/error.svg";
import { auth_user, isLogin } from "../../_helpers/helper";
import "./login.scss";
import { URL_CONFIG } from "_contants/config/URL_CONFIG";
import {
  getInterest,
  getLocation,
  getSkills,
} from "services/UserService/SkillInterestLocationServices";
// import Loading from "../../../src/components/Loader/Loading";

const SigninSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter valid Email id")
    .required("Please enter the Email"),
  password: yup
    .string()
    .min(6, "Password must be 6 character long")
    .required("Please enter the Password"),
});

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      first_name: "",
      last_name: "",
      phone: "",
      profilePicture: "",
      profile_desc: "",
      data: {},
      error: {},
      isError: false,
      showPass: false,
      textIdx: 0,
      loading: 0,
      submitted: 0,
      skillOptions: [],
      locationOptions: [],
      interestOptions: [],
      redirectPath: localStorage.getItem("redirectPath") || "/user/dashboard",
    };
    this.signin = this.signin.bind(this);
    this.signup = this.signup.bind(this);
    this.callback = this.callback.bind(this);
    this.resetData = this.resetData.bind(this);
    this.setOTP = this.setOTP.bind(this);
  }
  setSkillsData = (data) => {
    this.props.setSkills(data);
  };

  setLocationsData = (data) => {
    this.props.setLocations(data);
  };

  setInterestsData = (data) => {
    this.props.setInterests(data);
  };

  componentDidMount() {
    document.body.classList.add("noBodypad");
    const isMobile = window.location.href.split("/")[3] === "mobile";

    this.getAllSkills();
    this.getAllLocations();
    this.getAllInterests();

    this.setState({ isMobile });
    localStorage.removeItem("redirectPath");

    this.timeout = setInterval(() => {
      let currentIdx = this.state.textIdx;
      this.setState((prevState) => ({ ...prevState, textIdx: currentIdx + 1 }));
    }, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.timeout);
  }

  getAllSkills = async () => {
    try {
      const response = await getSkills();
      if (response && response.status) {
        const skillOptions = response.data.map((option) => ({
          label: option.name,
          value: option.id,
        }));
        this.setSkillsData(skillOptions);
      }
    } catch (error) {
      // Handle error
    }
  };

  getAllLocations = async () => {
    try {
      const response = await getLocation();
      if (response && response.status) {
        const locationOptions = response?.data?.map((option) => ({
          label: option.name,
          value: option.id,
        }));
        this.setLocationsData(locationOptions);
      }
    } catch (error) {
      // Handle error
    }
  };

  getAllInterests = async () => {
    try {
      const response = await getInterest();
      if (response && response.status) {
        const interestOptions = response.data.map((option) => ({
          label: option.name,
          value: option.id,
        }));
        this.setInterestsData(interestOptions);
      }
    } catch (error) {
      // Handle error
    }
  };

  handleChange = (event) => {
    event.persist();
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (value, { isSubmitting }) => {
    this.props.loginWithEmailAndPassword({
      ...value,
      isMobile: this.props.isMobile,
    });

    this.setState({ submitted: 1 });
  };
  setOTP(e) {
    if (e.target.value.length <= 6)
      this.setState({
        [e.target.name]: e.target.value,
      });
  }

  callback(value) {
    if (value) {
      toastr.success("You have Signup Successfully, Please verify your email.");
      this.resetData();
      this.signin();
    }
  }

  signin() {
    this.setState((prev) => ({
      signinDisplay: !prev.signinDisplay,
      signupDisplay: false,
      otpDisplay: false,
    }));
  }

  signup() {
    this.setState((prevState) => ({
      signupDisplay: !prevState.signupDisplay,
      signinDisplay: false,
      otpDisplay: false,
    }));
  }

  resetData() {
    this.setState({
      email: "",
      password: "",
      first_name: "",
      last_name: "",
      phone: "",
      profilePicture: "",
      profile_desc: "",
      data: {},
      error: {},
      isError: false,
      showPass: false,
      textIdx: 0,
      loading: 0,
      submitted: 0,
      skillOptions: [],
      locationOptions: [],
      interestOptions: [],
    });
  }

  render() {
    if (isLogin()) {
      return (
        <Navigate
          to={
            !auth_user().isSkipped
              ? "/register/complete-profile"
              : this.state.redirectPath
          }
          replace
        />
      );
    }

    if (this.state.submitted) {
      if (
        this?.props?.login?.error?.password ||
        this?.props?.login?.error?.username
      ) {
        this.state.loading = 0;
        // toastr.error(
        //   this?.props?.login?.error?.password ||
        //     this?.props?.login?.error?.username
        // );
      } else this.state.loading = 1;
    }

    return (
      <React.Fragment>
        <div className="loginScreen wrapper">
          <Container>
            <Card className="loginFormSec">
              <h2>Sign In</h2>
              <p className="font-size-sm">
                Enter your email address and password to get started.
              </p>

              <div className="loginForms">
                {/* <div className="loginIntro"></div> */}
                <Formik
                  validationSchema={SigninSchema}
                  onSubmit={this.handleSubmit}
                  initialValues={this.state}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                    redirectOnAws,
                  }) => (
                    <form className="pt-3 whoopForm" onSubmit={handleSubmit}>
                      <div className="form-group mb-3">
                        <label className="form-label" htmlFor="email">
                          Email
                        </label>
                        <input
                          className="form-control-SigninNew form-control"
                          placeholder="Enter email"
                          type="email"
                          name="email"
                          onBlur={handleBlur}
                          value={values.email}
                          onChange={handleChange}
                        />
                        {isSubmitting &&
                        this.props.login &&
                        this.props.login.error.username ? (
                          <div className="errorMssg">
                            {this.props.login.error.username}
                          </div>
                        ) : (
                          <React.Fragment>
                            {errors?.email && (
                              <div className="errorMssg">{errors?.email}</div>
                            )}
                          </React.Fragment>
                        )}
                      </div>
                      <div className="form-group mb-2">
                        <label className="form-label" htmlFor="password">
                          Password
                        </label>
                        <input
                          className="form-control-SigninNew form-control"
                          name="password"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.password}
                          placeholder="Enter password"
                          data-testid="password"
                          type="password"
                        />

                        {errors.password ? (
                          <div className="errorMssg">
                            {/* <img
                                    src={error}
                                    alt="errorImg"
                                    className="img-fluid"
                                  />{" "} */}
                            {errors.password}
                          </div>
                        ) : (
                          <React.Fragment>
                            {isSubmitting &&
                              this.props.login &&
                              this.props.login.error.password && (
                                <div className="errorMssg">
                                  {this.props.login.error.password}
                                </div>
                              )}
                          </React.Fragment>
                        )}
                      </div>

                      <p className="forgotPassword">
                        <Link to="/auth/forgot-password">Forgot Password?</Link>
                      </p>

                      <Row>
                        <Col xs={12}>
                          <button
                            className="btn btn-primary loginBtn w-100"
                            type="submit"
                          >
                            Login
                          </button>
                        </Col>
                        {/* <div className="divider">
                          <span></span>
                          <span>OR</span>
                          <span></span>
                        </div>
                        <Col xs={12}>
                          <a
                            href={URL_CONFIG?.AWS_COGNITO_LOGIN_URL}
                            className="btn btn-secondary-outline w-100"
                          >
                            Login with Aws Cognito
                          </a>
                        </Col> */}
                      </Row>
                    </form>
                  )}
                </Formik>
              </div>
            </Card>
            <p className="formBtmInfo">
              New here? <Link to="/register">Create account</Link>
            </p>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loginWithEmailAndPassword: PropTypes.func.isRequired,
    user: state.user,
    login: state.login,
    skills: state.filter.skills,
    locations: state.filter.locations,
    interests: state.filter.interests,
  };
};

export default connect(mapStateToProps, {
  loginWithEmailAndPassword,
  setSkills,
  setLocations,
  setInterests,
})(Login);
// export default Login;
