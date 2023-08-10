import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchLoggedIn } from "../API/index.js";

export default function Profile({ userToken, onSetActiveUsername }) {
  const [activeUser, setActiveUser] = useState(null);
  const navigate = useNavigate();
  if (!userToken) navigate("/account/login");

  useEffect(() => {
    async function fetchProfile() {
      try {
        const data = await fetchLoggedIn(userToken);
        console.log(data);
        return setActiveUser(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchProfile();
    onSetActiveUsername(activeUser?.data.username);
  }, [activeUser?.data.username, onSetActiveUsername, userToken]);
  return (
    <>
      <h1>Welcome {activeUser?.data.username}</h1>
      {activeUser?.data.messages.length === 0 ? (
        <p>No messages sent</p>
      ) : (
        <p>Messages you sent: </p>
      )}
    </>
  );
}
