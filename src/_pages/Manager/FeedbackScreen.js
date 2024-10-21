import React, { useCallback, useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Rating } from "react-simple-star-rating";
import { fullName } from "_helpers/helper";
import toastr from "toastr";
import { postTodo, postTodoForCompleted } from "services/ReviewServices";
import { getTodoById } from "services/TodoServices";
import { opportunitiesById } from "services/OpportunityServices";
import { Validation } from "_helpers/Validation/Validation";
import InputError from "components/Form/InputError/InputError";

export const rules = [
  {
    field_name: "rating",
    label: "Rating",
    type: "string",
    isRequired: true,
  },
  {
    field_name: "desc",
    label: "Description",
    type: "string",
    maxLength: 512,
    isRequired: true,
  },
];

function FeedbackScreen({ props }) {
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const totalCount = 512;
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState("");
  const [error, setError] = useState({});
  const [OpportunityName, setOpportunityName] = useState("");

  // Catch Rating value
  const handleRating = (rate) => {
    setRating(rate);
    setForm({ ...form, rating: rate });

    // other logic
  };
  // Optinal callback functions
  const onPointerEnter = () => console.log("Enter");
  const onPointerLeave = () => console.log("Leave");
  const onPointerMove = (value, index) => console.log(value, index);

  const goBack = () => {
    navigate(-1);
  };

  const { id } = useParams();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const role = params.get("role");
  const todo = location?.state;
  const getProfileDetails = useCallback(async () => {
    let response = await opportunitiesById(id);
    if (response && response.status) {
      setOpportunityName(response?.data?.opportunity_name);
      setUserData(response?.data?.user);
    }
  }, [id]);
  useEffect(() => {
    getProfileDetails();
  }, [getProfileDetails]);

  // useEffect(() => {
  //   role === "completed" && getProfileDetails();
  // }, [getProfileDetails, role]);

  const [form, setForm] = useState({
    desc: "",
    rating: "",
  });
  useEffect(() => {
    setCharCount(form.desc.length);
  }, [form.desc]);

  const handleChange = (e) => {
    let updatedDesc = e.target.value;
    setForm({ ...form, [e.target.name]: e.target.value });
    setCharCount(updatedDesc.length);
  };

  const checkValidation = useCallback(() => {
    /**call validation file for validation */

    let errorObj = Validation(form, rules);
    return errorObj;
  }, [form]);
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

    if (flag !== 0) return false;

    setIsLoading(true);
    let response, formData;
    if (role === "manager") {
      formData = {
        ...form,
        OpportunityId: id,
        userId: todo?.userId,
        userType: role,
      };
    } else {
      formData = { ...form, OpportunityId: id, userType: "user" };
    }
    response = await postTodo(formData);

    if (!response?.status) {
      toastr.error(response?.message || "something went wrong");
      return;
    } else {
      toastr.success(response?.message || "successfully added");
      goBack();
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
                  <Link
                    className="btn-secondary-cancel-icon"
                    // onClick={goBack}
                    to={`/${
                      role === "manager" ? "manager" : "user"
                    }/dashboard?tab=reviews`}
                  >
                    cancel
                  </Link>
                  <Button
                    variant="primary"
                    className="tickIcon btn btn-primary"
                    onClick={(e) => onSubmit(e)}
                    disabled={isLoading}
                  >
                    Save feedback
                  </Button>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        <Container>
          <Card className="opportunityFormSec">
            <h1>
              Feedback for{" "}
              {role === "user"
                ? fullName(todo?.managerDetails)
                : role === "manager"
                ? fullName(todo?.userDetails || location?.state?.user)
                : fullName(userData)}
            </h1>
            <Form className="pt-3 whoopForm">
              <div className="formInnerSec">
                <Form.Group className="mb-3">
                  <Form.Label>Star rating</Form.Label>
                  <div>
                    <Rating
                      onClick={handleRating}
                      onPointerEnter={onPointerEnter}
                      onPointerLeave={onPointerLeave}
                      onPointerMove={onPointerMove}
                      value={form.rating}
                      onChange={handleChange}
                      name="rating"
                      /* Available Props */
                    />
                  </div>
                  <InputError
                    submitted={submitted}
                    error={error}
                    name="rating"
                  />
                </Form.Group>
                <Form.Group className="mb-0">
                  <Form.Label>Opportunity</Form.Label>
                  <Form.Control
                    placeholder="Auto populated"
                    disabled
                    value={OpportunityName}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-0">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    placeholder="Placeholder text"
                    name="desc"
                    value={form.desc}
                    onChange={handleChange}
                  />
                  <div>
                    <InputError
                      submitted={submitted}
                      error={error}
                      name="desc"
                    />
                    <span
                      className={`float-end font-size-sm ${
                        charCount > totalCount ? "text-danger" : ""
                      }`}
                    >
                      {charCount}/{totalCount}
                    </span>
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

export default FeedbackScreen;
