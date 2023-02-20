import { useEffect, useState } from "react";
import "../style/login.scss";

export const LoginRegister = () => {
  const [login, setLogin] = useState<boolean>();

  const CheckParams = () => {
    if (window.location.pathname === "/login") {
      console.log("true");
      setLogin(true);
    } else {
      console.log("false");
      setLogin(false);
    }
  };

  useEffect(() => {
    CheckParams();
  }, []);

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
                  <input placeholder="Username..." type="text"></input>
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
              <input placeholder="Enter password..." type="password"></input>
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
              <button className="btn">LOGIN</button>
            ) : (
              <button className="btn">Sign up</button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
