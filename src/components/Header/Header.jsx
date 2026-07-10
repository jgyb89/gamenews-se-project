import { Link } from "react-router-dom";
import gameNewsLogo from "../../assets/gamenews-logo-white.svg";
import "./Header";

function Header() {
  return (
    <header>
      <Link to="/">
        <img className="header__logo" src={gameNewsLogo} alt="Game News Logo" />
      </Link>
      ;
    </header>
  );
}

export default Header;
