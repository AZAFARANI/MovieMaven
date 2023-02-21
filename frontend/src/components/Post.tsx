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
          <img src={props.post.imageUrl}></img>
        </div>
        <div className="titleCtn">
          <div className="iconCtn">
            <img src="/svg/person-circle.svg"></img>
            <span>{props.post.userName}</span>
          </div>

          <h3>{props.post.title}</h3>
        </div>

        <div className="likesCtn">
          <div className="iconCtn">
            <img src="/svg/heart-fill.svg"></img>
            <span>{props.post.likes.length} likes</span>
          </div>

          <span>{date.toLocaleDateString()}</span>
        </div>
      </div>
    </>
  );
};
