import logo from "./../../logo.svg";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <img src={logo} alt="logo" />
    </header>
  );
}

export default Header;
