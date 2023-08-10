import { useNavigate, Link } from "react-router-dom";

export default function Home({ activeUser }) {
  const navigate = useNavigate();
  return (
    <div>
      {activeUser ? (
        <h2>Logged in as {activeUser}</h2>
      ) : (
        <h2>You are not logged in please log in for the best experience.</h2>
      )}
      <button
        onClick={() => {
          activeUser ? navigate("/profile") : navigate("/account/login");
        }}
      >
        {activeUser ? "VIEW PROFILE" : "LOG IN"}
      </button>
    </div>
  );
}
