import React, { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  onSnapshot,
} from "firebase/firestore";
import uniqid from "uniqid";
import { useCollectionData } from "react-firebase-hooks/firestore";

export default function MessageBoard() {
  const [error, setError] = useState("");
  const [userMessage, setUserMessage] = useState("");
  const [sentMessages, setSentMessages] = useState([]);
  const { currentUser } = useAuth();
  const { logout } = useAuth();
  const navigate = useNavigate();

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

  async function sendMessage(e) {
    e.preventDefault();
    // console.log(e.key);
    try {
      await addDoc(collection(db, "sentMessages"), {
        text: userMessage,
        author: currentUser.email,
        createdAt: serverTimestamp(),
        id: uniqid(),
      });
    } catch (error) {
      console.log(error.code);
    }
    setUserMessage("");
  }

  const messagesQuery = query(collection(db, "sentMessages"));
  const msgs = [];
  const unsubscribe = onSnapshot(messagesQuery, (querySnapshot) => {
    querySnapshot.forEach((message) => {
      msgs.push(message.data());
    });
    // console.log(msgs);
    // setSentMessages([...sentMessages, ...msgs]);
  });
  // console.log(sentMessages);

  // const [test] = useCollectionData(messagesQuery);
  // console.log(test);

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
          <div className="chatMain">
            {sentMessages.map((message) => {
              return <div key={message.id}>{message.text}</div>;
            })}
          </div>
          <div className="chatFooter">
            <textarea
              autoFocus
              maxLength="100"
              rows="3"
              id="messageInput"
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              placeholder="Type a message here"
              // onKeyDown={(e) => sendMessage(e)}
            />
            <button
              className="sendMessageButton"
              onClick={(e) => sendMessage(e)}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
