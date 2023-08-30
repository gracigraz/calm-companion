import React, { useEffect, useState } from "react";
import { db, auth } from "../../firebase-config";
import {
  collection,
  addDoc,
  where,
  serverTimestamp, //function from firebase that creates a timestamp
  onSnapshot, //listen to changes in messages, requires a query specifying what changes are we listening to
  query,
  orderBy,
} from "firebase/firestore";

import "./Chat.scss";

function Chat(props) {
  //   const [nickname, setNickname] = useState("");

  const { chatRoom } = props;

  const [newMessage, setNewMessage] = useState("");

  const messagesRef = collection(db, "messages");

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    //only grab the messages from my secific room
    const queryMessages = query(
      messagesRef,
      where("chatRoom", "==", chatRoom),
      orderBy("createdAt")
    );
    const unsuscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id }); //we can grab the data from the document by using doc.data but the id isnt' included in doc.data so we need to get it separately
      });
      setMessages(messages); //update a state to keep track of all the messages so that we can see the changes happen in real time
      console.log(messages);
    });
    return () => unsuscribe(); //return and clean up the useeffect once done, can cause a lot of issues with performance
  }, []); //query is a function from firestore

  const handleSubmit = async (event) => {
    event.preventDefault(); //prevent default behavior of form

    if (newMessage === "") return; //check if message is empty, end the function so that we dont submit an empty message

    await addDoc(messagesRef, {
      //adds a document to a collection
      message: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser.uid,
      user: auth.currentUser.displayName, //which user typed the message
      chatRoom, //which room are these messages being interchanged
    });

    // await addDoc(messagesRef, {
    //   message: newMessage,
    //   createdAt: serverTimestamp(),
    //   user: auth.currentUser.uid,
    //   nickname: nickname, // Save the nickname for it to be anonymous
    //   chatRoom,
    // });

    setNewMessage(""); //once we add the message in the db we want to empty it out
  };
  const handleEndChat = () => {
    window.location.href = "/";
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <h4 className="chat__title">Hello there, welcome to {chatRoom}</h4>
      </div>
      {/* <input
        type="text"
        className="chat__nickname"
        placeholder="Enter your nickname"
        value={nickname}
        onChange={(event) => setNickname(event.target.value)}
      /> */}
      <div className="chat__messages">
        {messages.map((message) => (
          <div className="chat__message" key={message.id}>
            <span className="chat__user">{message.user}:</span>{" "}
            {message.message}
          </div>
        ))}
        {/* //alternative map with nickname try it out */}
        {/* {messages.map((message) => (
          <div className="chat__message" key={message.id}>
            <span className="chat__user">{message.nickname}:</span>{" "}
            {message.message}
          </div>
        ))} */}
      </div>
      <form className="chat__form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="chat__new-message"
          placeholder="Enter a message"
          value={newMessage}
          onChange={(event) => setNewMessage(event.target.value)}
        />
        <button className="chat__send-button" type="submit">
          Send
        </button>
      </form>
      <button className="chat__end" onClick={handleEndChat}>
        End Chat
      </button>
    </div>
  );
}
export default Chat;
