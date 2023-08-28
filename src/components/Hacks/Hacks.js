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
{
}

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

  const deleteStrategy = async (id) => {
    const strategyDoc = doc(db, "coping-strategy", id);
    await deleteDoc(strategyDoc);
  };

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
        Name: newStrategyName,
      });
      getStrategyList();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="hacks">
        <div className="hacks__back"></div>
        <h4 className="hacks__title">
          Activities you love that help take your mind off worries!
        </h4>
        <div className="hacks__container">
          {strategyList.map((strategy) => (
            <button key={doc.id} className="hacks__button">
              {strategy.Name}
            </button>
          ))}

          <input
            placeholder="Can't find a coping strategy that matches your feelings? Create your own!"
            onChange={(event) => setNewStrategyName(event.target.value)}
          ></input>
          <button className="hacks__save" onClick={onSubmitStrategy}>
            +
          </button>
          <button className="hacks__delete" onClick={() => deleteStrategy(id)}>
            -
          </button>
        </div>
      </div>
    </>
  );
}

export default Hacks;
