import React, { useState, useRef, useEffect } from "react";
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
  const dummy = useRef();
  // const chatMainRef = useRef();

  // function Scrolldown() {
  //   chatMainRef.scroll({
  //     top: 100,
  //     behavior: "smooth",
  //   });
  // }
  // window.onload = Scrolldown;

  useEffect(() => {
    dummy.current.scrollIntoView({ behavior: "smooth" });
  });

  const messagesQuery = query(
    collection(db, "sentMessages"),
    orderBy("createdAt"),
    limit(50)
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
    try {
      await addDoc(collection(db, "sentMessages"), {
        text: userMessage,
        author: currentUser.email,
        createdAt: serverTimestamp(),
        msgID: uniqid(),
        authorID: currentUser.uid,
      });
    } catch (error) {
      console.log(error.code);
    }
    setUserMessage("");
    dummy.current.scrollIntoView({ behavior: "smooth" });
  }

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
          <div
            className="chatMain"
            //  ref={chatMainRef}
          >
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
                      style={{
                        backgroundColor:
                          "#" +
                          (
                            parseInt(
                              parseInt(message.authorID, 36)
                                .toExponential()
                                .slice(2, -5),
                              10
                            ) & 0xffffff
                          )
                            .toString(16)
                            .toUpperCase(),
                      }}
                    >
                      {message.author.split("@")[0][0]}
                    </div>
                    <div className="messageWrapper">
                      <div className="messageInfoWrapper">
                        {message.author !== currentUser.email ? (
                          <div className="messageAuthor">{message.author}</div>
                        ) : null}
                        <div className="messageTime">
                          sent at {""}
                          {message.createdAt &&
                            new Date(
                              message.createdAt.seconds * 1000
                            ).getHours()}
                          :
                          {message.createdAt &&
                            new Date(
                              message.createdAt.seconds * 1000
                            ).getMinutes()}{" "}
                          on{" "}
                          {message.createdAt &&
                            new Date(
                              message.createdAt.seconds * 1000
                            ).getDate()}
                          .
                          {message.createdAt &&
                            new Date(
                              message.createdAt.seconds * 1000
                            ).getMonth() + 1}
                        </div>
                      </div>
                      <div className="messageText">{message.text}</div>
                    </div>
                  </div>
                );
              })}
            <p ref={dummy}></p>
          </div>
          <div className="chatFooter">
            <textarea
              autoFocus
              maxLength="320"
              rows="2"
              id="messageInput"
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              placeholder="Type a message here"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  sendMessage(e);
                }
              }}
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
