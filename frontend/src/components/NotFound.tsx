import { useNavigate } from "react-router-dom";
import "../style/NotFound.scss";

export const NotFound = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="notfoundcnt">
        <h1>404 Not found!</h1>
        <span>The page you are looking for does not exist!</span>
        <button
          onClick={() => {
            navigate("/");
          }}
        >
          Home
        </button>
      </div>
    </>
  );
};
