import "./Spots.scss";

function Spots() {
  return (
    <>
      <div className="spots">
        <h4 className="spots__title">
          Your top hangout spots where you can chill and shift your focus from
          worries!
        </h4>
        <div className="spots__map" id="map"></div>
      </div>
    </>
  );
}

export default Spots;
