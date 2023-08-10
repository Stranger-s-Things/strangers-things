import "./App.css";
import Home from "./components/Home.jsx";
import Navbar from "./components/NavBar.jsx";
import Posts from "./components/Posts.jsx";
import Login from "./components/Login.jsx";
import Profile from "./components/Profile.jsx";
import { Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/account/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
}
