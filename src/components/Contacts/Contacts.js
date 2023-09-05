import "./Contacts.scss";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase-config";
import {
  collection,
  addDoc,
  getDoc,
  doc,
  query,
  where,
  updateDoc,
} from "firebase/firestore";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";

function Contacts() {
  const [contactName, setContactName] = useState("");
  const [contactPhoneNumber, setContactPhoneNumber] = useState("");
  const [contacts, setContacts] = useState([]);
  const loggedUser = localStorage.getItem("user");
  const [userData, setUserData] = useState([]);
  const conditionUser = userData === null ? true : false;

  const handleCall = () => {
    window.location.href = "tel:" + contactPhoneNumber;
  };
  const handleAddContact = async () => {
    try {
      // Add the new contact to the user's database
      await addDoc(collection(db, "contacts"), {
        userId: loggedUser,
        contactName,
        contactPhoneNumber,
      });
      // Fetch the updated contacts and update the state
      fetchContacts();
      // Clear the input fields
      setContactName("");
      setContactPhoneNumber("");
    } catch (error) {
      console.error("Error adding contact:", error);
    }
  };

  const fetchContacts = async () => {
    try {
      const contactsSnapshot = await getDoc(
        query(collection(db, "contacts"), where("userId", "==", loggedUser))
      );

      const fetchedContacts = [];
      contactsSnapshot.forEach((contactDoc) => {
        fetchedContacts.push({ id: contactDoc.id, ...contactDoc.data() });
      });

      setContacts(fetchedContacts);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  useEffect(() => {
    const getUser = async () => {
      try {
        const snap = await getDoc(doc(db, "users", loggedUser));
        if (snap.exists()) {
          let data = snap.data();
          setUserData(data);
          console.log(userData);
        } else {
          console.log("No such document");
        }
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [conditionUser]);

  if (conditionUser) {
    return <div>Loading...</div>;
  }
  return (
    <div className="contacts">
      <Link to="/dashboard">
        <FontAwesomeIcon
          className="fa-1x contacts__back"
          icon={icon({ name: "chevron-left", style: "solid" })}
        />
      </Link>
      <h4 className="contacts__title">
        Just jot down the names and phone numbers of people like friends,
        family, professionals, or anyone else you could get in touch with in
        case of a crisis!
      </h4>
      <div className="contacts__container" onClick={handleCall}>
        {contacts.map((contact) => (
          <div key={contact.id} className="contacts__contact">
            <div className="contacts__avatar"></div>
            <p className="contacts__nickname">{contact.contactName}</p>
          </div>
        ))}
      </div>
      <div className="contacts__newcontact-container">
        <div className="contacts__newcontact">
          <input
            className="contacts__name"
            name="name"
            placeholder="Name"
            value={contactName}
            onChange={(e) => setContactName(e.target.value)}
          />
          <input
            className="contacts__phone"
            name="phoneNumber"
            placeholder="Phone Number"
            value={contactPhoneNumber}
            onChange={(e) => setContactPhoneNumber(e.target.value)}
          />
        </div>
        <button className="contacts__button" onClick={handleAddContact}>
          + Add Help
        </button>
      </div>
    </div>
  );
}
export default Contacts;
