import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import OrchidsContainer from "./components/OrchidsContainer";
import OrchidDetail from "./components/OrchidDetail";
import Contact from "./components/Contact.jsx";
import About from "./components/About";
import Natural from "./components/Natural";
import Special from "./components/Special";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<OrchidsContainer />} />
            <Route path="/orchid/:id" element={<OrchidDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/naturals" element={<Natural />} />
            <Route path="/special" element={<Special />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
