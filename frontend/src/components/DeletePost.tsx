import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import IpostResponse from "../models/response/IpostResponse";
import "../style/DeletePost.scss";

interface IDeletePostProps {
  post: IpostResponse;
  delete(): void;
}

export const DeletePost = (props: IDeletePostProps) => {
  const [showDelete, setShowDelete] = useState<boolean>(true);
  const [post, setPost] = useState<IpostResponse>(props.post);
  const navigate = useNavigate();

  const changeShowDelete = () => {
    setShowDelete(false);
  };

  const submit = () => {
    axios
      .delete("http://localhost:8000/post/" + props.post._id + "/delete", {
        headers: {
          "auth-token": Cookies.get("token")!,
          "Content-Type": "application/json",
        },

        data: {
          post,
        },
      })
      .then((res) => {
        props.delete();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {showDelete ? (
        <div className="deleteDiv">
          <span>Are you sure you want to delete this post?</span>
          <div className="deleteDivBtns">
            <button onClick={changeShowDelete} id="cancelBtn">
              Cancel
            </button>
            <button id="deleteBtn" onClick={submit}>
              Delete
            </button>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
