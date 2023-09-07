import "./Contacts.scss";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase-config";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  query,
  deleteDoc,
} from "firebase/firestore";
import { Link } from "react-router-dom"; //imported for navigation
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";

function Contacts() {
  const [contactName, setContactName] = useState(""); //used to track the name of the contact inputed by the user
  const [contactPhoneNumber, setContactPhoneNumber] = useState(""); //used to track the tel number of the contact inputed by the user
  const [contacts, setContacts] = useState([]); //array used to store the list of contacts that we get from the database
  const loggedUser = localStorage.getItem("user"); // gets the user identifier from the local storage in the browser
  const [userData, setUserData] = useState([]); //used to store user data that we get from firestore
  const conditionUser = userData === null ? true : false;

  //function that initiates a phone call to phoneNumber
  const handleCall = (phoneNumber) => {
    window.location.href = "tel:" + phoneNumber;
  };

  //function that gets the a list of contacts for the current user from firestore
  const fetchContacts = async () => {
    try {
      const contactsSnapshot = await getDocs(
        query(collection(db, "users", loggedUser, "contacts"))
      );

      const fetchedContacts = [];
      contactsSnapshot.forEach((contactDoc) => {
        fetchedContacts.push({ id: contactDoc.id, ...contactDoc.data() });
      });

      setContacts(fetchedContacts); // updates the contacts state variable
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };
  // function that adds a new contact's name and tel number to the user's collection in firestore.
  const handleAddContact = async () => {
    try {
      // Add the new contact to the user's collection
      const userContactsRef = collection(db, "users", loggedUser, "contacts");
      await addDoc(userContactsRef, {
        contactName,
        contactPhoneNumber,
      });

      // Fetch the updated contacts and update the state
      fetchContacts();

      // Clear the input fields after adding a contact
      setContactName("");
      setContactPhoneNumber("");
    } catch (error) {
      console.error("Error adding contact:", error);
    }
  };
  // gets the user's contacts when the component is first mounted
  useEffect(() => {
    fetchContacts();
  }, []);
  // function that deletes a contact by its ID from the user's collection
  const handleDeleteContact = async (contactId) => {
    try {
      const userContactsRef = doc(
        db,
        "users",
        loggedUser,
        "contacts",
        contactId
      );
      await deleteDoc(userContactsRef);

      // get the updated contacts and update the state
      fetchContacts();
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };
  //gets the user's data when the component is mounted and whenever conditionUser changes
  useEffect(() => {
    const getUser = async () => {
      try {
        const snap = await doc(db, "users", loggedUser);
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
      <div className="contacts__container">
        {contacts.map((contact) => (
          <div key={contact.id} className="contacts__contact">
            <div className="contacts__avatar">{contact.contactName[0]}</div>
            <p className="contacts__newcontact-name">{contact.contactName}</p>:
            <p
              className="contacts__newcontact-phone"
              onClick={() => handleCall(contact.contactPhoneNumber)}
            >
              {contact.contactPhoneNumber}
            </p>
            <FontAwesomeIcon
              className="contacts__delete"
              icon={icon({ name: "trash", style: "solid" })}
              onClick={() => handleDeleteContact(contact.id)}
            />
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
          + Add Contact
        </button>
      </div>
    </div>
  );
}

export default Contacts;
