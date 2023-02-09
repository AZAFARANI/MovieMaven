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

    fetch("http://localhost:8000/users", {
      method: "GET", // or 'PUT'
      headers: {
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZTRiMjk2ZGUxNjM0MGU1NzFjOTMyMCIsImlhdCI6MTY3NTkzMzM5NSwiZXhwIjoxNjc2MDE5Nzk1fQ.77tMOjFUZHNlCFlxui86Bq9XAyfZtfDRMH6QXUM9IWg",
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
