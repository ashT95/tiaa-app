import { MemoryRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import Base from "./components/base"

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Base />} />
      </Routes>
    </Router>
  );
}
