import "./Hacks.scss";
import { useEffect, useState } from "react";
import { db } from "../../firebase-config.js";
import {
  getDocs,
  collection,
  addDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";

function Hacks() {
  const [strategyList, setStrategyList] = useState([]);
  // const [strategyListCustom, setStrategyListCustom] = useState([]);

  const copingStrategiesCollectionRef = collection(db, "coping-strategies");
  const customizedCopingStrategiesCollectionRef = collection(
    db,
    "customized-coping-strategy"
  );

  //add new coping-strategy if they cannot find what they want
  const [newStrategyName, setNewStrategyName] = useState("");

  // const deleteStrategy = async (id) => {
  //   const strategyDoc = doc(db, "coping-strategy", id);
  //   await deleteDoc(strategyDoc);
  // };

  const getStrategyList = async () => {
    //Read the data
    //Set the strategy list
    try {
      const data = await getDocs(copingStrategiesCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
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

  // useEffect(() => {
  //   const getCustomStrategyList = async () => {
  //     //Read the data
  //     //Set the strategy list
  //     try {
  //       const data = await getDocs(customizedCopingStrategiesCollectionRef);
  //       const filteredDataCustom = data.docs.map((doc) => ({
  //         ...doc.data(),
  //         id: doc.id,
  //       })); //grab the data that we want from data some pieces of information, not really filtered
  //       console.log(filteredDataCustom);
  //       setStrategyListCustom(filteredDataCustom);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   getStrategyList();
  // }, []);

  const onSubmitStrategy = async () => {
    try {
      await addDoc(copingStrategiesCollectionRef, {
        name: newStrategyName,
      });
      getStrategyList();
      document.querySelector(".hacks__input").value = ""; // clear input field after hittinh + icon
    } catch (error) {
      console.log(error);
    }
  };
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
          Activities you love that help take your mind off worries!
        </h4>

        <div className="hacks__container">
          {strategyList.map((strategy) => (
            <button key={doc.id} className="hacks__button">
              {strategy.name}
            </button>
          ))}
        </div>

        <label className="hacks__label">
          Can't find a coping strategy that matches your feelings? Create your
          own!
          <input
            className="hacks__input"
            onChange={(event) => setNewStrategyName(event.target.value)}
          />
        </label>
        <div className="hacks__buttons">
          <FontAwesomeIcon
            className="fa-1x hacks__save"
            icon={icon({ name: "plus", style: "solid" })}
            onClick={onSubmitStrategy}
          />
          <FontAwesomeIcon
            className="fa-1x hacks__delete"
            icon={icon({ name: "trash", style: "solid" })}
            // onClick={() => deleteStrategy(id)}
          />
        </div>
      </div>
    </>
  );
}

export default Hacks;
