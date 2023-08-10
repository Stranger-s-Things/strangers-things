import { useState } from "react";
import { fetchLogin } from "../API/index.js";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiFillEye } from "react-icons/ai";

export default function Login({ inputType, onSetInputType, onSetUserToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    const user = await fetchLogin(username, password);
    if (!user.success) {
      setError(user.error);
    }
    if (user.success) {
      onSetUserToken(user.data.token);
      setSuccessMessage(user.data.message);
      setUsername("");
      setPassword("");
      // navigate(`/profile`);
      setTimeout(() => {
        navigate("/profile");
      }, 5000);
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <form method="POST" onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label>
          Password:
          <input
            type={inputType}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {inputType === "password" ? (
            <AiOutlineEye onClick={() => onSetInputType("text")} />
          ) : (
            <AiFillEye onClick={() => onSetInputType("password")} />
          )}
        </label>
        <button>Sign in</button>
      </form>
      <h4>
        Don&apos;t have an account?{" "}
        <Link to="/account/register">Sign up today!</Link>
      </h4>
      {error && <h3>{error.message}</h3>}
      {successMessage && (
        <h3>{successMessage} You are being redirected to your profile now.</h3>
      )}
    </div>
  );
}
