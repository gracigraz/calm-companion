import "./App.scss";
import { db } from "./firebase-config";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Welcome from "./components/Welcome/Welcome";
import Auth from "./components/Auth/Auth";
import SignUp from "./components/SignUp/SignUp";
import Cookies from "universal-cookie";
const cookies = new Cookies();

// require("dotenv").config();

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/:id" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
