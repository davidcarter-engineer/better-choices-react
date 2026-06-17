/*
  --- App.js ---
  Root component of the React application.
  Uses React Router to handle multi-page navigation.

  --- React Router ---
  A library that enables client-side navigation in React apps.
  Pages swap instantly without a full browser reload.

  --- BrowserRouter ---
  Wraps the entire app and enables routing.
  It uses the browser's History API to keep the URL in sync
  with the currently displayed page (no full page reloads).

  --- Routes ---
  A container that holds all Route definitions.
  It looks at the current URL and renders the FIRST matching Route.

  --- Route ---
  Defines a single URL path and the component (page) to render.
  Example: <Route path="/restaurants" element={<RestaurantsPage />} />
  When the URL is "/restaurants", React renders RestaurantsPage.
*/

import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import RestaurantsPage from "./pages/RestaurantsPage";
import FavoritesPage from "./pages/FavoritesPage";
import FoodDiaryPage from "./pages/FoodDiaryPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import NutritionLookupPage from "./pages/NutritionLookupPage";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Navigation />
        <main>
          {/* Routes: only the Route matching the current URL will render */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/restaurants" element={<RestaurantsPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/food-diary" element={<FoodDiaryPage />} />
            <Route path="/nutrition-lookup" element={<NutritionLookupPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
