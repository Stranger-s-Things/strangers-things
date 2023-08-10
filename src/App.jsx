import "./App.css";
import Home from "./components/Home.jsx";
import Navbar from "./components/NavBar.jsx";
import Posts from "./components/Posts.jsx";
import Login from "./components/Login.jsx";
import Profile from "./components/Profile.jsx";
import Register from "./components/Register.jsx";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";

export default function App() {
  const [inputType, setInputType] = useState("password");
  const [userToken, setUserToken] = useState(null);
  const [activeUser, setActiveUser] = useState(null);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home activeUser={activeUser} />} />
        <Route path="/posts" element={<Posts activeUser={activeUser} />} />
        <Route
          path="/account/login"
          element={
            <Login
              inputType={inputType}
              onSetInputType={setInputType}
              onSetUserToken={setUserToken}
              onSetActiveUser={setActiveUser}
            />
          }
        />
        <Route
          path="/account/register"
          element={
            <Register inputType={inputType} onSetInputType={setInputType} />
          }
        />
        <Route
          path="/profile"
          element={<Profile userToken={userToken} activeUser={activeUser} />}
        />
      </Routes>
    </>
  );
}
