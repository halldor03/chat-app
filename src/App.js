import React from "react";
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";
import MessageBoard from "./components/MessageBoard";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/signup"
            element={
              <SignUp
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          />
          <Route
            path="/login"
            element={
              <LogIn
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          />
          <Route
            path="/"
            element={<MessageBoard currentUser={currentUser} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}
