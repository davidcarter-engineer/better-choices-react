/*
  --- COMPONENT: Navigation ---
  Renders the navigation bar with conditional auth links.

  When logged OUT: shows Login and Sign Up links.
  When logged IN: shows "Welcome, {username}", Profile, and Logout.

  Uses useAuth() hook to read the current user state from AuthContext.
*/

import { useState, useEffect, useRef } from "react";
import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAuth } from "../context/AuthContext";
import { clearDiary, fetchDiaryEntries } from "../store/diarySlice";
import { clearFavorites, fetchFavorites } from "../store/favoritesSlice";

function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);

  // Load user-specific data when user logs in
  useEffect(() => {
    if (user) {
      dispatch(fetchDiaryEntries());
      dispatch(fetchFavorites());
    }
  }, [user, dispatch]);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
    setDropdownOpen(false);
  }, [location]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleLogout() {
    logout();
    dispatch(clearDiary());
    dispatch(clearFavorites());
    setDropdownOpen(false);
    navigate("/");
  }

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

        {/* Conditional auth navigation */}
        {!user ? (
          <>
            <li><NavLink to="/login">Login</NavLink></li>
            <li><NavLink to="/register">Sign Up</NavLink></li>
          </>
        ) : (
          <li className="nav-user-dropdown" ref={dropdownRef}>
            <button
              className="nav-dropdown-toggle"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              {user.profilePic && (
                <img src={user.profilePic} alt="" className="nav-profile-pic" />
              )}
              Welcome, {user.username} ▾
            </button>
            {dropdownOpen && (
              <div className="nav-dropdown-menu">
                <Link to="/profile" onClick={() => setDropdownOpen(false)}>Profile</Link>
                <button onClick={handleLogout}>Sign Out</button>
              </div>
            )}
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navigation;
