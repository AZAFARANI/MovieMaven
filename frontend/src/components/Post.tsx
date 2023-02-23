import { Link } from "react-router-dom";
import IpostResponse from "../models/response/IpostResponse";
import "../style/Post.scss";

interface IpostProps {
  post: IpostResponse;
}

export const Post = (props: IpostProps) => {
  let date = new Date(props.post.date);

  return (
    <>
      <div className="post">
        <div className="imgCtn">
          <Link to={"/post/" + props.post._id}>
            {" "}
            <img src={props.post.imageUrl}></img>
          </Link>
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
