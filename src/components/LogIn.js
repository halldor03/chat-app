import React from "react";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function LogIn() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const navigate = useNavigate();

  async function loginUser(e) {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    try {
      setError("");
      setLoading(true);
      await login(email, password);
      navigate("/");
    } catch (error) {
      emailRef.current.value = "";
      passwordRef.current.value = "";
      switch (error.code) {
        case "auth/invalid-email":
          setError("Invalid e-mail: please provide valid e-mail adress");
          break;
        case "auth/user-not-found":
          setError("User not found: please Sign Up instead");
          break;
        case "auth/wrong-password":
          setError("Wrong password: please provide valid password");
          break;
        default:
          setError("An error occured while trying to log in");
      }
    }
    setLoading(false);
  }

  return (
    <div className="signupContainer">
      {error && <div className="errorMessage">{error}</div>}
      <form className="signupForm">
        <div className="inputContainer">
          <label htmlFor="emailInput">Mail: </label>
          <input type="email" id="emailInput" required ref={emailRef} />
        </div>
        <div className="inputContainer">
          <label htmlFor="passwordInput">Password: </label>
          <input
            type="password"
            id="passwordInput"
            required
            ref={passwordRef}
          />
        </div>
        <button
          className="loginButton"
          disabled={loading}
          onClick={(e) => loginUser(e)}
        >
          Log In
        </button>
      </form>
      <div className="signupLoginInsteadInfo">
        Don't have an account yet?
        <br />
        <Link className="links" to="/signup">
          Sign Up
        </Link>{" "}
        instead
      </div>
    </div>
  );
}
