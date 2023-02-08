import React from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const go = () => {
    let hej = {
      userName: "hassan2",
      email: "zaf2",
      password: "hello123",
      confirmPassword: "hello123",
    };

    fetch("http://localhost:8000/register", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(hej),
    }).then((res) => console.log(res));
  };
  return (
    <div className="App">
      <button onClick={go}>fetch</button>
    </div>
  );
}

export default App;
