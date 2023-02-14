import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Cookies from "js-cookie";

function App() {
  const go = () => {
    let hej = {
      userName: "newUser",

      title: "edited post!",
      content: "this post was edited!",
      imageUrl: "k",
      likes: [],
      comments: [],
    };

    fetch("http://localhost:8000/post/63eb5db8d6ecd94a2efd70f7/edit", {
      method: "PUT", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZWI0ODJhNGZlYWViZThlMDc5NDkxZiIsImlhdCI6MTY3NjM2OTE5NywiZXhwIjoxNjc2NDU1NTk3fQ.qMZQ2fns3D8kEifbqnVBFH5TNkwxgZ4NtUTDEs0f6RE",
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
