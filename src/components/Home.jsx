import { Route, Routes } from "react-router-dom";
import NavBar from "./NavBar";
import Posts from "./Posts";
import Login from "./Login";

export default function Home() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <NavBar />
    </div>
  );
}
