import React, { useEffect, useState } from "react";
import { db, auth } from "../../firebase-config";
import {
  collection, //function that allows to make a reference to a collection in firebase
  addDoc,
  where,
  serverTimestamp, //function from firebase that creates a timestamp
  onSnapshot, // function in firebase that listens to changes in messages, requires a query specifying what changes are we listening to
  query,
  orderBy,
} from "firebase/firestore"; //functions and objects from firebase library
import "./Chat.scss";

function Chat(props) {
  const [nickname, setNickname] = useState("");
  const [emoji, setEmoji] = useState("🥷🏻"); // default emoji
  const { chatRoom } = props; //extracts the chatRoom prop from the props object

  const [newMessage, setNewMessage] = useState(""); //manages the user's new chat messages

  const messagesRef = collection(db, "messages"); //reference to Firestore collection called "messages" using collection function

  const [messages, setMessages] = useState([]); //state variable used to store an array of chat messages, when new messages are received or sent, setMessages is used to add them to the messages array.

  // used to get and listen to chat messages when the component is first rendered
  useEffect(() => {
    //query to only grab the messages from a specific room
    const queryMessages = query(
      messagesRef,
      where("chatRoom", "==", chatRoom),
      orderBy("createdAt")
    );
    //onSnapshot function listens for real-time updates to the query and updates the messages state whenever new messages are added or existing ones change.
    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id }); //we can grab the data from the document by using doc.data but the id isnt' included in doc.data so we need to get it separately
      });
      setMessages(messages); //update a state to keep track of all the messages so that we can see the changes happen in real time
      console.log(messages);
    });

    return () => unsubscribe(); //return and clean up the useeffect once done, can cause a lot of issues with performance
  }, []); //query is a function from firestore

  // function that handles the submission of new chat messages
  const handleSubmit = async (event) => {
    event.preventDefault(); //prevent default behavior of form

    if (newMessage === "") return; //check if message is empty, end the function so that we dont submit an empty message

    await addDoc(messagesRef, {
      message: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser.uid,
      nickname: nickname, // Save the nickname for it to be anonymous
      chatRoom,
      emoji: emoji,
    });

    setNewMessage(""); //once we add the message in the db we want to empty it out
  };
  //   function that redirects the user to the home page when the "End Chat" button is clicked.
  const handleEndChat = () => {
    window.location.href = "/dashboard";
  };

  // function that shows the chat room title, a list of messages, an input field for new messages, and a "Send" button
  return (
    <div className="chat">
      <h4 className="chat__title">
        Hello there, welcome to "{chatRoom}" chat room!
      </h4>
      {/* users will be prompted to enter their nickname when they access the chat
      room. The nickname will be saved along with the messages they send. The nickname doesn't need to be
      stored or managed across sessions. */}
      <p className="chat__label">Your Online Display Name and Avatar Emoji:</p>
      <div className="chat__inputs">
        <input
          type="text"
          className="chat__nickname"
          placeholder="Enter your nickname..."
          value={nickname}
          onChange={(event) => setNickname(event.target.value)}
        />
        <input
          type="text"
          className="chat__emoji"
          placeholder="Enter emoji (e.g., 🤔)..."
          value={emoji}
          onChange={(event) => setEmoji(event.target.value)}
        />
      </div>

      <div className="chat__messages">
        {messages.map((message) => (
          <div className="chat__message" key={message.id}>
            <span className="chat__user">{message.nickname} </span>
            <span className="chat__emoji">{message.emoji}: </span>
            {message.message}
          </div>
        ))}
      </div>
      <form className="chat__form" onSubmit={handleSubmit}>
        <button className="chat__end" onClick={handleEndChat}>
          End
        </button>
        <input
          type="text"
          className="chat__new-message"
          placeholder="Enter a message..."
          value={newMessage}
          onChange={(event) => setNewMessage(event.target.value)}
        />
        <button className="chat__send-button" type="submit">
          Send
        </button>
      </form>
    </div>
  );
}
export default Chat;
