import { ChangeEvent, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Iuser from "../models/Iuser";

import Cookie from "js-cookie";

import "../style/login.scss";
import Cookies from "js-cookie";

export const LoginRegister = () => {
  const [login, setLogin] = useState<boolean>();
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [cookie, setCookie] = useCookies(["user"]);
  const navigate = useNavigate();

  useEffect(() => {
    CheckParams();
  }, []);

  const CheckParams = () => {
    if (window.location.pathname === "/login") {
      console.log("true");
      setLogin(true);
    } else {
      console.log("false");
      setLogin(false);
    }

    if (Cookies.get("user")) {
      console.log("cookie!");
      navigate("/");
    }
  };

  const setUser = (e: ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };

  const setPass = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    console.log(password);
  };

  const loginUser = () => {
    let user = {
      userName: userName,
      password: password,
    };

    fetch("http://localhost:8000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((res) => {
        Cookies.set("user", res.token, {
          expires: 1,
          secure: true,
          sameSite: "strict",
          path: "/",
        });
        localStorage.setItem("username", res.user);
        navigate("/");
      });
  };
  return (
    <>
      <div className="container">
        <div className="contentCtn">
          {login ? <h2>Login</h2> : <h2>Register</h2>}
          <div className="inputs">
            {!login ? (
              <div className="input">
                {" "}
                <label>Enter email</label>
                <input type="email"></input>
              </div>
            ) : (
              <></>
            )}

            <div className="input">
              {login ? (
                <>
                  <label>Username</label>
                  <input
                    onChange={setUser}
                    placeholder="Username..."
                    type="text"
                  ></input>
                </>
              ) : (
                <div className="input">
                  <label> Select a username</label>
                  <input placeholder="Username..." type="text"></input>
                </div>
              )}
            </div>

            <div className="input">
              <label>Password</label>
              <input
                placeholder="Enter password..."
                type="password"
                onChange={setPass}
              ></input>
            </div>

            {!login ? (
              <div className="input">
                <label>Repeat Password</label>
                <input placeholder="Repeat password..." type="password"></input>
              </div>
            ) : (
              <></>
            )}

            {login ? (
              <span>Register account</span>
            ) : (
              <span>Already Have an account? Sign in!</span>
            )}

            {login ? (
              <button onClick={loginUser} className="btn">
                LOGIN
              </button>
            ) : (
              <button className="btn">Sign up</button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
