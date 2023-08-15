import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { fetchLoggedIn } from "../API/index.js";

export default function Profile({
  userToken,
  onSetActiveUsername,
  sessionUserToken,
  sessionLoggedIn,
}) {
  const [activeUser, setActiveUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (sessionUserToken === "null" || sessionLoggedIn !== "true")
      navigate("/account/login");
  }, [navigate, sessionLoggedIn, sessionUserToken]);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const data = await fetchLoggedIn(
          userToken ? userToken : sessionUserToken
        );
        console.log(data);
        return setActiveUser(data);
      } catch (error) {
        // console.log(error);
      }
    }
    fetchProfile();
    onSetActiveUsername(activeUser?.data.username);
    sessionStorage.setItem("activeUsername", activeUser?.data.username);
  }, [
    activeUser?.data.username,
    onSetActiveUsername,
    sessionUserToken,
    userToken,
  ]);

  return (
    <section id="profile-cont">
      <h1>Welcome {activeUser?.data.username}</h1>
      <div id="profile-messages-cont">
        {activeUser?.data.messages.length < 1 && <h4>No messages sent</h4>}
        {activeUser?.data.messages.length > 0 && (
          <>
            <div>
              <h2 className="sub-titling">Messages sent by you: </h2>
              {activeUser?.data.messages
                .filter(
                  (message) =>
                    message.fromUser.username === activeUser?.data.username
                )
                .map((message) => {
                  return (
                    <div key={message._id} className="post-cont">
                      <h3>(Sent by you)</h3>
                      <p className="post-delivery">
                        Message: {message.content}
                      </p>
                      <p className="post-delivery">
                        Post: {message.post.title}
                      </p>
                      <Link
                        className="post-link"
                        to={`/posts/${message.post._id}`}
                      >
                        Message Again
                      </Link>
                    </div>
                  );
                })}
            </div>
            <div>
              <h2 className="sub-titling">Messages sent to you: </h2>
              {activeUser?.data.messages
                .filter(
                  (message) =>
                    message.fromUser.username !== activeUser?.data.username
                )
                .map((message) => {
                  return (
                    <div key={message._id} className="post-cont">
                      <h3>From: {message.fromUser.username}</h3>
                      <p className="post-delivery">
                        Message: {message.content}
                      </p>
                      <Link
                        className="post-link"
                        to={`/posts/${message.post._id}`}
                      >
                        View My Listing: {message.post.title}
                      </Link>
                    </div>
                  );
                })}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
