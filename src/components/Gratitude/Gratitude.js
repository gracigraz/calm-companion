import "./Gratitude.scss";
import { db } from "../../firebase-config.js"; // Import both auth and firestore instances
import { collection, addDoc } from "firebase/firestore";

function Gratitude() {
  // const [registerReason, setRegisterReason] = useState("");
  // const usersCollectionRef = collection(db, "users"); //grabbing the users collection form the db and asigning it to usersCollectionRef, collection function we need to import from the firestore, now we can make queries to the users collection

  //   const register = () => {

  //       .then((userCredential) => {
  //         const user = userCredential.user;
  //         // Store additional user info in Firestore
  //         addDoc(usersCollectionRef, {
  //           reason: registerReason,
  //           uid: user.uid,
  //         });
  //         console.log("User registered reason to live:", user);
  //       })
  //       .catch((error) => {
  //         console.log(error.message);
  //       });
  //   };
  return (
    <>
      <div className="gratitude">
        <form className="gratitude__form">
          <label htmlFor="gratitude__label" className="gratitude__label">
            "Hey, what are some things that are absolutely worth living for?
            What lights up your world?"
          </label>
          {/* <input
            className="gratitude__input"
            type="text"
            id="gratitude__label"
            name="gratitude__label"
            value={registerReason} // Binding the value to the state variable
            onChange={(event) => {
              setRegisterReason(event.target.value);
            }}
          />
          <button className="gratitude__button" onClick={register}>
            + Add
          </button> */}
        </form>
        <div className="gratitude__thoughts">
          <div className="gratitude__thought">
            Kick-ass adventures and wild stories
          </div>
          <div className="gratitude__thought">
            Chilling with your ride-or-die crew
          </div>
          <div className="gratitude__thought">
            The thrill of discovering new stuff
          </div>
          <div className="gratitude__thought">Good vibes and belly laughs</div>
          <div className="gratitude__thought">
            Finding your passion and rocking it
          </div>
          <div className="gratitude__thought">Love that feels like home</div>
          <div className="gratitude__thought">
            Creating something totally unique
          </div>
        </div>
      </div>
    </>
  );
}

export default Gratitude;
