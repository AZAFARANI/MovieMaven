import Cookies from "js-cookie";
import { ChangeEvent, ChangeEventHandler, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Ipost from "../models/Ipost";
import Movie from "../models/response/IomdbResponse";
import Imovie from "../models/response/Movie";
import "../style/CreatePost.scss";

export const CreatePost = () => {
  const [movie, setMovie] = useState<Imovie>({
    Title: "",
    Year: 2,
    Poster: "",
    imdbID: "",
  });
  const [content, setContent] = useState<string>("");

  let params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://www.omdbapi.com/?apikey=488b984b&i=" + params.id)
      .then((qwert) => qwert.json())
      .then((result: Imovie) => {
        setMovie(result);
      });
  }, []);

  const setReview = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const publish = () => {
    let post: Ipost = {
      userName: Cookies.get("user")!,
      title: movie.Title,
      content: content,
      imageUrl: movie.Poster,
    };

    fetch("http://localhost:8000/newpost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": Cookies.get("token")!,
      },
      body: JSON.stringify(post),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        navigate("/posts");
      });
  };

  console.log(movie);

  return (
    <>
      <div className="bodyCtn">
        <div className="postCtn">
          <div className="imgCtn">
            <img src={movie.Poster}></img>
          </div>
          <h1>{movie.Title}</h1>
          <div className="inputDiv">
            <h1>Share your thoughts on this movie!</h1>
            <textarea
              onChange={setReview}
              placeholder="Write your review here..."
            ></textarea>
            <button onClick={publish}>Publish Review</button>
          </div>
        </div>
      </div>
    </>
  );
};
