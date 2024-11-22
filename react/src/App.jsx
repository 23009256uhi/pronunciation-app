import { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Conversation from "./pages/Conversation";
import SearchResults from "./pages/SearchResults";
import PracticeWord from "./pages/PracticeWord";
import About from "./pages/About";
import Navbar from "./components/Navbar";

function App() {
  const apiUrl = "https://pronunciation-app.onrender.com";
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  function toggleSidebar() {
    setIsSidebarOpen(!isSidebarOpen);
  }

  function handleResize() {
    if (window.innerWidth > 830) {
      setIsSidebarOpen(false);
    }
  }

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  return (
    <Router>
      <div className="App">
        <div className="main-container">
          {/* Hamburger Button */}
          {!isSidebarOpen && (
            <button className="hamburger-btn" onClick={toggleSidebar}>
              &#9776;
            </button>
          )}

          {/* Sidebar Menu */}
          <div className={`side-menu ${isSidebarOpen ? "open" : ""}`}>
            <Navbar
              isSidebarOpen={isSidebarOpen}
              toggleSidebar={toggleSidebar}
            />
          </div>

          {/* Router View */}
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route
              path="/search/:word"
              element={<SearchResults apiUrl={apiUrl} />}
            />
            <Route
              path="/conversation"
              element={<Conversation apiUrl={apiUrl} />}
            />
            <Route
              path="/practice"
              element={<PracticeWord apiUrl={apiUrl} />}
            />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
