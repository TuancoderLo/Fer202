import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useMemo } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import Navbar from "./components/Navbar";
import OrchidsContainer from "./components/OrchidsContainer";
import OrchidDetail from "./components/OrchidDetail";
import Contact from "./components/Contact.jsx";
import About from "./components/About";
import Natural from "./components/Natural";
import Special from "./components/Special";
import getTheme from "./theme";
import "./App.css";

function App() {
  const [mode, setMode] = useState(localStorage.getItem("theme") || "light");

  const theme = useMemo(() => getTheme(mode), [mode]);

  const toggleTheme = () => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
    localStorage.setItem("theme", newMode);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <div className="app">
          <Navbar toggleTheme={toggleTheme} mode={mode} />
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
    </ThemeProvider>
  );
}

export default App;
