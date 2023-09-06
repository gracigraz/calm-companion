import "./Hacks.scss";
import { useEffect, useState } from "react";
import { db } from "../../firebase-config.js";
import {
  getDocs,
  collection,
  updateDoc,
  addDoc,
  doc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";

function Hacks() {
  const [strategyList, setStrategyList] = useState([]);

  const loggedUser = localStorage.getItem("user"); //retrieves a user identifier from the browser's local storage. This is what allows us to associate the mood data with a specific user
  const [userData, setUserData] = useState([]); //state varibale used to to store the user's data fetched from firebase. it is initialized to an aempty array

  const usersCollectionRef = collection(db, "users"); //reference to the user's collection in firebase
  const conditionUser = userData === null ? true : false; //checks if userData is null, if true a message "Loading.." appears on the screen

  const copingStrategiesCollectionRef = collection(db, "coping-strategies");

  //add new coping-strategy if they cannot find what they want
  const [newStrategyName, setNewStrategyName] = useState("");

  const deleteStrategy = async (id) => {
    try {
      // Remove the strategy with the specified ID from the user's data
      const updatedCopingStrategies = userData.copingStrategies.filter(
        (strategy) => strategy.id !== id
      );

      // Update the user's data in Firestore
      await updateDoc(doc(db, "users", loggedUser), {
        copingStrategies: updatedCopingStrategies,
      });

      // Update strategyList to reflect the change
      setStrategyList((prevStrategyList) =>
        prevStrategyList.filter((strategy) => strategy.id !== id)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const getStrategyList = async () => {
    //Read the data
    //Set the strategy list
    try {
      const data = await getDocs(copingStrategiesCollectionRef); //fetch coping strategies and store in strategylist state variable
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        selected: false,
      })); //grab the data that we want from data some pieces of information, not really filtered
      console.log(filteredData);
      setStrategyList(filteredData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getStrategyList();
  }, []);

  const toggleStrategy = (id) => {
    const updatedStrategies = strategyList.map((strategy) => {
      if (strategy.id === id) {
        return { ...strategy, selected: !strategy.selected };
      }
      return strategy;
    });
    setStrategyList(updatedStrategies);
  };

  const saveSelectedStrategies = async () => {
    try {
      const userDocRef = doc(db, "users", loggedUser);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();

        // Filter selected strategies
        const selectedStrategies = strategyList.filter(
          (strategy) => strategy.selected
        );

        // Merge selected strategies with user's existing ones
        const mergedStrategies = [
          ...(userData.copingStrategies || []),
          ...selectedStrategies,
        ];

        // Update the user's data with the merged strategies
        await updateDoc(userDocRef, {
          copingStrategies: mergedStrategies,
        });

        // Update strategyList to maintain selected state
        const updatedStrategies = strategyList.map((strategy) => {
          if (strategy.selected) {
            return { ...strategy, selected: true };
          }
          return strategy;
        });

        setStrategyList(updatedStrategies);
      } else {
        console.log("User document not found");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const addNewStrategy = async () => {
    try {
      if (newStrategyName.trim() !== "") {
        // Create a new coping strategy object
        const newCopingStrategy = {
          name: newStrategyName,
          selected: false,
        };

        // Update the user's data in Firestore with the new strategy
        await updateDoc(doc(db, "users", loggedUser), {
          copingStrategies: [
            ...(userData.copingStrategies || []),
            newCopingStrategy,
          ],
        });

        // Update strategyList to include the new strategy
        setStrategyList((prevStrategyList) => [
          ...prevStrategyList,
          newCopingStrategy,
        ]);

        // Clear the input field
        setNewStrategyName("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  //function that fetches user data based on the loggedUser identifier and updates the user's data (userData) state variable.
  useEffect(() => {
    //getUser fetches the user data from firebase
    const getUser = async () => {
      try {
        const snap = await getDoc(doc(db, "users", loggedUser)); //getDOc to get a  specific document in the users collection, we get loggedUser from local storage and is used as the document's ID
        //if the document exists it returns a DocumentSnaphot object which means the user data has been found in firestore
        if (snap.exists()) {
          let data = snap.data(); //extracts user data
          setUserData(data); //update userData with extracted/fetched user data
          console.log(userData);
        } else {
          console.log("No such document"); //if documenent doesn't exist in firestore
        }
      } catch (err) {
        console.log(err);
      }
    };
    getUser(); // calling getUSer to initiate thw data fetching when the component is mounted
  }, [conditionUser]); //useeffect runs everytime the conditioUser array changes

  if (conditionUser) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="hacks">
        <Link to="/dashboard">
          <FontAwesomeIcon
            className="fa-1x hacks__back"
            icon={icon({ name: "chevron-left", style: "solid" })}
          />
        </Link>

        <h4 className="hacks__title">
          Activities you love that can help take your mind off worries! (tap the
          ones that serve you today!)
        </h4>

        <div className="hacks__container">
          {strategyList.map((strategy) => (
            <div key={strategy.id} className="hacks__strategy">
              <button
                className={`hacks__button ${
                  strategy.selected ? "hacks__button--selected" : ""
                }`}
                onClick={() => toggleStrategy(strategy.id)}
              >
                {strategy.name}
              </button>
              <FontAwesomeIcon
                className="fa-1x hacks__delete"
                icon={icon({ name: "trash", style: "solid" })}
                onClick={() => deleteStrategy(strategy.id)}
              />
            </div>
          ))}
        </div>
        <label className="hacks__label">
          Can't find a coping strategy that matches your feelings? Create your
          own!
          <input
            className="hacks__input"
            onChange={(event) => setNewStrategyName(event.target.value)}
            value={newStrategyName}
          />
          {/* <FontAwesomeIcon
            className="fa-1x hacks__add"
            icon={icon({ name: "plus", style: "solid" })}
            onClick={addNewStrategy}
          /> */}
        </label>
        <div className="hacks__buttons">
          <button className="hacks__add" onClick={addNewStrategy}>
            +Add New Hack
          </button>
          <button
            className="hacks__save"
            onClick={saveSelectedStrategies} // Use saveSelectedStrategies for saving selected strategies
          >
            Save All
          </button>
        </div>
      </div>
    </>
  );
}

export default Hacks;
