import axios from "axios";
import Cookies from "js-cookie";
import { ChangeEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import IomdbResponse from "../models/response/IomdbResponse";
import "../style/selectMovie.scss";
import { Loader } from "./Loader";

export const SelectMovie = () => {
  const [movies, setMovies] = useState<IomdbResponse[]>([]);
  const [search, setSearch] = useState<string>("");
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const navigate = useNavigate();

  interface ImovieResponse {
    Search: IomdbResponse[];
  }

  useEffect(() => {
    if (!Cookies.get("token")) {
      navigate("/login");
    }
  }, []);

  const setSearchValue = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const fetchMovies = () => {
    setIsFetching(true);
    axios
      .get<IomdbResponse>(
        "http://www.omdbapi.com/?s=" + search + "&apikey=488b984b"
      )
      .then((res) => {
        setMovies(res.data.Search);
        setIsFetching(false);
      });
  };
  return (
    <>
      <div className="searchCtn">
        <div className="imgCtn">
          <img src="/images/glass.jpg"></img>
        </div>

        <div className="inputDiv">
          <h3>Search for a movie to review</h3>
          <input
            id="selectMovieInput"
            onChange={setSearchValue}
            type="text"
            placeholder="enter a movie here..."
          ></input>
          <button id="selectMovieBtn" onClick={fetchMovies}>
            Search
          </button>
        </div>
      </div>

      {isFetching ? <Loader></Loader> : <></>}

      {movies ? (
        <div className="postsCnt1">
          <div id="postsContainer" className="postsCtn2">
            {movies.map((movie, i) => {
              return (
                <div id="singlePost" key={i} className="post">
                  <Link to={"/CreatePost/" + movie.imdbID} key={movie.imdbID}>
                    <div className="imgCtn2">
                      <img src={movie.Poster}></img>
                    </div>

                    <div className="infoDiv">
                      <span>{movie.Title}</span>
                      <span>{movie.Year}</span>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="notFound">
          <h3>No Movies found! Try something else</h3>
        </div>
      )}
    </>
  );
};
