import "./Toolkit.scss";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";

function Toolkit() {
  const handleHacks = () => {
    window.location.href = "/hacks";
  };
  const handleGratitude = () => {
    window.location.href = "/gratitude";
  };
  const handleCompanions = () => {
    window.location.href = "/mycontacts";
  };
  const handleSpots = () => {
    window.location.href = "/myspots";
  };

  return (
    <>
      <div className="toolkit">
        <div className="toolkit__banner" onClick={handleHacks}>
          <FontAwesomeIcon icon={icon({ name: "icons", style: "solid" })} />

          <h4 className="toolkit__title toolkit__title--hacks">
            Keep-calm hacks
          </h4>
          <FontAwesomeIcon
            icon={icon({ name: "chevron-right", style: "solid" })}
          />
        </div>
        <div className="toolkit__banner" onClick={handleGratitude}>
          <FontAwesomeIcon
            icon={icon({ name: "hand-holding-heart", style: "solid" })}
          />
          <h4 className="toolkit__title toolkit__title--gratitude">
            Grounds for Gratitude
          </h4>
          <FontAwesomeIcon
            icon={icon({ name: "chevron-right", style: "solid" })}
          />
        </div>
        <div className="toolkit__banner" onClick={handleCompanions}>
          <FontAwesomeIcon
            icon={icon({ name: "user-group", style: "solid" })}
          />
          <h4 className="toolkit__title toolkit__title--companions">
            Close Companions
          </h4>
          <FontAwesomeIcon
            icon={icon({ name: "chevron-right", style: "solid" })}
          />
        </div>
        <div className="toolkit__banner" onClick={handleSpots}>
          <FontAwesomeIcon
            icon={icon({ name: "location-dot", style: "solid" })}
          />
          <h4 className="toolkit__title toolkit__title--spots">
            Diversion Spots
          </h4>
          <FontAwesomeIcon
            icon={icon({ name: "chevron-right", style: "solid" })}
          />
        </div>
      </div>
    </>
  );
}

export default Toolkit;
