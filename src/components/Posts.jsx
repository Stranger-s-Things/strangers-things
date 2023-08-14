import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchPosts } from "../API/index.js";
import { RiDraftFill } from "react-icons/ri";
import SearchBar from "./SearchBar.jsx";

export default function Posts({ userToken, sessionUserToken }) {
  const [posts, setPosts] = useState([]);
  const [err, setErr] = useState(null);
  const [query, setQuery] = useState({ search: "", results: [] });

  useEffect(() => {
    async function PostsFetch() {
      try {
        if (userToken || sessionUserToken !== "null") {
          const data = await fetchPosts(
            userToken ? userToken : sessionUserToken
          );
          console.log(data);
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

  function handleMapping(allData) {
    return allData.map((post) => (
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
              <p className="post-li-second-item">{post.author.username}</p>
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
            <p>
              <Link className="post-link" to={`/posts/${post._id}`}>
                View Listing
              </Link>
            </p>
          )}
          {!post.isAuthor && (
            <p>
              <Link className="post-link" to={`/posts/${post._id}`}>
                Message
              </Link>
            </p>
          )}
        </div>
      </div>
    ));
  }

  return (
    <div id="posts-page-cont">
      <div id="posts-page-heading">
        <h1>{posts.length < 1 ? "No Current Listings" : "Current Listings"}</h1>
        <h3>
          <Link to="/posts/add" className="nav-link nav-new-post">
            <RiDraftFill className="post-link-icon" />
            <p className="post-link-text">Add New Listing</p>
          </Link>
        </h3>
      </div>

      <SearchBar
        query={query}
        onSetQuery={setQuery}
        posts={posts}
        id="search-bar"
      />
      <section id="posts">
        {query.search === ""
          ? handleMapping(posts)
          : handleMapping(query.results)}
      </section>
    </div>
  );
}
