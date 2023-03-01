import Cookies from "js-cookie";
import { ChangeEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import IpostResponse from "../models/response/IpostResponse";
import { Post } from "./Post";
import "../style/Posts.scss";

export const Posts = () => {
  const navigate = useNavigate();
  const [posts, setposts] = useState<IpostResponse[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showByDates, setShowDates] = useState<boolean>(false);
  const [postsBySearch, setPostsBySearch] = useState<IpostResponse[]>([]);
  const [postsByDate, setPostsByDate] = useState<IpostResponse[]>([]);
  const [postsByLikes, setPostsByLikes] = useState<IpostResponse[]>([]);
  const [showByLikes, setShowByLikes] = useState<boolean>(false);
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
          setposts(res.posts);
        });
    }
  };

  const setSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);

    let list: IpostResponse[] = posts.filter(
      (post) =>
        post.title.toUpperCase().indexOf(searchTerm.toUpperCase()) > -1 ||
        post.userName.toUpperCase().indexOf(searchTerm.toUpperCase()) > -1
    );

    setPostsBySearch(list);
  };

  const FilterByDate = () => {};

  const setShowDatesFalse = () => {
    setShowDates(false);
    let oldest = posts.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    setposts(oldest);
  };

  const setShowDatesTrue = () => {
    let listt: IpostResponse[] = posts.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    setPostsByDate(listt);
    setShowDates(true);
  };

  const mostLiked = () => {
    let mostLikes = posts.sort((a, b) => b.likes.length - a.likes.length);
    setPostsByLikes(mostLikes);
    setShowByLikes(true);
  };

  const setShowLikesFalse = () => {
    let oldest = posts.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    setposts(oldest);
    setShowByLikes(false);
  };

  let html = posts.map((post, i) => {
    return <Post post={post} key={i}></Post>;
  });

  let postsFilteredBySearch = postsBySearch.map((post, i) => {
    return <Post post={post} key={i}></Post>;
  });

  let postsFilteredByDate = postsByDate.map((post, i) => {
    return <Post post={post} key={i}></Post>;
  });

  let postsFilteredByLikes = postsByLikes.map((post, i) => {
    return <Post post={post} key={i}></Post>;
  });

  return (
    <>
      <div className="postsCnt1">
        <div className="heading">
          <div className="h1">
            <h1>All reviews</h1>
            <Link to={"/selectMovie"}>
              <button className="createBtn">+ CREATE REVIEW</button>
            </Link>
          </div>

          <div className="filter">
            <h2>Filter reviews by:</h2>
            <div className="filterOptions">
              {!showByLikes ? (
                <div onClick={mostLiked} className="optionItem">
                  Most liked
                </div>
              ) : (
                <div onClick={setShowLikesFalse} className="optionItem clicked">
                  Most liked
                </div>
              )}

              {!showByDates ? (
                <div onClick={setShowDatesTrue} className="optionItem">
                  Most recent
                </div>
              ) : (
                <div onClick={setShowDatesFalse} className="optionItem clicked">
                  Most recent
                </div>
              )}
            </div>

            <div className="filterSearch">
              <input
                onChange={setSearch}
                placeholder="Search reviews..."
                type="text"
              ></input>
            </div>
          </div>
        </div>

        {!searchTerm && !showByDates && !showByLikes ? (
          <div className="postsCtn2">{html}</div>
        ) : (
          <></>
        )}

        {searchTerm && !showByDates ? (
          <div className="postsCtn2">{postsFilteredBySearch}</div>
        ) : (
          <></>
        )}
        {!searchTerm && showByDates ? (
          <div className="postsCtn2">{postsFilteredByDate}</div>
        ) : (
          <></>
        )}

        {showByLikes && !searchTerm ? (
          <div className="postsCtn2">{postsFilteredByLikes}</div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};
