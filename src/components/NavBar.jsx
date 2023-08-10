import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <header>
      <h1>Stranger&apos;s Things</h1>
      <nav>
        <Link to="./">Home </Link>
        <Link to="./posts">Posts </Link>
        <Link to="./account/login">Login</Link>
      </nav>
    </header>
  );
}
