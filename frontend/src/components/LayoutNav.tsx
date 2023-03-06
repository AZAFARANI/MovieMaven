import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

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

    console.log("nav is going");
    if (!Cookies.get("token")) {
      navigate("/login");
    }
  }, [props.loggedIn]);

  const logOut = () => {
    if (click) {
      setClick(!click);
    }
    Cookies.remove("token");
    setLogged(false);
    props.changeLogIn(false);
    navigate("/login");
  };

  return (
    <>
      {!click ? (
        <div id="layoutNav" className="nav">
          <div className="logo">
            <div className="logoSection">
              <h1 id="white">Movie</h1>
              <h1 id="blue">Maven</h1>
            </div>
          </div>
          {loggedIn ? (
            <>
              <div className="linksSection">
                <Link to="/">
                  <span id="extendedLinkReviews">Reviews</span>
                </Link>
                <Link to="/selectMovie">
                  <span id="extendedLinkCreate">Create Review</span>
                </Link>
                <Link to={"/user/" + Cookies.get("user")}>
                  <span id="extendedLinkProfile">My profile</span>
                </Link>
              </div>

              <button id="logOutBtn" onClick={logOut}>
                Sign out
              </button>
            </>
          ) : (
            <></>
          )}

          {loggedIn ? (
            <img
              id="navHamburger"
              onClick={() => {
                setClick(!click);
              }}
              src="/svg/list.svg"
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
            src="/svg/list.svg"
          ></img>

          <div className="logoSection">
            <h1 id="white">Movie</h1>
            <h1 id="blue">Maven</h1>
          </div>

          <div className="linksSection">
            <Link
              to="/"
              onClick={() => {
                setClick(!click);
              }}
            >
              <span id="MobileNavLinkReviews">Reviews</span>
            </Link>
            <Link
              to="/selectMovie"
              onClick={() => {
                setClick(!click);
              }}
            >
              <span id="MobileNavLinkCreate">Create Review</span>
            </Link>
            <Link
              onClick={() => {
                setClick(!click);
              }}
              to={"/user/" + Cookies.get("user")}
            >
              <span id="MobileNavLinkProfile">My profile</span>
            </Link>
          </div>
          <div>
            <button id="MobileNavSignOut" onClick={logOut}>
              sign out
            </button>
          </div>
        </div>
      ) : (
        <></>
      )}
      <Outlet></Outlet>;
    </>
  );
};
