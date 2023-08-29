// import React, { useState, useEffect } from "react";
// import { Chat } from "./components/Chat/Chat.js";
// import { Auth } from "./components/Auth/Auth.js";

// import "./ChatPage.scss";

// import Cookies from "universal-cookie";
// const cookies = new Cookies();

// function ChatPage() {
//   const [isAuth, setIsAuth] = useState(cookies.get("auth-token")); //
//   const [isInChat, setIsInChat] = useState(null);
//   const [chatRoom, setChatRoom] = useState("");//represents the room the user typed in , is the room empty or no if not null we want to display the chat
// //   is Auth is equal to true if there's an auth token present
//   if (!isAuth) {
//     return (
//       <div isAuth={isAuth} setIsAuth={setIsAuth} setIsInChat={setIsInChat}>
//         <Auth setIsAuth={setIsAuth} />
//       </div>
//     );
//   }

//   return (
//     // <AppWrapper isAuth={isAuth} setIsAuth={setIsAuth} setIsInChat={setIsInChat}>
//       {!isInChat ? (
//         <div className="room">
//           <label> Type room name: </label>
//           <input onChange={(e) => setChatRoom(e.target.value)} />
//           <button
//             onClick={() => {
//               setIsInChat(true);
//             }}
//           >
//             Join Conversation
//           </button>
//         </div>
//       ) : (
//         <Chat chatRoom={chatRoom} />
//       )}
//     </AppWrapper>
//   );
// }

// export default ChatPage;

import React, { useState } from "react";
import Chat from "../../components/Chat/Chat.js";
import Auth from "../../components/Auth/Auth.js";
import { auth } from "../../firebase-config.js";
import { signOut } from "firebase/auth";
import Cookies from "universal-cookie";
import "./ChatPage.scss";

const cookies = new Cookies();

function ChatPage() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [isInChat, setIsInChat] = useState(null);
  const [chatRoom, setChatRoom] = useState("");

  const handleSignOut = async () => {
    await signOut(auth);
    cookies.remove("auth-token");
    setIsAuth(false);
    setIsInChat(false);
  };

  return (
    <div className="App">
      <div className="app-header">
        <h1> Chat App </h1>
      </div>

      <div className="app-container">
        {isAuth ? (
          <div>
            {!isInChat ? (
              <div className="room">
                <label> Type room name: </label>
                <input onChange={(e) => setChatRoom(e.target.value)} />
                <button
                  onClick={() => {
                    setIsInChat(true);
                  }}
                >
                  Enter Chat
                </button>
              </div>
            ) : (
              <Chat chatRoom={chatRoom} />
            )}
          </div>
        ) : (
          <Auth setIsAuth={setIsAuth} />
        )}
      </div>

      {isAuth && (
        <div className="sign-out">
          <button onClick={handleSignOut}> Sign Out</button>
        </div>
      )}
    </div>
  );
}

export default ChatPage;
