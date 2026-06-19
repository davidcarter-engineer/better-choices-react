import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";

function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav className="main-nav" aria-label="Main navigation">
      <button
        className="nav-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label="Toggle navigation"
      >
        {isOpen ? "✕" : "☰"}
      </button>
      <ul className={isOpen ? "nav-open" : ""}>
        <li><NavLink to="/" end>Home</NavLink></li>
        <li><NavLink to="/about">About</NavLink></li>
        <li><NavLink to="/restaurants">Restaurants</NavLink></li>
        <li><NavLink to="/favorites">Favorites</NavLink></li>
        <li><NavLink to="/food-diary">Food Diary</NavLink></li>
        <li><NavLink to="/nutrition-lookup">Nutrition Lookup</NavLink></li>
        <li><NavLink to="/contact">Contact</NavLink></li>
        <li><NavLink to="/disclaimer">Disclaimer</NavLink></li>
      </ul>
    </nav>
  );
}

export default Navigation;
