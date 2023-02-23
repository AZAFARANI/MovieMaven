import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import IpostResponse from "../models/response/IpostResponse";
import MovieExtended from "../models/response/MovieExtended";
import "../style/singlePost.scss";

export const ViewSinglePost = () => {
  const [post, setPost] = useState<IpostResponse>({
    _id: "",
    userName: "",
    title: "",
    content: "",
    imageUrl: "",
    date: new Date(),
    likes: [],
    comments: [],
  });
  const [liked, setLiked] = useState<boolean>();

  let params = useParams();

  useEffect(() => {
    fetch("http://localhost:8000/post/" + params.id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": Cookies.get("token")!,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setPost(res.post);
        let likes: [] = res.post.likes;

        if (likes.some((user) => user["user"] === Cookies.get("user"))) {
          setLiked(true);
        } else {
          setLiked(false);
        }
      });
  }, []);

  let date = new Date(post.date);

  return (
    <>
      <div className="postCtn">
        <div className="authorCtn">
          <img src="/svg/person-circle.svg"></img>
          <h1>{post.userName}</h1>
        </div>

        <div className="titleCtn">
          <h1>{post.title}</h1>
        </div>
        <div className="imgCtn">
          <img src={post.imageUrl}></img>
        </div>

        <div className="likesCtn">
          <div className="like">
            {liked ? (
              <img src="/svg/heart-fill.svg"></img>
            ) : (
              <img src="/svg/heart.svg"></img>
            )}
            <span>{post.likes.length} likes</span>
          </div>

          <span>{date.toLocaleDateString()}</span>
        </div>

        <div className="content">
          <span>{post.content}</span>
        </div>

        <div className="comments">
          <div className="icon">
            <img src="/svg/chat-dots.svg"></img>
            <span>{post.comments.length} comments</span>¨
            {post.comments.map((c, i) => {
              return (
                <div className="comment">
                  <div className="icon2">
                    <img src="/svg/person.svg"></img>
                    <span>{c["user"]}</span>
                  </div>
                  <div className="cnt">
                    <span>{c["content"]}</span>
                  </div>

                  <div className="cnt">
                    <span>{c["date"]}</span>
                  </div>
                </div>
              );
            })}
            <button>Post comment</button>
          </div>
        </div>
      </div>
    </>
  );
};
