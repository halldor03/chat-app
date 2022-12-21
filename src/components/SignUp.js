import React from "react";
import { useRef, useState, useEffect } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { Link } from "react-router-dom";

export default function SignUp({ currentUser, setCurrentUser }) {
  const [error, setError] = useState("");
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        console.log("User signed in");
      } else {
        setCurrentUser(null);
        console.log("User not signed in");
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  function signup(e) {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;
    if (password === confirmPassword) {
      createUserWithEmailAndPassword(auth, email, password);
      setError("");
    } else {
      setError("Passwords do not match");
      emailRef.current.value = "";
      passwordRef.current.value = "";
      confirmPasswordRef.current.value = "";
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
        <button onClick={(e) => signup(e)}>Sign In</button>
      </form>
      <div className="signupLoginInsteadInfo">
        Already have an account? <Link to="/login">Log In</Link> instead
      </div>
    </div>
  );
}
