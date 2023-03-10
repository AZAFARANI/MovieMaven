import Cookies from "js-cookie";
import { ChangeEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import IpostResponse from "../models/response/IpostResponse";
import { Post } from "./Post";
import "../style/Posts.scss";
import axios from "axios";

interface IPostsProps {
  checkCookie(boolean: boolean): void;
}

export const Posts = (props: IPostsProps) => {
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
      props.checkCookie(true);
      axios
        .get("http://localhost:8000/posts", {
          headers: {
            "auth-token": Cookies.get("token")!,
          },
        })
        .then((res: any) => {
          setposts(res.data.posts);
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
    setShowByLikes(false);
    let listt: IpostResponse[] = posts.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    setPostsByDate(listt);
    setShowDates(true);
  };

  const mostLiked = () => {
    setShowDates(false);
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
              <button id="postsCreateBtn" className="createBtn">
                + CREATE REVIEW
              </button>
            </Link>
          </div>

          {posts.length > 0 ? (
            <div className="filter">
              <h2>Filter reviews by:</h2>
              <div className="filterOptions">
                {!showByLikes ? (
                  <div onClick={mostLiked} className="optionItem">
                    Most liked
                  </div>
                ) : (
                  <div
                    onClick={setShowLikesFalse}
                    className="optionItem clicked"
                  >
                    Most liked
                  </div>
                )}

                {!showByDates ? (
                  <div
                    id="mostRecentBtn"
                    onClick={setShowDatesTrue}
                    className="optionItem"
                  >
                    Most recent
                  </div>
                ) : (
                  <div
                    onClick={setShowDatesFalse}
                    className="optionItem clicked"
                  >
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
          ) : (
            <></>
          )}
        </div>

        {!searchTerm && !showByDates && !showByLikes ? (
          <div id="postsContainer" className="postsCtn2">
            {html}
          </div>
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

      {posts.length < 1 ? (
        <div className="nopostsyet">
          <div className="notfoundCnt">
            <img src="/images/clipboard.jpg"></img>
          </div>

          <h1>No reviews yet!</h1>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
