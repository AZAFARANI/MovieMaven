import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import IpostResponse from "../models/response/IpostResponse";
import IUserResponse from "../models/response/IUserResponse";
import "../style/UserProfile.scss";
import { Post } from "./Post";

export const UserProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<IUserResponse>({
    _id: "",
    userName: "",
    email: "",
    password: "",
    registered: "",
  });
  const [posts, setPosts] = useState<IpostResponse[]>([
    {
      _id: "",
      userName: "",
      title: "",
      content: "",
      imageUrl: "",
      date: new Date(),
      likes: [],
      comments: [],
    },
  ]);

  const [shouldFetch, setShouldFetch] = useState<boolean>(true);

  const params = useParams();
  useEffect(() => {
    if (!Cookies.get("token")) {
      navigate("/login");
    }
    axios
      .get("http://localhost:8000/user/" + params.id!, {
        headers: {
          "auth-token": Cookies.get("token")!,
        },
      })
      .then((res) => {
        setUser(res.data.user);
      });
  }, []);

  useEffect(() => {
    if (user._id.length != 0) {
      axios
        .get("http://localhost:8000/posts", {
          headers: {
            "auth-token": Cookies.get("token")!,
          },
        })
        .then((res) => {
          setPosts(filterPosts(res.data.posts));
        });
    }
  }, [user]);

  const filterPosts = (posts: IpostResponse[]) => {
    const list = posts.filter((post) => post.userName === user.userName);

    return list;
  };

  let html = posts.map((post, i) => {
    return <Post post={post} key={i}></Post>;
  });

  return (
    <>
      <div className="postsCnt1">
        <div className="userProfileCtn">
          <div className="userImage">
            <img src="/images/person.jpg"></img>
          </div>

          <div className="userInfo">
            <h1>Username: {user?.userName}</h1>
            <h1>Email: {user?.email}</h1>
            <h1>Member since: {user?.registered}</h1>
          </div>

          <h1 id="reviewsHeading">{posts.length} Reviews</h1>
          <div className="postsCtn2">{html}</div>
        </div>
      </div>
    </>
  );
};
