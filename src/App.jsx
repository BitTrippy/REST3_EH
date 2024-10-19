import "./App.css";
import AddAthlete from "./Add.jsx";
import Search from "./Search.jsx";
import Modify from "./Modify.jsx";
import Home from "./Home.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      {/* Sovelluksen navigoinnin toteutus käyttämällä routingia */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddAthlete />} />
        <Route path="/modify" element={<Modify />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </BrowserRouter>
  );
}
