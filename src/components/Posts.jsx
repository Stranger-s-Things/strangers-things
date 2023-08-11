import { useEffect, useState } from "react";
import { fetchPosts } from "../API/index.js";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [err, setErr] = useState(null);

  useEffect(() => {
    async function PostsFetch() {
      try {
        const data = await fetchPosts();
        return setPosts(data);
      } catch (error) {
        setErr(error);
        console.log(error);
      }
    }
    PostsFetch();
  }, []);
  // console.log(posts);
  return (
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
          );
        })}
    </section>
  );
}
