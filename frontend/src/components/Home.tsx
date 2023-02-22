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
    let post: Ipost = {
      userName: Cookies.get("user")!,
      title: "this movie sucks!",
      content: "star wars sucked ass!",
      imageUrl: "../assets/images/pexels-photo-3183183.jpeg",
    };

    console.log(JSON.stringify(post));
    fetch("http://localhost:8000/newpost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZTRiMjk2ZGUxNjM0MGU1NzFjOTMyMCIsImlhdCI6MTY3Njk3MjY0NCwiZXhwIjoxNjc3MDU5MDQ0fQ.NMyOufqnso-z4WqDvIdxoPVjYe-hViR6xPSSNpMztxY",
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
    </>
  );
};
