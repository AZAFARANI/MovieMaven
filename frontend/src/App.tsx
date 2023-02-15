import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Cookies from "js-cookie";

function App() {
  const go = () => {
    let hej = {
      user: "newUser",

      // title: "edited post!",
      // content: "this post was edited!",
      // imageUrl: "k",
      // likes: [],
      // comments: [],
    };

    fetch("http://localhost:8000/post/63ea12892b5428e7c8872a19/unlike", {
      method: "PUT", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZWI0ODJhNGZlYWViZThlMDc5NDkxZiIsImlhdCI6MTY3NjQ1NjE1MiwiZXhwIjoxNjc2NTQyNTUyfQ.tZwZThBgSeYE_Ycywy6RiNgTiWkJBo85N4Q3JjaOoYE",
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
