import axios from "axios";
import Cookies from "js-cookie";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IpostResponse } from "../models/response/IpostResponse";

import MovieExtended from "../models/response/MovieExtended";
import "../style/singlePost.scss";
import { DeletePost } from "./DeletePost";
import { EditPost } from "./EditPost";

export const ViewSinglePost = () => {
  const [post, setPost] = useState<IpostResponse>({
    post: {
      _id: "",
      userName: "",
      title: "",
      content: "",
      imageUrl: "",
      date: new Date(),
      likes: [],
      comments: [],
    },
  });
  const [liked, setLiked] = useState<boolean>();
  const [comment, setComment] = useState<string>("");
  const [showComment, setShowComment] = useState<boolean>(false);
  const [showEdit, setShowEdit] = useState<boolean>();
  const [showInput, setShowInput] = useState<boolean>(false);
  const [showDelete, setShowDelete] = useState<boolean>(false);

  let params = useParams();
  const ref = useRef<null | HTMLDivElement>(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (!Cookies.get("token")) {
      navigate("/login");
    }
    axios
      .get<IpostResponse>("http://localhost:8000/post/" + params.id, {
        headers: {
          "auth-token": Cookies.get("token")!,
        },
      })
      .then((res) => {
        console.log(res.data.post);
        setPost(res.data);
        let likes: [] = res.data.post.likes;

        if (likes.some((user) => user["user"] === Cookies.get("user"))) {
          setLiked(true);
        } else {
          setLiked(false);
        }

        if (res.data.post.userName === Cookies.get("user")) {
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
        tempLike.post.likes.push({ user: Cookies.get("user")! });
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
        let tempUnlike: [] = [...post.post.likes];
        let index = tempUnlike.findIndex((l) => l["user"] === unlike.user);
        tempUnlike.splice(index, 1);
        let tempPost = { ...post };
        tempPost.post.likes = tempUnlike;
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

        tempComment.post.comments.push(value);

        setPost(tempComment);
      });
  };

  const changeShowInput = () => {
    if (!showInput) {
      setShowInput(true);
      ref.current?.scrollIntoView({ behavior: "smooth" });
    } else {
      setShowInput(false);
    }
  };

  const edit = (newPost: string) => {
    let tempPost = { ...post };
    tempPost.post.content = newPost;
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
    navigate("/user" + "/" + post.post.userName);
  };

  let date = new Date(post.post.date);

  return (
    <>
      <div className="postCtn">
        <img
          onClick={() => {
            navigate(-1);
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
          <h1>{post.post.userName}</h1>
        </div>
        <div className="titleCtn">
          <h1>{post.post.title}</h1>
        </div>
        <div className="imgCtn">
          <img src={post.post.imageUrl}></img>
        </div>
        <div ref={ref} className="likesCtn">
          <div className="like">
            {liked ? (
              <img onClick={unlikePost} src="/svg/heart-fill.svg"></img>
            ) : (
              <img onClick={likePost} src="/svg/heart.svg"></img>
            )}
            <span>{post.post.likes.length} likes</span>
          </div>

          <span>{date.toLocaleDateString()}</span>
        </div>
        {!showInput ? (
          <div className="content">
            <span>{post.post.content}</span>
          </div>
        ) : (
          <></>
        )}
        {!showInput ? (
          <div className="comments">
            {!showComment ? (
              <div className="icon">
                <img src="/svg/chat-dots.svg"></img>
                <span>{post.post.comments.length} comments</span>
                {post.post.comments.map((c, i) => {
                  return (
                    <div className="comment" key={i}>
                      <div className="icon2">
                        <img src="/svg/person copy.svg"></img>
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

        {post.post.content && showInput ? (
          <EditPost post={post.post} editPost={edit}></EditPost>
        ) : (
          <></>
        )}

        {showDelete && post ? (
          <DeletePost post={post.post} delete={deletePost}></DeletePost>
        ) : (
          <></>
        )}

        {showInput ? (
          <span onClick={changeShowInput} className="canceledit">
            cancel
          </span>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};
