import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import uniqid from "uniqid";
import { useCollectionData } from "react-firebase-hooks/firestore";

export default function MessageBoard() {
  const [error, setError] = useState("");
  const [userMessage, setUserMessage] = useState("");
  const { currentUser } = useAuth();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const messagesQuery = query(
    collection(db, "sentMessages"),
    orderBy("createdAt"),
    limit(25)
  );
  const [sentMessages] = useCollectionData(messagesQuery);

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
        msgID: uniqid(),
      });
    } catch (error) {
      console.log(error.code);
    }
    setUserMessage("");
  }

  // const stringHexNumber =
  //   "#" +
  //   (
  //     parseInt(parseInt("qaz123@o2.pl", 36).toExponential().slice(2, -5), 10) &
  //     0xffffff
  //   )
  //     .toString(16)
  //     .toUpperCase();
  // console.log(stringHexNumber);

  return (
    <>
      <div className="chatBackground">
        <div className="chatContainer">
          <div className="chatHeader">
            <div className="userInfoChat">
              <div className="welcomeMessage">
                Welcome back, {currentUser.email.split("@")[0]}
              </div>
              <div className="profilePhoto">
                {currentUser.email.split("@")[0][0]}
              </div>
            </div>
            <button className="logOutButton" onClick={(e) => logoutUser(e)}>
              Log Out
            </button>
          </div>
          <div className="chatMain">
            {sentMessages &&
              sentMessages.map((message) => {
                return (
                  <div
                    className={
                      message.author === currentUser.email
                        ? "sentMessage"
                        : "receivedMessage"
                    }
                    key={message.msgID}
                  >
                    <div
                      className="messageProfilePhoto"
                      style={
                        {
                          // backgroundColor: stringHexNumber,
                          // backgroundColor: {},
                        }
                      }
                    >
                      {message.author.split("@")[0][0]}
                    </div>
                    <div className="messageText">{message.text}</div>
                  </div>
                );
              })}
          </div>
          <div className="chatFooter">
            <textarea
              autoFocus
              maxLength="200"
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
