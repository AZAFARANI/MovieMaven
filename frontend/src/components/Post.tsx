import { Link, useNavigate } from "react-router-dom";
import IpostResponse from "../models/response/IpostResponse";
import "../style/Post.scss";

interface IpostProps {
  post: IpostResponse;
}

export const Post = (props: IpostProps) => {
  let date = new Date(props.post.date);
  const navigate = useNavigate();

  const readPost = () => {
    navigate("/post" + "/" + props.post._id);
  };

  return (
    <>
      <div id="singlePost" onClick={readPost} className="post">
        <div className="imgCtn">
          <img src={props.post.imageUrl}></img>
        </div>
        <div className="authorCtn">
          <div className="iconCtn">
            <img src="/svg/person.svg"></img>
            <span>{props.post.userName}</span>
          </div>
          <span>{date.toLocaleDateString()}</span>
        </div>

        <div className="titleCtn">
          <h3>{props.post.title}</h3>
        </div>

        <div className="authorCtn">
          <div className="iconCtn">
            <img src="/svg/heart-fill.svg"></img>
            <span>{props.post.likes.length} likes</span>
          </div>

          <span>{props.post.comments.length} comments</span>
        </div>
      </div>
    </>
  );
};
