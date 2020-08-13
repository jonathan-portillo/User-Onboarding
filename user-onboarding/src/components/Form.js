import React, { useState, useEffect } from "react";
import * as yup from "yup";
import axios from "axios";

const Form = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    password: "",
    terms: true,
  });

  const [disableButton, setDisableButton] = useState();

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    terms: "",
  });

  const [createAcct, setCreateAcct] = useState([]);

  const submitForm = (e) => {
    e.preventDefault();
    axios.post("https://reqres.in/api/users", formState).then((response) => {
      setCreateAcct(response.data);
      setFormState({
        name: "",
        email: "",
        password: "",
        terms: true,
      });
    });
  };
  const formSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup
      .string()
      .email("Must be a valid eamil")
      .required("Email is required"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters long")
      .required("Password is required"),
    terms: yup.boolean().oneOf([true], "Please agree to T&C"),
  });

  const validateChange = (e) => {
    yup
      .reach(formSchema, e.target.name)
      .validate(e.target.value)
      .then((valid) => {
        setErrors({
          ...errors,
          [e.target.name]: "",
        });
      })
      .catch((error) => {
        console.log(error);
        setErrors({
          ...errors,
          [e.target.name]: error.errors[0],
        });
      });
  };

  const inputChange = (e) => {
    e.persist();
    console.log("changed", e.target.value);
    const newAcctData = {
      ...formState,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
    };
    validateChange(e);
    setFormState(newAcctData);
  };

  useEffect(() => {
    formSchema.isValid(formState).then((isValid) => {
      setDisableButton(!isValid);
    });
  }, [formState]);

  return (
    <div>
      <form onSubmit={submitForm}>
        <label htmlFor="name">
          Name
          <input
            id="name"
            type="text"
            name="name"
            value={formState.name}
            onChange={inputChange}
          />
          {errors.name.length > 0 ? <p>{errors.name}</p> : null}
        </label>
        <label htmlFor="email">
          Email
          <input
            id="email"
            type="text"
            name="email"
            value={formState.email}
            onChange={inputChange}
          />
          {errors.email.length > 0 ? <p>{errors.email}</p> : null}
        </label>
        <label htmlFor="password">
          Password
          <input
            id="password"
            type="password"
            name="password"
            value={formState.password}
            onChange={inputChange}
          />
          {errors.password.length > 0 ? <p>{errors.password}</p> : null}
        </label>
        <label htmlFor="terms" className="terms">
          Read T & C?
          <input
            id="terms"
            type="checkbox"
            name="terms"
            checked={formState.terms}
            onChange={inputChange}
          />
          {errors.terms.length > 0 ? <p>{errors.terms}</p> : null}
        </label>
        <button disabled={disableButton} type="submit">
          Create Account
        </button>
      </form>
      <pre>{JSON.stringify(createAcct, null, 2)}</pre>
    </div>
  );
};

export default Form;

// Name
// Email
// Password
// Terms of Service (checkbox)
// A Submit button to send our form data to the server.
