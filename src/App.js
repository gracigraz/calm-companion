import "./App.scss";
import { db } from "./firebase-config";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Welcome from "./components/Welcome/Welcome";
import Auth from "./components/Auth/Auth";
import SignUp from "./components/SignUp/SignUp";
import Crisis from "./components/Crisis/Crisis";
import MapER from "./components/MapER/MapER";
import MapUrgentCare from "./components/MapUrgentCare/MapUrgentCare";
import Cookies from "universal-cookie";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import Toolkit from "./components/Toolkit/Toolkit";
import Gratitude from "./components/Gratitude/Gratitude";
import Hacks from "./components/Hacks/Hacks";
import Spots from "./components/Spots/Spots";
import Contacts from "./components/Contacts/Contacts";
import ChatPage from "./pages/ChatPage/ChatPage";
const cookies = new Cookies();

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/crisis" element={<Crisis />} />
        <Route path="/toolkit" element={<Toolkit />} />
        <Route path="/gratitude" element={<Gratitude />} />
        <Route path="/hacks" element={<Hacks />} />
        <Route path="/myspots" element={<Spots />} />
        <Route path="/mycontacts" element={<Contacts />} />
        <Route path="/urgent-care" element={<MapUrgentCare />} />
        <Route path="/emergency-room" element={<MapER />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
