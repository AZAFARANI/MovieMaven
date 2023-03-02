import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import "../style/layout.scss";

interface ILayoutProps {
  loggedIn: boolean;
  changeLogIn(bool: boolean): void;
}

export const LayoutNav = (props: ILayoutProps) => {
  const [click, setClick] = useState(false);
  const [loggedIn, setLogged] = useState<boolean>(props.loggedIn);
  const [logged2, setLogged2] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLogged(props.loggedIn);
  }, [props.loggedIn]);

  const logOut = () => {
    Cookies.remove("token");
    setLogged(false);
    props.changeLogIn(false);
    navigate("/login");
  };

  return (
    <>
      {!click ? (
        <div className="nav">
          <div className="logo">
            <div className="logoSection">
              <h1 id="white">Movie</h1>
              <h1 id="blue">Maven</h1>
            </div>
          </div>
          {loggedIn ? (
            <>
              <div className="linksSection">
                <span>Reviews</span>
                <span>Create Review</span>
                <span>My profile</span>
              </div>

              <button onClick={logOut}>Sign out</button>
            </>
          ) : (
            <></>
          )}

          {loggedIn ? (
            <img
              onClick={() => {
                setClick(!click);
              }}
              src="/svg/chat-dots.svg"
            ></img>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <></>
      )}
      {click ? (
        <div className="navExtended">
          <img
            id="close"
            onClick={() => {
              setClick(!click);
            }}
            src="/svg/chat-dots.svg"
          ></img>

          <div className="logoSection">
            <h1 id="white">Movie</h1>
            <h1 id="blue">Maven</h1>
          </div>

          <div className="linksSection">
            <span>Reviews</span>
            <span>Create Review</span>
            <span>My profile</span>
          </div>

          <div>
            <button onClick={logOut}>sign out</button>
          </div>
        </div>
      ) : (
        <></>
      )}
      <Outlet></Outlet>;
    </>
  );
};
