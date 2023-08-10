import { useState } from "react";
import { Link } from "react-router-dom";
import { fetchNewUser } from "../API/index.js";
import { AiOutlineEye, AiFillEye } from "react-icons/ai";

export default function Register({ inputType, onSetInputType }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [successfulSignup, setSuccessfulSignup] = useState(null);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    const newUser = await fetchNewUser(username, password);
    if (newUser.error) setError(newUser.error);
    if (newUser.success) {
      setSuccessfulSignup(newUser.data.message);
    }
    console.log(newUser);
  }

  return (
    <div>
      <h1>Register Now!</h1>
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

        <div>
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
        </div>
        <button>Register</button>
      </form>
      {!successfulSignup ? (
        <h4>
          Already have an account? <Link to="/account/login">Log in</Link>
        </h4>
      ) : (
        ""
      )}
      {error && <h4>Oops! Something went wrong: {error}</h4>}
      {successfulSignup && (
        <h4>
          {successfulSignup} <Link to="/account/login">Log in</Link>
        </h4>
      )}
    </div>
  );
}
