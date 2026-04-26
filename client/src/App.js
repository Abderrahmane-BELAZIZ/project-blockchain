import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Ex1 from "./pages/Ex1";
import Ex2 from "./pages/Ex2";
import Ex3 from "./pages/Ex3";
import Ex4 from "./pages/Ex4";
import Ex5 from "./pages/Ex5";
import Ex6 from "./pages/Ex6";
import Ex7 from "./pages/Ex7";
import Ex8 from "./pages/Ex8";

const exercices = [
  { path: "/ex1", label: "Ex 1" },
  { path: "/ex2", label: "Ex 2" },
  { path: "/ex3", label: "Ex 3" },
  { path: "/ex4", label: "Ex 4" },
  { path: "/ex5", label: "Ex 5" },
  { path: "/ex6", label: "Ex 6" },
  { path: "/ex7", label: "Ex 7" },
  { path: "/ex8", label: "Ex 8" },
];

function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-brand">
          <div className="navbar-logo">⬡</div>
          <span className="navbar-title">TP3 Blockchain</span>
        </Link>

        <div className="nav-divider" />

        {exercices.map((ex) => (
          <Link
            key={ex.path}
            to={ex.path}
            className={`nav-link ${location.pathname === ex.path ? "active" : ""}`}
          >
            {ex.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <span>TP3 — Développement Blockchain</span>
        <div className="footer-dot" />
        <span>Solidity · Web3.js · Ganache</span>
        <div className="footer-dot" />
        <span>BELAZIZ</span>
      </div>
    </footer>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <Navbar />
        <main className="page-content fade-in">
          <Routes>
            <Route path="/"    element={<Home />} />
            <Route path="/ex1" element={<Ex1 />} />
            <Route path="/ex2" element={<Ex2 />} />
            <Route path="/ex3" element={<Ex3 />} />
            <Route path="/ex4" element={<Ex4 />} />
            <Route path="/ex5" element={<Ex5 />} />
            <Route path="/ex6" element={<Ex6 />} />
            <Route path="/ex7" element={<Ex7 />} />
            <Route path="/ex8" element={<Ex8 />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;