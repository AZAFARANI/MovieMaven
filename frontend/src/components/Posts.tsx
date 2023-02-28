import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import IpostResponse from "../models/response/IpostResponse";
import { Post } from "./Post";
import "../style/Posts.scss";

export const Posts = () => {
  const navigate = useNavigate();
  const [posts, setposts] = useState<IpostResponse[]>([]);
  useEffect(() => {
    checkCookie();
  }, []);

  const checkCookie = () => {
    if (!Cookies.get("token")) {
      navigate("/login");
    } else {
      fetch("http://localhost:8000/posts", {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          "auth-token": Cookies.get("token")!,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          setposts(res.posts);
        });
    }
  };

  let html = posts.map((post, i) => {
    return <Post post={post} key={i}></Post>;
  });

  return (
    <>
      <div className="postsCnt1">
        <div className="heading">
          <div className="h1">
            <h1>All reviews</h1>
            <Link to={"/selectMovie"}>
              <button className="createBtn">+ CREATE REVIEW</button>
            </Link>
          </div>

          <div className="filter">
            <h2>Filter reviews by:</h2>
            <div className="filterOptions">
              <div className="optionItem">Most liked</div>
              <div className="optionItem">Most recent</div>
            </div>

            <div className="filterSearch">
              <input placeholder="Search reviews..." type="text"></input>
            </div>
          </div>
        </div>

        <div className="postsCtn2">{html}</div>
      </div>
    </>
  );
};
