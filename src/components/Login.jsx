import { useState } from "react";
import { fetchLogin } from "../API/index.js";
import { Link, useNavigate } from "react-router-dom";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

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
      setTimeout(() => {
        navigate("/profile");
      }, 3000);
    }
  }

  return (
    <div className="login-cont form-cont">
      <h1>Login</h1>
      <form method="POST" onSubmit={handleSubmit} className="form">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <div className="password-cont">
          <input
            className="password-input"
            type={inputType}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {inputType === "password" ? (
            <IoEyeOutline
              onClick={() => onSetInputType("text")}
              className="icon"
            />
          ) : (
            <IoEyeOffOutline
              onClick={() => onSetInputType("password")}
              className="icon"
            />
          )}
        </div>

        <div>
          <button>Sign in</button>
        </div>
      </form>
      <h4>
        Don&apos;t have an account?{" "}
        <Link to="/account/register" className="form-link">
          Sign up today!
        </Link>
      </h4>
      {error && <h4>{error.message}</h4>}
      {successMessage && (
        <h4 id="success">
          {successMessage} You are being redirected to your profile now.
        </h4>
      )}
    </div>
  );
}
