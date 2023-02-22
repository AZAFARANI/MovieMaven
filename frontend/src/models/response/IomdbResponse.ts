export default interface Movie {
  Title: string;
  Year: number;
  Poster: string;
  imdbID: string;
}

export default interface IomdResponse {
  Search: Movie[];
}
