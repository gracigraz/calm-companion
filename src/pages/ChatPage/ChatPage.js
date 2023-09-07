import Nav from "../../components/Nav/Nav.js";
import React, { useState } from "react";
import Chat from "../../components/Chat/Chat.js";
import Auth from "../../components/Auth/Auth.js";
import { auth } from "../../firebase-config.js";
import { signOut } from "firebase/auth";
import Cookies from "universal-cookie";
import "./ChatPage.scss";

const cookies = new Cookies();

function ChatPage() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token")); //Auth is equal to true if there's an auth token present in cookies.
  const [isInChat, setIsInChat] = useState(null); //tracks whether the user is currently in a chat room. Initially, it is not that's why it is set to mull.
  const [chatRoom, setChatRoom] = useState(""); //represents the room the user typed in.

  //handles the rendering of chat-related components based on the user's actions and inputs.
  return (
    <>
      <main className="chat-page">
        <h1 className="chat-page__title">Welcome to Our Chat Oasis!</h1>
        {/* If isAuth === true, and the user is not currently in a chat room (isInChat === false), 
        render input field + button to allow the user to input chat room name and jump into a conversation. */}
        {isAuth ? (
          <div className="chat-page__container">
            {!isInChat ? (
              <div className="chat-page__room">
                <label className="chat-page__label">
                  Room Name (Give it a cool title!):
                  <input
                    placeholder="Enter room name..."
                    className="chat-page__input"
                    onChange={(e) => setChatRoom(e.target.value)}
                  />
                </label>
                <button
                  className="chat-page__button"
                  onClick={() => {
                    setIsInChat(true);
                  }}
                >
                  Jump into the Conversation
                </button>
              </div>
            ) : (
              // If the user is authenticated and they are already in a chat room render the chat
              <Chat chatRoom={chatRoom} />
            )}
          </div>
        ) : (
          //else render login
          <Auth setIsAuth={setIsAuth} />
        )}
      </main>
      <Nav />
    </>
  );
}

export default ChatPage;
