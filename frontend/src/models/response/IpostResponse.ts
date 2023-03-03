export default interface Ipost {
  _id: string;
  userName: string;
  title: string;
  content: string;
  imageUrl: string;
  date: Date;
  likes: [];
  comments: [];
}

export interface IpostResponse {
  post: Ipost;
}
