import axios from "axios";
import Cookies from "js-cookie";
import { ChangeEvent, useEffect, useState } from "react";
import IpostResponse from "../models/response/IpostResponse";
import "../style/EditPost.scss";

interface IEditPostProps {
  editPost(post: string): void;
  post: IpostResponse;
}

export const EditPost = (props: IEditPostProps) => {
  const [post, setPost] = useState<string>(props.post.content);

  const setContent = () => {
    setPost(props.post.content);
  };
  const changeContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setPost(e.target.value);
  };

  const submitEdit = () => {
    props.editPost(post);
    let editedPost = {
      userName: Cookies.get("user")!,
      content: post,
    };
    axios
      .put(
        "http://localhost:8000/post/" + props.post._id + "/edit",
        editedPost,
        {
          headers: {
            "auth-token": Cookies.get("token")!,
          },
        }
      )
      .then((res) => {
        console.log(res);
      });
  };

  return (
    <>
      {post !== " " ? (
        <div className="editPostCtn">
          <textarea value={post} onChange={changeContent}></textarea>
          <button onClick={submitEdit}>Edit</button>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
