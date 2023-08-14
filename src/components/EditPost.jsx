import { editPost } from "../API/index.js";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function EditPost({ userToken, sessionUserToken }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [canDeliver, setCanDeliver] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const postId = window.location.pathname.slice(7);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    const response = await editPost(
      postId,
      userToken ? userToken : sessionUserToken,
      title,
      description,
      price,
      location,
      canDeliver
    );

    console.log(response);

    if (!response.success) {
      setError(response.error);
    }
    if (response.success) {
      setSuccessMessage(
        `Post edited successfully by ${response.data.post.author.username}`
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
      <div className="form-cont">
        <h1>Edit Post</h1>
        <form method="PATCH" onSubmit={handleSubmit} className="form">
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
            <button id="post-form-btn">Update</button>
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
