import "./Spots.scss";

function Spots() {
  return (
    <>
      <div className="spots">
        <h4 className="spots__exit">X</h4>
        {/* //back or exit use icon */}
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
    </>
  );
}

export default Spots;
