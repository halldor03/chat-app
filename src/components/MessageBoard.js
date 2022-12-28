import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function MessageBoard() {
  const [error, setError] = useState("");
  const { currentUser } = useAuth();
  const { logout } = useAuth();
  const navigate = useNavigate();

  async function logoutUser(e) {
    e.preventDefault();
    try {
      setError("");
      await logout();
      navigate("/login");
    } catch (error) {
      setError("Failed to sign out");
      console.log(error.code);
    }
  }

  // console.log(currentUser);
  // console.log(currentUser.email);

  return (
    <>
      This is MessageBoard
      <br />
      Logged as {currentUser.email}
      <button onClick={(e) => logoutUser(e)}>Log Out</button>
    </>
  );
}
