import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import IpostResponse from "../models/response/IpostResponse";
import { Post } from "./Post";
import "../style/Posts.scss";

export const Posts = () => {
  const navigate = useNavigate();
  const [posts, setposts] = useState<IpostResponse[]>([]);
  console.log(posts);
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
          console.log(res);
          setposts(res.posts);
        });
    }
  };

  let html = posts.map((post, i) => {
    return <Post post={post} key={i}></Post>;
  });

  return (
    <>
      <div className="postsCtn">{html}</div>
    </>
  );
};
