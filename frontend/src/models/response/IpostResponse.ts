export default interface IpostResponse {
  _id: string;
  userName: string;
  title: string;
  content: string;
  imageUrl: string;
  date: Date;
  likes: [];
  comments: [];
}
