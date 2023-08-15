import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  RiHome2Fill,
  RiNewspaperFill,
  RiUser3Fill,
  RiMenuLine,
  RiCloseLine,
  RiLoginBoxFill,
  RiLogoutBoxFill,
} from "react-icons/ri";

export default function NavBar({
  isLoggedIn,
  onSetIsLoggedIn,
  sessionLoggedIn,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (isLoggedIn === true || sessionLoggedIn === "true") return;
  }, [isLoggedIn, sessionLoggedIn]);

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

  function handleLogout() {
    onSetIsLoggedIn(false);
    sessionStorage.setItem("isLoggedIn", false);
    sessionStorage.setItem("userToken", null);
    sessionStorage.setItem("activeUsername", "none");
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

          {sessionLoggedIn !== "true" ? (
            <Link
              to="/account/login"
              className="nav-link"
              onClick={() => handleCloseMenu()}
            >
              <RiLoginBoxFill className="nav-link-icon" />
              <p className="nav-link-text">Login</p>
            </Link>
          ) : (
            <Link
              to="/profile"
              className="nav-link"
              onClick={() => handleCloseMenu()}
            >
              <RiUser3Fill className="nav-link-icon" />

              <p className="nav-link-text">Profile</p>
            </Link>
          )}
          {isLoggedIn === true || sessionLoggedIn === "true" ? (
            <Link
              to="/"
              className="nav-link"
              onClick={() => {
                handleCloseMenu();
                handleLogout();
              }}
            >
              <RiLogoutBoxFill className="nav-link-icon" />
              <p className="nav-link-text">Logout</p>
            </Link>
          ) : (
            ""
          )}
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
