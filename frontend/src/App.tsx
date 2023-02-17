import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Cookies from "js-cookie";

function App() {
  const go = () => {
    let hej = {
      user: "newUser",
      content: "hello!",
      date: Date.now().toString(),

      // title: "edited post!",
      // content: "this post was edited!",
      // imageUrl: "k",
      // likes: [],
      // comments: [],
    };

    fetch("http://localhost:8000/post/63e36894cac009e73bdf7543/comment", {
      method: "PUT", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZWI0ODJhNGZlYWViZThlMDc5NDkxZiIsImlhdCI6MTY3NjYyNzE4OSwiZXhwIjoxNjc2NzEzNTg5fQ.qmV4cVeAXbXlcM-ChjJ-CsdBfYEnjn0m1JCUDRHJXss",
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
