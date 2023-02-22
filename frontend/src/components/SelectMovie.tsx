import { ChangeEvent, useState } from "react";
import IomdbResponse from "../models/response/IomdbResponse";
import "../style/selectMovie.scss";

export const SelectMovie = () => {
  const [movies, setMovies] = useState<IomdbResponse[]>([]);
  const [search, setSearch] = useState<string>("");

  const setSearchValue = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const fetchMovies = () => {
    fetch("http://www.omdbapi.com/?s=" + search + "&apikey=488b984b")
      .then((qwert) => qwert.json())
      .then((result: IomdbResponse) => {
        console.log(result);
        setMovies(result.Search);
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
            onChange={setSearchValue}
            type="text"
            placeholder="enter a movie here..."
          ></input>
          <button onClick={fetchMovies}>Search</button>
        </div>
      </div>

      {movies ? (
        <div>
          <div className="movies">
            {movies.map((movie) => {
              return (
                <div className="movie">
                  <div className="imgCtn2">
                    <img src={movie.Poster}></img>
                  </div>

                  <div className="infoDiv">
                    <span>{movie.Title}</span>
                    <span>{movie.Year}</span>
                  </div>
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
