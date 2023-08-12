import { useState } from "react";
import { Link } from "react-router-dom";
import {
  RiHome2Fill,
  RiNewspaperFill,
  RiUser3Fill,
  RiMenuLine,
  RiCloseLine,
} from "react-icons/ri";

export default function NavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  function handleCloseMenu() {
    setMobileMenuOpen(!mobileMenuOpen);
    document.querySelector(".main-nav").classList.remove("nav-open");
    document.body.classList.remove("no-scroll");
  }

  function handleOpenMenu() {
    setMobileMenuOpen(!mobileMenuOpen);
    document.querySelector(".main-nav").classList.add("nav-open");
    document.body.classList.add("no-scroll");
  }

  return (
    <header>
      <h1>Stranger&apos;s Things</h1>
      <div className="main-nav">
        <nav>
          <Link to="/" className="nav-link" onClick={() => handleCloseMenu()}>
            <RiHome2Fill className="nav-link-icon" />
            <p className="nav-link-text">Home</p>
          </Link>
          <Link
            to="/posts"
            className="nav-link"
            onClick={() => handleCloseMenu()}
          >
            <RiNewspaperFill className="nav-link-icon" />

            <p className="nav-link-text">Posts</p>
          </Link>
          <Link
            to="/account/login"
            className="nav-link"
            onClick={() => handleCloseMenu()}
          >
            <RiUser3Fill className="nav-link-icon" />

            <p className="nav-link-text">Login</p>
          </Link>
        </nav>
      </div>
      {mobileMenuOpen === true ? (
        <RiCloseLine
          className="nav-mobile-icon"
          onClick={() => handleCloseMenu()}
        />
      ) : (
        <RiMenuLine
          className="nav-mobile-icon"
          onClick={() => handleOpenMenu()}
        />
      )}
    </header>
  );
}
