import React from "react";

export default function MessageBoard({ currentUser }) {
  console.log(currentUser);
  return (
    <div>
      This is MessageBoard
      <br />
      Logged as {currentUser}
    </div>
  );
}
