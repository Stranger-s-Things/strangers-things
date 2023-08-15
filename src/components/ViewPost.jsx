// The code can probably be different but I thought maybe to make things easier we could have the message
// poster and view post all on one component and then have it dynamically work to check if you are the poster
// if you are arent the poster it should have the functionality to message the poster
// IF you are the poster it should give you the option to edit or delete the post and view a list of all
//  messages sent to you for that post
import EditPost from "./EditPost.jsx";
import Message from "./Message.jsx";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fetchPosts, deletePost } from "../API/index.js";

export default function ViewPost({
  userToken,
  sessionUserToken,
  isLoggedIn,
  sessionLoggedIn,
  sessionActiveUsername,
}) {
  const [posts, setPosts] = useState([]);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showMessageForm, setShowMessageForm] = useState(false);
  const postId = window.location.pathname.slice(7);
  const navigate = useNavigate();

  useEffect(() => {
    async function PostsFetch() {
      try {
        if (userToken || sessionUserToken !== "null") {
          const data = await fetchPosts(
            userToken ? userToken : sessionUserToken
          );
          return setPosts(data);
        } else {
          const data = await fetchPosts();
          return setPosts(data);
        }
      } catch (error) {
        console.log(error);
      }
    }
    PostsFetch();
  }, [userToken, sessionUserToken, isLoggedIn]);

  async function handleDelete(postId) {
    await deletePost(postId, sessionUserToken);
    navigate("/posts");
    console.log("post deleted");
  }

  function handleEditClick() {
    setShowEditForm(!showEditForm);
  }

  function handleMessageClick() {
    setShowMessageForm(!showMessageForm);
  }

  console.log(
    posts.map((post) => {
      return post._id === postId && post.isAuthor;
    })
  );

  return (
    <div className="view-post-cont">
      <Link to="/posts" className="nav-link view-post-link">
        <h1 className="post-link-text">Back</h1>
      </Link>

      {posts &&
        posts.map((post) => {
          return (
            post._id === postId && (
              <div key={post._id} className="post-cont">
                <div>
                  <h3>{post.title}</h3>
                  <ul>
                    <li className="post-description">
                      <p>{post.description}</p>
                    </li>
                    <li className="post-price">
                      <p>Price:</p>
                      <b className="post-li-second-item"> {post.price}</b>
                    </li>

                    <li className="post-seller">
                      <p>Seller: </p>{" "}
                      <p className="post-li-second-item">
                        {post.author.username}
                      </p>
                    </li>
                    <li className="post-location">
                      {" "}
                      <p>Location: </p>
                      <p className="post-li-second-item">{post.location}</p>
                    </li>
                    <li className="post-delivery">
                      <p>
                        {post.willDeliver
                          ? "Can be delivered"
                          : "You have to come pick it up"}
                      </p>
                    </li>
                  </ul>
                </div>
                <div className="post-link-cont">
                  {post.isAuthor && (
                    <div id="view-post-btns-cont">
                      <button
                        className="view-post-btn"
                        onClick={() => {
                          handleEditClick();
                        }}
                      >
                        {showEditForm ? "Close" : "Edit"}
                      </button>
                      <button
                        className="view-post-btn"
                        onClick={() => {
                          handleDelete(postId);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                  {!post.isAuthor && sessionLoggedIn === "true" && (
                    <p>
                      {/* Route to ViewPost.jsx to build out the individual post view for messaging the poster*/}
                      <Link
                        className="post-link"
                        to={`/posts/${post._id}`}
                        onClick={() => {
                          handleMessageClick();
                        }}
                      >
                        {showMessageForm ? "Close" : "Message"}
                      </Link>
                    </p>
                  )}
                </div>
                <div className="post-link-cont">
                  {!post.isAuthor && sessionActiveUsername === "none" && (
                    <div>
                      <Link to="/account/login" className="post-link">
                        Log In to message the seller
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            )
          );
        })}
      {showEditForm && (
        <EditPost userToken={userToken} sessionUserToken={sessionUserToken} />
      )}
      {showMessageForm && (
        <Message userToken={userToken} sessionUserToken={sessionUserToken} />
      )}
      <div>
        {posts &&
          posts.map((post) => {
            return (
              post._id === postId &&
              post.isAuthor && (
                <h2 key={post._id} className="sub-titling">
                  Messages regarding this post:{" "}
                </h2>
              )
            );
          })}

        {posts &&
          posts.map((post) => {
            return (
              post._id === postId &&
              post.isAuthor && (
                <div key={post._id}>
                  {post.messages.map((message) => {
                    return (
                      <div key={message._id} className="post-cont">
                        <h3>From: {message.fromUser.username}</h3>
                        <p className="post-delivery">
                          Message: {message.content}
                        </p>
                      </div>
                    );
                  })}
                </div>
              )
            );
          })}
      </div>
    </div>
  );
}
