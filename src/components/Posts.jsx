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
  console.log(posts);
  return (
    <section>
      {err && <p>{err}</p>}
      {posts &&
        posts.map((post) => {
          return (
            <div key={post._id}>
              <h3>{post.title}</h3>
              <p>{post.description}</p>
              <p>
                <b>{post.price}</b>
              </p>
              <p>
                {post.willDeliver
                  ? "Can be delivered"
                  : "You have to come pick it up"}
              </p>
              <p>Seller: {post.author.username}</p>
              <p>Location: {post.location}</p>
            </div>
          );
        })}
    </section>
  );
}
