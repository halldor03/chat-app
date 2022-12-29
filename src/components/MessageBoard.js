import React, { useState, useRef } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function MessageBoard() {
  const [error, setError] = useState("");
  const { currentUser } = useAuth();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const messageRef = useRef();

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

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

  const userName = currentUser.email.split("@")[0];
  const userAvatar = userName[0];

  return (
    <>
      <div className="chatBackground">
        <div className="chatContainer">
          <div className="chatHeader">
            <div className="userInfoChat">
              <div className="welcomeMessage">Welcome back, {userName}</div>
              <div className="profilePhoto">{userAvatar}</div>
            </div>
            <button className="logOutButton" onClick={(e) => logoutUser(e)}>
              Log Out
            </button>
          </div>
          <div className="chatMain"></div>
          <div className="chatFooter">
            <input
              autoFocus
              type="text"
              id="messageInput"
              ref={messageRef}
              placeholder="Type a message here"
            />
            <button className="sendMessageButton">Send</button>
          </div>
        </div>
      </div>
    </>
  );
}
