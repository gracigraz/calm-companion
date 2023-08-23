import "./App.scss";
import { db } from "./firebase-config";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Welcome from "./components/Welcome/Welcome";

// require("dotenv").config();

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
