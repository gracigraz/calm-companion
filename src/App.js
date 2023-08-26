import "./App.scss";
import { db } from "./firebase-config";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Welcome from "./components/Welcome/Welcome";
import Auth from "./components/Auth/Auth";
import SignUp from "./components/SignUp/SignUp";
import Cookies from "universal-cookie";
const cookies = new Cookies();
<link
  href="https://api.mapbox.com/mapbox-gl-js/v2.8.1/mapbox-gl.css"
  rel="stylesheet"
/>;
// require("dotenv").config();

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
