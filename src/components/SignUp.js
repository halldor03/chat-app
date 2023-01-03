import React from "react";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function SignUp() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const { signup } = useAuth();
  const navigate = useNavigate();

  async function signupUser(e) {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      emailRef.current.value = "";
      passwordRef.current.value = "";
      confirmPasswordRef.current.value = "";
    } else {
      try {
        setError("");
        setLoading(true);
        await signup(email, password);
        navigate("/");
      } catch (error) {
        setError("Failed to create an account");
        console.log(error.code);
      }
      setLoading(false);
    }
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
        <div className="inputContainer">
          <label htmlFor="confirmPasswordInput">Confirm password: </label>
          <input
            type="password"
            id="confirmPasswordInput"
            required
            ref={confirmPasswordRef}
          />
        </div>
        <button className="signupButton" onClick={(e) => signupUser(e)}>
          Sign In
        </button>
      </form>
      <div className="signupLoginInsteadInfo">
        Already have an account?
        <br />
        <Link className="links" to="/login">
          Log In
        </Link>{" "}
        instead
      </div>
    </div>
  );
}
