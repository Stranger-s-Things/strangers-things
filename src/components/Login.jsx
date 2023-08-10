import { useState } from "react";
import { fetchLogin } from "../API/index.js";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const user = await fetchLogin(username, password);
    if (!user.success) {
      setError(user.error);
    }
    if (user.success) {
      setSuccessMessage(user.success);
      navigate(`/profile`);
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
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button>Log in</button>
      </form>

      {error && <h3>{error.message}</h3>}
      {successMessage && <h3>{successMessage.message}</h3>}
    </div>
  );
}
