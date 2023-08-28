import "./Hacks.scss";
import { useEffect, useState } from "react";
import { db } from "../../firebase-config.js";
import { getDocs, collection, doc } from "firebase/firestore";
{
}

function Hacks() {
  const [strategyList, setStrategyList] = useState([]);

  const copingStrategiesCollectionRef = collection(db, "coping-strategies");

  useEffect(() => {
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
    getStrategyList();
  }, []);

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
        </div>
        <button className="hacks__save">Save</button>
      </div>
    </>
  );
}

export default Hacks;
