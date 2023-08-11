import { IoLogoGithub } from "react-icons/io";

export default function Footer() {
  function openLinkNewTab(url) {
    window.open(url, "_blank", "noreferrer");
  }
  return (
    <footer id="footer">
      <h3>Stranger&apos;s Things</h3>
      <h5>
        &copy; 2023 Fullstack Academy x Amazon Career Choice Block 30:
        Stranger&apos;s Things, All rights reserved
      </h5>
      <h5>Not for Commercial Use</h5>
      <IoLogoGithub
        className="icon"
        onClick={() =>
          openLinkNewTab(
            "https://github.com/Stranger-s-Things/strangers-things"
          )
        }
      />
    </footer>
  );
}
