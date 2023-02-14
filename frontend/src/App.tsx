import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Cookies from "js-cookie";

function App() {
  const go = () => {
    let hej = {
      userName: "piramm",
      title: "edited post!",
      content: "this post was edited!",
      imageUrl: "k",
      likes: [],
      comments: [],
    };

    fetch("http://localhost:8000/post/63ea12f2baf5e1e8d091a776/delete", {
      method: "DELETE", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZTRiMjk2ZGUxNjM0MGU1NzFjOTMyMCIsImlhdCI6MTY3NjM3Mjg0OSwiZXhwIjoxNjc2NDU5MjQ5fQ.tJVcKKPx-nqkKSGpIwimxLXksnXUVumrDbVMOjYq7oA",
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
