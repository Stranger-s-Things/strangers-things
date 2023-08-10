import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchLoggedIn } from "../API/index.js";

export default function Profile({ userToken }) {
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
  }, [userToken]);
  return (
    <>
      <h1>Welcome {activeUser.username}</h1>
      <p></p>
    </>
  );
}
