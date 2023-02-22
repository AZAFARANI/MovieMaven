export default interface Movie {
  Title: string;
  Year: number;
  Poster: string;
}

export default interface IomdResponse {
  Search: Movie[];
}
