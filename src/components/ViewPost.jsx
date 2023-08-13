// The code can probably be different but I thought maybe to make things easier we could have the message
// poster and view post all on one component and then have it dynamically work to check if you are the poster
// if you are arent the poster it should have the functionality to message the poster
// IF you are the poster it should give you the option to edit or delete the post and view a list of all
//  messages sent to you for that post
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchPosts } from "../API/index.js";

export default function ViewPost({ userToken, sessionUserToken }) {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    async function PostFetch() {
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
    PostFetch();
  }, [userToken, sessionUserToken]);

  let id = window.location.pathname;
  let postId = id.slice(7);

  return (
    <div>
      <h1>View Post</h1>
      <Link to="/posts" className="nav-link">
        <p className="post-link-text">Back</p>
      </Link>

      {posts &&
        posts.map((post) => {
          return (
            post._id === postId && (
              <div key={post._id} className="post-cont">
                {console.log(post.isAuthor)}
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
                    <div>
                      <button>Edit</button>
                      <button>Delete</button>
                    </div>
                  )}
                  {!post.isAuthor && (
                    <p>
                      {/* Route to ViewPost.jsx to build out the individual post view for messaging the poster*/}
                      <Link className="post-link" to={`/posts/${post._id}`}>
                        Message
                      </Link>
                    </p>
                  )}
                </div>
              </div>
            )
          );
        })}
    </div>
  );
}
