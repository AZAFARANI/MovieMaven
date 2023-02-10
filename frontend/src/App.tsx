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

    fetch("http://localhost:8000/user/Amir", {
      method: "GET", // or 'PUT'
      headers: {
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZTRiMjk2ZGUxNjM0MGU1NzFjOTMyMCIsImlhdCI6MTY3NjAyNTQ2OSwiZXhwIjoxNjc2MTExODY5fQ.I0IH7kcljwh2BPVtHHo0POp3RQX2rRUf2NL2lCkePwM",
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
