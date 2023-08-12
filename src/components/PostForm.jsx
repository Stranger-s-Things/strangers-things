import { fetchNewPost } from "../API/index.js";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PostForm({
  userToken,
  sessionUserToken,
  sessionLoggedIn,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [canDeliver, setCanDeliver] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const navigate = useNavigate();

  // This is a guard clause so that only users who are signed in can access the post form
  useEffect(() => {
    if (sessionUserToken === "null" || sessionLoggedIn !== "true")
      navigate("/account/login");
  }, [navigate, sessionLoggedIn, sessionUserToken]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    const response = await fetchNewPost(
      userToken ? userToken : sessionUserToken,
      title,
      description,
      price,
      location,
      canDeliver
    );
    if (!response.success) {
      setError(response.error);
    }
    if (response.success) {
      setSuccessMessage(
        `New post successfully created by ${response.data.post.author.username}`
      );
      setTitle("");
      setDescription("");
      setPrice("");
      setLocation("");
      setCanDeliver(false);
    }
  }

  return (
    <>
      {error && <h4>{error.message}</h4>}
      {successMessage && (
        <h4 id="success">
          {successMessage} You are being redirected to your profile now.
        </h4>
      )}
      <div className="form-cont">
        <h1>Add New Post</h1>
        <form method="POST" onSubmit={handleSubmit} className="form">
          <input
            placeholder="Title"
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            required
          />
          <input
            placeholder="Description"
            type="text"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            required
          />
          <input
            placeholder="Price"
            type="text"
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
            required
          />
          <input
            placeholder="Location"
            type="text"
            value={location}
            onChange={(e) => {
              setLocation(e.target.value);
            }}
          />
          <label id="checkbox-label">
            Willing to deliver?
            <input
              type="checkbox"
              value={canDeliver}
              onChange={() => setCanDeliver(!canDeliver)}
            />
          </label>
          <div>
            <button id="post-form-btn">Create</button>
          </div>
        </form>
      </div>
    </>
  );
}
