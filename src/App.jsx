import Home from "./components/Home.jsx";
import Navbar from "./components/NavBar.jsx";
import Posts from "./components/Posts.jsx";
import Login from "./components/Login.jsx";
import Profile from "./components/Profile.jsx";
import Register from "./components/Register.jsx";
import Footer from "./components/Footer.jsx";
import PostForm from "./components/PostForm.jsx";
import ViewPost from "./components/ViewPost.jsx";

import "./App.css";

import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

export default function App() {
  const [inputType, setInputType] = useState("password");
  const [userToken, setUserToken] = useState(null);
  const [activeUsername, setActiveUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Session Storage Data
  const sessionUserToken = sessionStorage.getItem("userToken");
  const sessionLoggedIn = sessionStorage.getItem("isLoggedIn");
  const sessionActiveUsername = sessionStorage.getItem("activeUsername");

  const location = useLocation();

  // console.log(location);
  useEffect(() => {
    if (location.pathname === "/") {
      document.getElementById("main-cont").classList.add("home-page");
    } else {
      document.getElementById("main-cont").classList.remove("home-page");
    }
  }, [location.pathname]);

  useEffect(() => {
    if (isLoggedIn === false && sessionLoggedIn === "false") setUserToken(null);
    setActiveUsername("");
    sessionStorage.setItem("activeUsername", "none");
  }, [isLoggedIn, sessionLoggedIn]);

  return (
    <section>
      <div id="main-cont">
        <Navbar
          isLoggedIn={isLoggedIn}
          sessionLoggedIn={sessionLoggedIn}
          onSetIsLoggedIn={setIsLoggedIn}
        />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                activeUsername={activeUsername}
                sessionActiveUsername={sessionActiveUsername}
                isLoggedIn={isLoggedIn}
                sessionLoggedIn={sessionLoggedIn}
              />
            }
          />
          <Route
            path="/posts"
            element={
              <Posts
                userToken={userToken}
                sessionUserToken={sessionUserToken}
              />
            }
          />
          <Route
            path="/posts/:postId"
            element={
              <ViewPost
                userToken={userToken}
                sessionUserToken={sessionUserToken}
                sessionLoggedIn={sessionLoggedIn}
                sessionActiveUsername={sessionActiveUsername}
                isLoggedIn={isLoggedIn}
              />
            }
          />
          <Route
            path="/posts/add"
            element={
              <PostForm
                userToken={userToken}
                sessionUserToken={sessionUserToken}
                sessionLoggedIn={sessionLoggedIn}
              />
            }
          />
          <Route
            path="/account/login"
            element={
              <Login
                inputType={inputType}
                onSetInputType={setInputType}
                onSetUserToken={setUserToken}
                onSetIsLoggedIn={setIsLoggedIn}
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
            element={
              <Profile
                userToken={userToken}
                sessionUserToken={sessionUserToken}
                sessionLoggedIn={sessionLoggedIn}
                onSetActiveUsername={setActiveUsername}
              />
            }
          />
        </Routes>
      </div>
      <Footer />
    </section>
  );
}
