import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingPage from "./pages/LoadingPage";
import Home from "./pages/Home";
import "./App.css";
import FamilyTree from "./pages/FamilyTree";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoadingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/family-tree" element={<FamilyTree />} />
      </Routes>
    </Router>
  );
};

export default App;
