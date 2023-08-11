import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <header>
      <h1>Stranger&apos;s Things</h1>
      <nav>
        <Link to="./" className="nav-link">
          Home{" "}
        </Link>
        <Link to="./posts" className="nav-link">
          Posts{" "}
        </Link>
        <Link to="./account/login" className="nav-link">
          Login
        </Link>
      </nav>
    </header>
  );
}
