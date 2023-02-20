import { useState } from "react";
import { useCookies } from "react-cookie";
import { Outlet, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "../style/layout.scss";

export const Home = () => {
  const [cookie, setCookie, removeCookie] = useCookies(["user"]);
  const navigate = useNavigate();

  const logOut = () => {
    Cookies.remove("user");
    navigate("/login");
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
