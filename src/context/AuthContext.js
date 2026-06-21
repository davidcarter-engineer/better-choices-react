/*
  --- AuthContext ---
  Provides authentication state to the entire app using React Context.

  --- JWT Authentication ---
  JSON Web Tokens (JWT) are a standard for securely transmitting
  information between client and server. After login, the server returns
  a signed token. The client stores it and sends it with future requests
  (in the Authorization header) to prove the user is authenticated.

  --- Token Storage ---
  We store the JWT in localStorage so it persists across page reloads.
  On app load, we check localStorage for an existing token and restore
  the session automatically. On logout, we remove it.

  --- Login Flow ---
  1. User submits email + password
  2. POST /api/auth/login sends credentials to the backend
  3. Server validates and returns { token, user }
  4. We store the token in localStorage and set user state
  5. The app re-renders showing the authenticated UI

  --- Registration Flow ---
  1. User submits username + email + password
  2. POST /api/auth/register sends data to the backend
  3. Server creates the account and returns { token, user }
  4. We store the token and set user state (auto-login after register)
*/

import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

// Base URL for the backend API
const API_URL = "http://localhost:5001";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  // On mount, if a token exists in localStorage, fetch the user profile
  useEffect(() => {
    if (token) {
      fetchProfile();
    } else {
      setLoading(false);
    }
  }, []);

  async function fetchProfile() {
    try {
      const res = await fetch(`${API_URL}/api/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      } else {
        // Token is invalid/expired — clear it
        logout();
      }
    } catch {
      logout();
    }
    setLoading(false);
  }

  async function login(email, password) {
    const url = `${API_URL}/api/auth/login`;
    console.log("Login request URL:", url);

    let res;
    try {
      res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
    } catch (networkError) {
      console.error("Network error:", networkError);
      throw new Error("Cannot connect to server. Check that the API is running and CORS is enabled.");
    }

    console.log("Login response status:", res.status);
    const data = await res.json();
    console.log("Login response JSON:", data);

    if (!res.ok) throw new Error(data.message || "Login failed");
    // Store token in localStorage and update state
    localStorage.setItem("token", data.token);
    setToken(data.token);
    setUser(data.user);
  }

  async function register(username, email, password, firstName, lastName, phone) {
    const url = `${API_URL}/api/auth/register`;
    console.log("Register request URL:", url);

    let res;
    try {
      res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password, firstName, lastName, phone }),
      });
    } catch (networkError) {
      console.error("Network error:", networkError);
      throw new Error("Cannot connect to server. Check that the API is running and CORS is enabled.");
    }

    console.log("Register response status:", res.status);
    const data = await res.json();
    console.log("Register response JSON:", data);

    if (!res.ok) throw new Error(data.message || "Registration failed");

    // Auto-login after successful registration
    localStorage.setItem("token", data.token);
    setToken(data.token);
    setUser(data.user);
  }

  function logout() {
    // Remove token from localStorage and clear user state
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  }

  // Update user profile fields and optionally a profile picture
  async function updateProfile(profileData) {
    const url = `${API_URL}/api/profile`;
    let res;
    try {
      res = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(profileData),
      });
    } catch (networkError) {
      throw new Error("Cannot connect to server.");
    }
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Update failed");
    setUser(data.user);
  }

  async function changePassword(currentPassword, newPassword) {
    let res;
    try {
      res = await fetch(`${API_URL}/api/auth/change-password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
    } catch {
      throw new Error("Cannot connect to server.");
    }
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Password change failed");
    return data.message;
  }

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout, updateProfile, changePassword }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook for consuming auth context
export function useAuth() {
  return useContext(AuthContext);
}
