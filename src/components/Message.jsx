import { postMessage } from "../API/index.js";

import { useState } from "react";

export default function Message({ userToken, sessionUserToken }) {
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const postId = window.location.pathname.slice(7);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    const response = await postMessage(
      postId,
      userToken ? userToken : sessionUserToken,
      message
    );

    console.log(response);

    if (!response.success) {
      setError(response.error);
    }
    if (response.success) {
      setSuccessMessage(`Message successfully sent!`);
      setMessage("");
    }
  }

  return (
    <>
      <div className="form-cont">
        <h1>Message</h1>
        <form method="POST" onSubmit={handleSubmit} className="form">
          <input
            placeholder="Message"
            type="text"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            required
          />
          <div>
            <button id="post-form-btn">Send</button>
          </div>
        </form>
        <div>
          {error && <h4>{error.message}</h4>}
          {successMessage && <h4 id="success">{successMessage}</h4>}
        </div>
      </div>
    </>
  );
}
