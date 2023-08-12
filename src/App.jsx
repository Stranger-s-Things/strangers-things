import Home from "./components/Home.jsx";
import Navbar from "./components/NavBar.jsx";
import Posts from "./components/Posts.jsx";
import Login from "./components/Login.jsx";
import Profile from "./components/Profile.jsx";
import Register from "./components/Register.jsx";
import Footer from "./components/Footer.jsx";
import PostForm from "./components/PostForm.jsx";

import "./App.css";

import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

export default function App() {
  const [inputType, setInputType] = useState("password");
  const [userToken, setUserToken] = useState(null);
  const [activeUsername, setActiveUsername] = useState("");

  const location = useLocation();

  // console.log(location);
  useEffect(() => {
    if (location.pathname === "/") {
      document.getElementById("main-cont").classList.add("home-page");
    } else {
      document.getElementById("main-cont").classList.remove("home-page");
    }
  }, [location.pathname]);

  return (
    <section>
      <div id="main-cont">
        <Navbar userToken={userToken} onSetActiveUsername={setActiveUsername} />
        <Routes>
          <Route path="/" element={<Home activeUsername={activeUsername} />} />
          <Route path="/posts" element={<Posts userToken={userToken} />} />
          <Route
            path="/posts/add"
            element={<PostForm userToken={userToken} />}
          />
          <Route
            path="/account/login"
            element={
              <Login
                inputType={inputType}
                onSetInputType={setInputType}
                onSetUserToken={setUserToken}
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
