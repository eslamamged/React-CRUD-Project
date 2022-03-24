import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Register.css";

const Email_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[0-9]).{8,24}$/;
const Name_REGEX = /^[A-z][A-z]{2,23}$/;
const REGISTER_URL = "http://localhost:5000/users/register";

export default function Register() {
  const userRef = useRef();
  const errRef = useRef();
  const [name, setName] = useState("");
  const [validName, setValidName] = useState(false);
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [password, setPassword] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidName(Name_REGEX.test(name));
  }, [name]);

  useEffect(() => {
    setValidEmail(Email_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(password));
    setValidMatch(password === passwordConfirm);
  }, [password, passwordConfirm]);

  useEffect(() => {
    setErrMsg("");
  }, [name, email, password, passwordConfirm]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v1 = Email_REGEX.test(email);
    const v2 = PWD_REGEX.test(password);
    const v3 = Name_REGEX.test(name);
    if (!v1 || !v2 || !v3) {
      setErrMsg("Invalid Entry");
      return;
    }

    // navigate("/login", { replace: true });

    try {
      const response = await axios.post(REGISTER_URL, {
        name,
        email,
        password,
        passwordConfirm,
      });
      console.log(response);
      console.log(response?.data);
      console.log(response?.accessToken);
      setSuccess(true);
      setName("");
      setPassword("");
      setPasswordConfirm("");
      setEmail("");
    } catch (err) {
      console.log(err);
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else {
        setErrMsg("Registration Failed");
      }
      errRef.current.focus();
    }
  };
  return (
    <section className="vh-100">
      <div className="container-fluid h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-9 col-lg-6 col-xl-5">
            <img
              src={
                "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              }
              className="img-fluid"
              alt="images"
            />
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <b
              ref={errRef}
              className={errMsg ? "errmsg" : "hide"}
              aria-live="assertive"
            >
              {errMsg}
            </b>
            <h3>Registeration Form</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form3Example3">
                  Uesr Name
                  <FontAwesomeIcon
                    icon={faCheck}
                    className={validName ? "valid" : "hide"}
                  />
                  <FontAwesomeIcon
                    icon={faTimes}
                    className={validName || !name ? "hide" : "invalid"}
                  />
                </label>
                <input
                  className="form-control form-control-lg"
                  type="text"
                  id="name"
                  placeholder="Enter a valid user name"
                  ref={userRef}
                  autoComplete="off"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  required
                />
                <b className={validName || !name ? "hide" : "invalid"}>
                  User Name Must be at least 2 characters without any spaces
                </b>
              </div>
              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form3Example3">
                  Email address
                  <FontAwesomeIcon
                    icon={faCheck}
                    className={validEmail ? "valid" : "hide"}
                  />
                  <FontAwesomeIcon
                    icon={faTimes}
                    className={validEmail || !email ? "hide" : "invalid"}
                  />
                </label>
                <input
                  className="form-control form-control-lg"
                  type="email"
                  id="email"
                  placeholder="Enter a valid email address"
                  ref={userRef}
                  autoComplete="off"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                />
                <b className={validEmail || !email ? "hide" : "invalid"}>
                  invalid email
                </b>
              </div>
              <div className="form-outline mb-3">
                <label className="form-label" htmlFor="form3Example4">
                  Password
                  <FontAwesomeIcon
                    icon={faCheck}
                    className={validPwd ? "valid" : "hide"}
                  />
                  <FontAwesomeIcon
                    icon={faTimes}
                    className={validPwd || !password ? "hide" : "invalid"}
                  />
                </label>
                <input
                  className="form-control form-control-lg"
                  type="password"
                  id="password"
                  placeholder="Enter password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
                />
                <b className={validPwd || !password ? "hide" : "invalid"}>
                  Password Must be at least 8 characters with lowercase letters
                </b>
              </div>
              <div className="form-outline mb-3">
                <label className="form-label" htmlFor="form3Example4">
                  Confirm Password
                  <FontAwesomeIcon
                    icon={faCheck}
                    className={validMatch && passwordConfirm ? "valid" : "hide"}
                  />
                  <FontAwesomeIcon
                    icon={faTimes}
                    className={
                      validMatch || !passwordConfirm ? "hide" : "invalid"
                    }
                  />
                </label>
                <input
                  className="form-control form-control-lg"
                  type="password"
                  id="confirm_pwd"
                  placeholder="Enter Your Confirm password"
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  value={passwordConfirm}
                  required
                />
                <b
                  className={
                    (validMatch && passwordConfirm) || !passwordConfirm
                      ? "hide"
                      : "invalid"
                  }
                >
                  <FontAwesomeIcon icon={faInfoCircle} />
                  Password Not Matched
                </b>
              </div>
              <div className="text-center text-lg-start mt-4 pt-2">
                <input
                  type="submit"
                  className="btn btn-primary btn-lg"
                  style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                  disabled={
                    !validEmail || !validPwd || !validMatch ? true : false
                  }
                />
                <p className="small fw-bold mt-2 pt-1 mb-0">
                  have an account ? {""}
                  <a href="/login" className="link-danger">
                    Login
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
