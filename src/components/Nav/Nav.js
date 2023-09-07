import { Link } from "react-router-dom";

import "@fortawesome/fontawesome-svg-core/styles.css";
import "./Nav.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";

function Nav() {
  return (
    <nav className="menu">
      <ul className="menu__container">
        <li>
          <Link to="/dashboard" className="menu__link">
            <FontAwesomeIcon icon={icon({ name: "house", style: "solid" })} />
          </Link>
        </li>
        <li>
          <Link to="/crisis" className="menu__link">
            <FontAwesomeIcon
              icon={icon({ name: "circle-exclamation", style: "solid" })}
            />
          </Link>
        </li>
        <li>
          <Link to="/chat" className="menu__link">
            <FontAwesomeIcon
              icon={icon({ name: "comments", style: "solid" })}
            />
          </Link>
        </li>
      </ul>
    </nav>
  );
}
export default Nav;
