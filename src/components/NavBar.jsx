import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <header>
      <Link to="./home">Stranger's Things </Link>
      <Link to="./posts">Posts </Link>
      <Link to="./login">Login</Link>
    </header>
  );
}
