import { useNavigate } from "react-router-dom";

export default function Home({ activeUsername }) {
  const navigate = useNavigate();

  console.log(activeUsername);
  return (
    <div id="home-cont">
      <h1>Welcome to Stranger&apos;s Things</h1>
      <h2>Anything. Anywhere.</h2>
      <div>
        {activeUsername ? (
          <h3>Logged in as {activeUsername}</h3>
        ) : (
          <h3>You are not logged in please log in for the best experience.</h3>
        )}
        <button
          onClick={() => {
            activeUsername ? navigate("/profile") : navigate("/account/login");
          }}
        >
          {activeUsername ? "VIEW PROFILE" : "LOG IN"}
        </button>
      </div>
    </div>
  );
}
