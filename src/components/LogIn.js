import React from "react";
import { useRef, useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { Link } from "react-router-dom";

export default function LogIn({ currentUser, setCurrentUser }) {
  const [error, setError] = useState("");
  const emailRef = useRef();
  const passwordRef = useRef();

  function login(e) {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    signInWithEmailAndPassword(auth, email, password);
  }

  console.log(currentUser.email);

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
        <div className="inputContainer"></div>
        <button onClick={(e) => login(e)}>Log In</button>
      </form>
      <div className="signupLoginInsteadInfo">
        Don't have an account yet? <Link to="/signup">Sign Up</Link> instead
      </div>
    </div>
  );
}
