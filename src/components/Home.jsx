import { useNavigate, Link } from "react-router-dom";

export default function Home({ activeUsername }) {
  const navigate = useNavigate();
  console.log(activeUsername);
  return (
    <div>
      {activeUsername ? (
        <h2>Logged in as {activeUsername}</h2>
      ) : (
        <h2>You are not logged in please log in for the best experience.</h2>
      )}
      <button
        onClick={() => {
          activeUsername ? navigate("/profile") : navigate("/account/login");
        }}
      >
        {activeUsername ? "VIEW PROFILE" : "LOG IN"}
      </button>
    </div>
  );
}
