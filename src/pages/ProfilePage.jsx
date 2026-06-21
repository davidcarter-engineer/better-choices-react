/*
  --- PAGE: ProfilePage ---
  Allows authenticated users to update their profile information
  including first name, last name, phone number, email, and profile picture.

  Profile picture is converted to a base64 data URL and stored
  so it can be displayed in the nav without needing a file server.
*/

import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProfilePage() {
  const { user, updateProfile, changePassword } = useAuth();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [preview, setPreview] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [changingPassword, setChangingPassword] = useState(false);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    // Populate form with existing user data
    setFirstName(user.firstName || "");
    setLastName(user.lastName || "");
    setPhone(user.phone || "");
    setEmail(user.email || "");
    setProfilePic(user.profilePic || "");
    setPreview(user.profilePic || "");
  }, [user, navigate]);

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfilePic(reader.result);
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  }

  async function openCamera() {
    setShowCamera(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      setError("Unable to access camera.");
      setShowCamera(false);
    }
  }

  function takeSnapshot() {
    const video = videoRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0);
    const dataUrl = canvas.toDataURL("image/png");
    setProfilePic(dataUrl);
    setPreview(dataUrl);
    closeCamera();
  }

  function closeCamera() {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setShowCamera(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");
    try {
      await updateProfile({ firstName, lastName, phone, email, profilePic });
      setSuccess("Profile updated successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.message);
    }
    setSaving(false);
  }

  async function handleChangePassword(e) {
    e.preventDefault();
    if (!currentPassword || !newPassword) {
      setPasswordError("Both fields are required.");
      return;
    }
    setChangingPassword(true);
    setPasswordError("");
    setPasswordSuccess("");
    try {
      const msg = await changePassword(currentPassword, newPassword);
      setPasswordSuccess(msg);
      setCurrentPassword("");
      setNewPassword("");
      setTimeout(() => setPasswordSuccess(""), 3000);
    } catch (err) {
      setPasswordError(err.message);
    }
    setChangingPassword(false);
  }

  if (!user) return null;

  return (
    <section className="container page-section">
      <h2>👤 My Profile</h2>
      <p>Update your personal information below.</p>

      <form className="profile-form" onSubmit={handleSubmit}>
        <div className="profile-pic-section">
          {preview ? (
            <img src={preview} alt="Profile" className="profile-pic-preview" />
          ) : (
            <div className="profile-pic-placeholder">No Photo</div>
          )}
          <div className="profile-pic-buttons">
            <label className="btn-upload">
              Upload Photo
              <input type="file" accept="image/*" onChange={handleImageChange} hidden />
            </label>
            <button type="button" className="btn-upload" onClick={openCamera}>
              Take Photo
            </button>
          </div>
        </div>

        {showCamera && (
          <div className="camera-section">
            <video ref={videoRef} autoPlay playsInline className="camera-video" />
            <div className="camera-actions">
              <button type="button" className="btn-save" onClick={takeSnapshot}>Capture</button>
              <button type="button" className="btn-clear" onClick={closeCamera}>Cancel</button>
            </div>
          </div>
        )}

        <div className="form-group">
          <label htmlFor="prof-first">First Name</label>
          <input
            id="prof-first"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="prof-last">Last Name</label>
          <input
            id="prof-last"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="prof-phone">Phone Number</label>
          <input
            id="prof-phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="(555) 555-5555"
          />
        </div>
        <div className="form-group">
          <label htmlFor="prof-email">Email</label>
          <input
            id="prof-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
          />
        </div>

        {error && <p className="form-error">{error}</p>}
        {success && <p className="form-success">{success}</p>}
        <button type="submit" className="btn-save" disabled={saving}>
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>

      <form className="profile-form" onSubmit={handleChangePassword} style={{ marginTop: "1.5rem" }}>
        <h3>🔒 Change Password</h3>
        <div className="form-group">
          <label htmlFor="current-pw">Current Password</label>
          <input
            id="current-pw"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="Current password"
          />
        </div>
        <div className="form-group">
          <label htmlFor="new-pw">New Password</label>
          <input
            id="new-pw"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="New password"
          />
        </div>
        {passwordError && <p className="form-error">{passwordError}</p>}
        {passwordSuccess && <p className="form-success">{passwordSuccess}</p>}
        <button type="submit" className="btn-save" disabled={changingPassword}>
          {changingPassword ? "Updating..." : "Change Password"}
        </button>
      </form>
    </section>
  );
}

export default ProfilePage;
