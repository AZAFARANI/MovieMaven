import { useState } from "react";
import { useCookies } from "react-cookie";
import { Outlet, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "../style/layout.scss";
import Ipost from "../models/Ipost";

export const Home = () => {
  const [cookie, setCookie, removeCookie] = useCookies(["user"]);
  const navigate = useNavigate();

  const logOut = () => {
    Cookies.remove("user");
    navigate("/login");
  };

  const go = () => {
    let post = {
      user: Cookies.get("user")!,
      content: "hello this is comment!",
      date: new Date().toLocaleDateString(),

      // title: "this movie sucks!",
      // content: "star wars sucked ass!",
      // imageUrl: "../assets/images/pexels-photo-3183183.jpeg",
    };

    console.log(JSON.stringify(post));
    fetch("http://localhost:8000/post/63f62f117568c419ecaeffb5/comment", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": Cookies.get("token")!,
      },
      body: JSON.stringify(post),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
      });
  };
  return (
    <>
      <div className="nav">
        <span onClick={logOut}>Log out</span>
      </div>
      <Outlet></Outlet>
      <button onClick={go}>fetch</button>
    </>
  );
};
