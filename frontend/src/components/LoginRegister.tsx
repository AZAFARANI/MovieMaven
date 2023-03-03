import { ChangeEvent, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import Iuser from "../models/Iuser";

import Cookie from "js-cookie";

import "../style/login.scss";
import Cookies from "js-cookie";
import axios from "axios";

export const LoginRegister = () => {
  const [login, setLogin] = useState<boolean>();
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPass, setConfirmPass] = useState<string>("");
  const [cookie, setCookie] = useCookies(["user"]);
  const [email, setEmail] = useState<string>("");
  const [showError, setShowError] = useState<boolean>(false);
  const [registerErr, setRegisterErr] = useState<boolean>(false);
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

    if (Cookies.get("token")) {
      console.log("cookie!");

      navigate("/posts");
    }
  };

  const setUser = (e: ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };

  const setPass = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const confirmPassword = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmPass(e.target.value);
  };

  const emailInput = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const loginUser = () => {
    let user = {
      userName: userName,
      password: password,
    };

    axios
      .post("http://localhost:8000/login", user)
      .then((res: any) => {
        if (!res.data.token || res.data.success === "false") {
          setShowError(!showError);
          console.log("mleöaöle");
        } else {
          Cookies.set("token", res.data.token, {
            expires: 1,
            secure: true,
            sameSite: "strict",
            path: "/",
          });

          Cookies.set("user", res.data.user, {
            expires: 1,
            secure: true,
            sameSite: "strict",
            path: "/",
          });

          navigate("/posts");
        }
      })
      .catch((res) => {
        if (res.success === "false" || !res.token) {
          setShowError(!showError);
        }
        console.log(res);
      });
  };

  const registerUser = () => {
    // const { userName, email, password, confirmPassword } = req.body;

    let user = {
      userName: userName,
      email: email,
      password: password,
      confirmPassword: confirmPass,
    };

    axios
      .post("http://localhost:8000/register", user)

      .then((res: any) => {
        if (!res.data.token) {
          setRegisterErr(true);
          return;
        }

        Cookies.set("token", res.data.token, {
          expires: 1,
          secure: true,
          sameSite: "strict",
          path: "/",
        });

        Cookies.set("user", res.data.user, {
          expires: 1,
          secure: true,
          sameSite: "strict",
          path: "/",
        });

        navigate("/posts");
      })
      .catch(() => {
        setRegisterErr(true);
      });
  };

  const changeLogin = () => {
    setLogin(!login);
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
                <input
                  placeholder="Email..."
                  onChange={emailInput}
                  type="email"
                ></input>
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
                <>
                  <label> Select a username</label>
                  <input
                    onChange={setUser}
                    placeholder="Username..."
                    type="text"
                  ></input>
                </>
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
                <input
                  onChange={confirmPassword}
                  placeholder="Repeat password..."
                  type="password"
                ></input>
              </div>
            ) : (
              <></>
            )}

            {login ? (
              <span onClick={changeLogin}>Register account</span>
            ) : (
              <span onClick={changeLogin}>
                Already Have an account? Sign in!
              </span>
            )}

            {showError ? (
              <span className="errorSpan">Incorrect username or password!</span>
            ) : (
              <></>
            )}

            {registerErr ? (
              <span className="errorSpan">
                Username or email already in use!
              </span>
            ) : (
              <></>
            )}

            {login ? (
              <button onClick={loginUser} className="btn">
                LOGIN
              </button>
            ) : (
              <button onClick={registerUser} className="btn">
                Sign up
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
