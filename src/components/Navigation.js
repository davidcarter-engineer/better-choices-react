/*
  --- COMPONENT: Navigation ---
  This component renders the navigation bar using React Router.

  --- Link ---
  Replaces traditional <a> tags for internal navigation.
  Unlike <a> tags, Link does NOT cause a full page reload.
  It updates the URL and renders the matching Route component instantly.
  Usage: <Link to="/path">Text</Link>

  --- NavLink ---
  Works exactly like Link, but ALSO adds an "active" CSS class
  automatically when the current URL matches the link's "to" path.
  This lets us style the active page link differently (e.g., highlight it).
  Usage: <NavLink to="/path">Text</NavLink>
*/

import { NavLink } from "react-router-dom";

function Navigation() {
  return (
    <nav className="main-nav" aria-label="Main navigation">
      <ul>
        {/* NavLink adds className="active" when the route matches */}
        <li><NavLink to="/" end>Home</NavLink></li>
        <li><NavLink to="/restaurants">Restaurants</NavLink></li>
        <li><NavLink to="/favorites">Favorites</NavLink></li>
        <li><NavLink to="/food-diary">Food Diary</NavLink></li>
        <li><NavLink to="/nutrition-lookup">Nutrition Lookup</NavLink></li>
      </ul>
    </nav>
  );
}

export default Navigation;
