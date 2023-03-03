import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./index.scss";
import Cookies from "js-cookie";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";

import { LoginRegister } from "./components/LoginRegister";
import { NotFound } from "./components/NotFound";
import { Posts } from "./components/Posts";
import { SelectMovie } from "./components/SelectMovie";
import { CreatePost } from "./components/CreatePost";
import { ViewSinglePost } from "./components/ViewSinglePost";
import { UserProfile } from "./components/UserProfile";
import { LayoutNav } from "./components/LayoutNav";

function App() {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  const checkIfLoggedIn = (boolean: boolean) => {
    if (boolean) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <LayoutNav changeLogIn={checkIfLoggedIn} loggedIn={loggedIn} />
          }
        >
          <Route path="/login" element={<LoginRegister />}></Route>
          <Route path="/register" element={<LoginRegister />}></Route>
          <Route
            path="/posts"
            element={<Posts checkCookie={checkIfLoggedIn} />}
          ></Route>
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
