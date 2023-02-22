import Cookies from "js-cookie";
import { ChangeEvent, ChangeEventHandler, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Ipost from "../models/Ipost";
import Movie from "../models/response/IomdbResponse";
import Imovie from "../models/response/Movie";
import MovieExtended from "../models/response/MovieExtended";
import "../style/CreatePost.scss";
import { Loader } from "./Loader";

export const CreatePost = () => {
  const [movie, setMovie] = useState<MovieExtended>({
    Title: "",
    Year: 2,
    Poster: "",
    imdbID: "",
    Plot: "",
    Actors: "",
    Director: "",
    Genre: "",
    Writer: "",
  });
  const [content, setContent] = useState<string>("");
  const [isFetching, setIsFetching] = useState<boolean>(false);

  let params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setIsFetching(true);
    fetch("http://www.omdbapi.com/?apikey=488b984b&i=" + params.id)
      .then((qwert) => qwert.json())
      .then((result: MovieExtended) => {
        setIsFetching(false);
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
      {isFetching ? <Loader></Loader> : <></>}
      <div className="bodyCtn">
        <div className="postCtn">
          <h1>
            {movie.Title} {movie.Year}
          </h1>

          <div className="imgCtn">
            <img src={movie.Poster}></img>
          </div>

          <div className="infoDiv">
            <span>{movie.Plot}</span>
          </div>

          <div className="infoDiv">
            <h1>Director</h1>
            <span className="blue">{movie.Director}</span>
          </div>

          <div className="infoDiv">
            <h1>Writer</h1>
            <span className="blue">{movie.Writer}</span>
          </div>

          <div className="infoDiv">
            <h1>Actors</h1>
            <span className="blue">{movie.Actors}</span>
          </div>
        </div>

        <div className="inputDiv">
          <h1>Share your thoughts on this movie!</h1>
          <textarea
            onChange={setReview}
            placeholder="Write your review here..."
          ></textarea>
          <button onClick={publish}>Publish Review</button>
        </div>
      </div>
    </>
  );
};
