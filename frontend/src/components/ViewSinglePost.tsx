import axios from "axios";
import Cookies from "js-cookie";
import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import IpostResponse from "../models/response/IpostResponse";
import MovieExtended from "../models/response/MovieExtended";
import "../style/singlePost.scss";
import { DeletePost } from "./DeletePost";
import { EditPost } from "./EditPost";

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
  const [comment, setComment] = useState<string>("");
  const [showComment, setShowComment] = useState<boolean>(false);
  const [showEdit, setShowEdit] = useState<boolean>();
  const [showInput, setShowInput] = useState<boolean>(false);
  const [showDelete, setShowDelete] = useState<boolean>(false);

  let params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!Cookies.get("token")) {
      navigate("/login");
    }

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

        if (res.post.userName === Cookies.get("user")) {
          setShowEdit(true);
        } else {
          setShowEdit(false);
        }
      });

    window.scrollTo(0, 100);
  }, []);

  const likePost = () => {
    let like = {
      user: Cookies.get("user")!,
    };

    axios
      .put("http://localhost:8000/post/" + params.id + "/like", like, {
        headers: {
          "auth-token": Cookies.get("token")!,
        },
      })
      .then((res) => {
        console.log(res);
        setLiked(!liked);
        let tempLike: any = { ...post };
        tempLike.likes.push({ user: Cookies.get("user")! });
      });
  };

  const unlikePost = () => {
    let unlike = {
      user: Cookies.get("user")!,
    };

    axios
      .put("http://localhost:8000/post/" + params.id + "/unlike", unlike, {
        headers: {
          "auth-token": Cookies.get("token")!,
        },
      })
      .then((res) => {
        setLiked(!liked);
        let tempUnlike: [] = [...post.likes];
        let index = tempUnlike.findIndex((l) => l["user"] === unlike.user);
        tempUnlike.splice(index, 1);
        let tempPost = { ...post };
        tempPost.likes = tempUnlike;
        setPost(tempPost);
      });
  };

  const changeShowComment = () => {
    setShowComment(!showComment);
  };

  const setCommentValue = (e: ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
    console.log(comment);
  };

  const postComment = () => {
    let value = {
      user: Cookies.get("user")!,
      content: comment,
      date: new Date().toLocaleDateString(),
    };
    axios
      .put("http://localhost:8000/post/" + params.id + "/comment", value, {
        headers: {
          "auth-token": Cookies.get("token")!,
        },
      })
      .then((res) => {
        console.log(res);
        setShowComment(!showComment);
        let tempComment: any = { ...post };

        tempComment.comments.push(value);

        setPost(tempComment);
      });
  };

  const changeShowInput = () => {
    setShowInput(!showInput);
  };

  const edit = (newPost: string) => {
    let tempPost = { ...post };
    tempPost.content = newPost;
    setPost(tempPost);
    setShowInput(!showInput);
  };

  const ShowdeletePost = () => {
    setShowDelete(!showDelete);
  };

  const deletePost = () => {
    setShowDelete(!showDelete);
    navigate("/posts");
  };

  const goToUser = () => {
    navigate("/user" + "/" + post.userName);
  };

  let date = new Date(post.date);

  return (
    <>
      <div className="postCtn">
        <img
          onClick={() => {
            navigate("/posts");
          }}
          id="arrow"
          src="/svg/arrow-left.svg"
        ></img>
        {showEdit ? (
          <div className="editSection">
            <img onClick={changeShowInput} src="/svg/pencil-square.svg"></img>
            <img onClick={ShowdeletePost} src="/svg/trash.svg"></img>
          </div>
        ) : (
          <></>
        )}
        <div onClick={goToUser} className="authorCtn">
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
              <img onClick={unlikePost} src="/svg/heart-fill.svg"></img>
            ) : (
              <img onClick={likePost} src="/svg/heart.svg"></img>
            )}
            <span>{post.likes.length} likes</span>
          </div>

          <span>{date.toLocaleDateString()}</span>
        </div>
        {!showInput ? (
          <div className="content">
            <span>{post.content}</span>
          </div>
        ) : (
          <></>
        )}
        {!showInput ? (
          <div className="comments">
            {!showComment ? (
              <div className="icon">
                <img src="/svg/chat-dots.svg"></img>
                <span>{post.comments.length} comments</span>
                {post.comments.map((c, i) => {
                  return (
                    <div className="comment" key={i}>
                      <div className="icon2">
                        <img src="/svg/person.svg"></img>
                        <span>{c["user"]}</span>
                      </div>
                      <div className="cnt">
                        <span>” {c["content"]} ”</span>
                      </div>

                      <div className="cnt">
                        <span>{c["date"]}</span>
                      </div>
                    </div>
                  );
                })}
                <button onClick={changeShowComment}>Post comment</button>
              </div>
            ) : (
              <div className="postComment">
                <input
                  onChange={setCommentValue}
                  type="text"
                  placeholder="enter your comment here..."
                ></input>
                <button onClick={postComment}>Post</button>
                <span onClick={changeShowComment} id="cancel">
                  cancel
                </span>
              </div>
            )}
          </div>
        ) : (
          <></>
        )}

        {post.content && showInput ? (
          <EditPost post={post} editPost={edit}></EditPost>
        ) : (
          <></>
        )}

        {showDelete && post ? (
          <DeletePost post={post} delete={deletePost}></DeletePost>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};
