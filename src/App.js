import React from "react";
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";
import MessageBoard from "./components/MessageBoard";
import NoPageFound from "./components/NoPageFound";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthProvider from "./contexts/AuthContext";
import PrivateRoute from "./components/PrivateRoute";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<LogIn />} />
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <MessageBoard />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<NoPageFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}
