import "./Spots.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { Link } from "react-router-dom";

function Spots() {
  return (
    <>
      <div className="spots">
        <Link to="/dashboard">
          <FontAwesomeIcon
            className="fa-1x spots__exit"
            icon={icon({ name: "chevron-left", style: "solid" })}
          />
        </Link>
        <div className="spots__container">
          <h3 className="spots__title">
            Your top hangout spots where you can chill and shift your focus from
            worries!
          </h3>
          <div className="spots__map" id="map"></div>

          <input className="spots__input" placeholder="Name" />
          <button className="spots__add">+ Add Spot</button>
          {/* button changes color when added */}
          <button className="spots__delete">- Delete</button>
        </div>
      </div>
    </>
  );
}

export default Spots;
