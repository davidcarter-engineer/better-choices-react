/*
  --- COMPONENT: Navigation ---
  This component renders the navigation bar using React Router's Link component.

  Link — Replaces traditional <a> tags for internal navigation.
  Unlike <a> tags, Link does NOT cause a full page reload.
  It updates the URL and renders the matching Route component instantly.
*/

import { Link } from "react-router-dom";

function Navigation() {
  return (
    <nav className="main-nav" aria-label="Main navigation">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/restaurants">Restaurants</Link></li>
        <li><Link to="/favorites">Favorites</Link></li>
        <li><Link to="/food-diary">Food Diary</Link></li>
        <li><Link to="/nutrition-lookup">Nutrition Lookup</Link></li>
      </ul>
    </nav>
  );
}

export default Navigation;
