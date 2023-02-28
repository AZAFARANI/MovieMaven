import React from "react";
import logo from "./logo.svg";
import "./index.scss";
import Cookies from "js-cookie";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./components/Home";
import { LoginRegister } from "./components/LoginRegister";
import { NotFound } from "./components/NotFound";
import { Posts } from "./components/Posts";
import { SelectMovie } from "./components/SelectMovie";
import { CreatePost } from "./components/CreatePost";
import { ViewSinglePost } from "./components/ViewSinglePost";
import { UserProfile } from "./components/UserProfile";

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
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/login" element={<LoginRegister />}></Route>
          <Route path="/register" element={<LoginRegister />}></Route>
          <Route path="/posts" element={<Posts />}></Route>
          <Route path="/selectMovie" element={<SelectMovie />}></Route>
          <Route path="/CreatePost/:id" element={<CreatePost />}></Route>
          <Route path="/post/:id" element={<ViewSinglePost />}></Route>
          <Route path="/user/:id" element={<UserProfile />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
