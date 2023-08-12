import { useNavigate } from "react-router-dom";

export default function Home({
  activeUsername,
  sessionActiveUsername,
  sessionLoggedIn,
  isLoggedIn,
}) {
  const navigate = useNavigate();

  console.log(activeUsername, sessionActiveUsername);
  return (
    <div id="home-cont">
      <h1>Welcome to Stranger&apos;s Things</h1>
      <h2>Anything. Anywhere.</h2>
      <div>
        {isLoggedIn === true || sessionLoggedIn === true ? (
          <h3>
            Logged in as{" "}
            {activeUsername ? activeUsername : sessionActiveUsername}
          </h3>
        ) : (
          <h3>You are not logged in please log in for the best experience.</h3>
        )}
        <button
          onClick={() => {
            activeUsername !== "" || sessionActiveUsername !== "none"
              ? navigate("/profile")
              : navigate("/account/login");
          }}
        >
          {activeUsername !== "" || sessionActiveUsername !== "none"
            ? "VIEW PROFILE"
            : "LOG IN"}
        </button>
      </div>
    </div>
  );
}
