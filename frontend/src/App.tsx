import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Cookies from "js-cookie";

function App() {
  const go = () => {
    let hej = {
      userName: "piramm",
      title: "hello123",
      content: "hello this is my second post!",
      imageUrl: "palwdp",
    };

    fetch("http://localhost:8000/newpost", {
      method: "POST", // or 'PUT'
      headers: {
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZTRiMjk2ZGUxNjM0MGU1NzFjOTMyMCIsImlhdCI6MTY3NjI4MTI5OCwiZXhwIjoxNjc2MzY3Njk4fQ.hPAk9uLPBFNiIgerNBXwbjTD5rheyNKUbpQQxx0qsh4",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(hej),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
      });
  };
  return (
    <div className="App">
      <button onClick={go}>fetch</button>
    </div>
  );
}

export default App;
