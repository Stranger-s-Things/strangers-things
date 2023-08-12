import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchPosts } from "../API/index.js";

export default function Posts({ userToken, sessionUserToken }) {
  const [posts, setPosts] = useState([]);
  const [err, setErr] = useState(null);

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
        setErr(error);
        console.log(error);
      }
    }
    PostsFetch();
  }, [sessionUserToken, userToken]);
  console.log(posts);
  return (
    <div id="posts-page-cont">
      <div id="posts-page-heading">
        <h1>{posts.length < 1 ? "No Current Listings" : "Current Listings"}</h1>
        <h3>
          <Link to="/posts/add" className="nav-link nav-new-post">
            Add New Listing
          </Link>
        </h3>
      </div>

      <section id="posts">
        {err && <p>{err}</p>}

        {posts &&
          posts.map((post) => {
            return (
              <div key={post._id} className="post-cont">
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
                  {post.isAuthor === true && (
                    <>
                      <li>
                        {/* Route to ViewPost.jsx to build out the individual post view */}
                        <Link className="post-link" to={`/posts/${post._id}`}>
                          View Listing
                        </Link>
                      </li>
                    </>
                  )}
                  {post.isAuthor === false && (
                    <li>
                      {/* Route to ViewPost.jsx to build out the individual post view for messaging the poster*/}
                      <Link className="post-link" to={`/posts/${post._id}`}>
                        Message
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
            );
          })}
      </section>
    </div>
  );
}
