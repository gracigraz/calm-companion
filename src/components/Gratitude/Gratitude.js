import "./Gratitude.scss";

function Gratitude() {
  return (
    <>
      <div>
        <form className="gratitude">
          <label htmlFor="gratitude__label" className="gratitude__label">
            "Hey, what are some things that are absolutely worth living for?
            What lights up your world?"
          </label>
          <input
            type="text"
            id="gratitude__label"
            name="gratitude__label"
          ></input>
          <button>+ Add</button>
        </form>
        <div className="gratitude_thought">
          Kick-ass adventures and wild stories
        </div>
        <div className="gratitude_thought">
          Chilling with your ride-or-die crew
        </div>
        <div className="gratitude_thought">
          The thrill of discovering new stuff
        </div>
        <div className="gratitude_thought">Good vibes and belly laughs</div>
        <div className="gratitude_thought">
          Finding your passion and rocking it
        </div>
        <div className="gratitude_thought">Love that feels like home</div>
        <div className="gratitude_thought">
          Creating something totally unique
        </div>
      </div>
    </>
  );
}

export default Gratitude;
