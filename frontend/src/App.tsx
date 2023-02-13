import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Cookies from "js-cookie";

function App() {
  const go = () => {
    let hej = {
      userName: "piramm",

      password: "hello123",
    };

    fetch("http://localhost:8000/post/63e36894cac009e73bdf7543", {
      method: "GET", // or 'PUT'
      headers: {
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZTRiMjk2ZGUxNjM0MGU1NzFjOTMyMCIsImlhdCI6MTY3NjI4MTI5OCwiZXhwIjoxNjc2MzY3Njk4fQ.hPAk9uLPBFNiIgerNBXwbjTD5rheyNKUbpQQxx0qsh4",
      },
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
