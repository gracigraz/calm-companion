import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";
import home from "../../assets/icons/house-solid.svg"; //change for real name check website
import "./Nav.scss";

function Nav() {
  return (
    <nav className="menu">
      <ul className="menu__container">
        <li>
          <Link to="/" className="menu__link">
            <FontAwesomeIcon icon={home} style={{ color: "#595e60" }} />
          </Link>
        </li>
        <li>
          <Link to="/crisis" className="menu__link">
            <FontAwesomeIcon icon={home} style={{ color: "#595e60" }} />
          </Link>
        </li>
        <li>
          <Link to="/chat" className="menu__link">
            <FontAwesomeIcon icon={home} style={{ color: "#595e60" }} />
          </Link>
        </li>
      </ul>
    </nav>
  );
}
export default Nav;
