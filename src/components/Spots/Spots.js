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

        <input className="spots__name" placeholder="Name" />
        <button className="spots__add">+ Add Spot</button>
        {/* button changes color when added */}
      </div>
    </>
  );
}

export default Spots;
