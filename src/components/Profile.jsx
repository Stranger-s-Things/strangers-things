import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchLoggedIn } from "../API/index.js";
import  EditPost  from "./Message.jsx";

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
    <>
      <h1>Welcome {activeUser?.data.username}</h1>
      {activeUser?.data.messages.length === 0 ? (
        <p>No messages sent</p>
      ) : (
        <div>
          <p>Messages you sent: </p>
          <ul>
            {activeUser?.data.messages.map((message, index) => (
            <li key={index}>
              <p><br/> 
                <strong>From:</strong> {message.fromUser.username}
              </p>
              <p>{message.content}</p>
              <p>
                <strong>To:</strong> {message.post.author.username}
              </p> 
            </li>
            ))}
          </ul>
          <EditPost userToken={userToken} sessionUserToken={sessionUserToken} />
        </div>
      )}
    </>
  );
}
