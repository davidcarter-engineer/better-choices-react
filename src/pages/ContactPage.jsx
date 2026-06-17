/*
  --- PAGE: ContactPage ---
  Two contact options with modal forms that send directly via EmailJS.
  No backend required — EmailJS handles delivery to Gmail.
*/

import { useState } from "react";
import emailjs from "@emailjs/browser";

const SERVICE_ID = "service_7yv2erl";
const PUBLIC_KEY = "HQ82I9p_2nEF2WY9h";
const FEEDBACK_TEMPLATE = "template_0fhfspu";
const RESTAURANT_TEMPLATE = "template_lks3wnf";

function ContactPage() {
  // Which form modal is open: "feedback", "restaurant", or null
  const [activeForm, setActiveForm] = useState(null);
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Feedback form state
  const [feedbackData, setFeedbackData] = useState({
    from_name: "",
    from_email: "",
    message_type: "General Feedback",
    message: "",
  });

  // Restaurant request form state
  const [restaurantData, setRestaurantData] = useState({
    from_name: "",
    from_email: "",
    restaurant_name: "",
    restaurant_location: "",
    request_reason: "",
  });

  function handleFeedbackChange(e) {
    setFeedbackData({ ...feedbackData, [e.target.name]: e.target.value });
  }

  function handleRestaurantChange(e) {
    setRestaurantData({ ...restaurantData, [e.target.name]: e.target.value });
  }

  async function handleFeedbackSubmit(e) {
    e.preventDefault();
    if (!feedbackData.from_name || !feedbackData.from_email || !feedbackData.message) {
      setError("Please fill in all required fields.");
      return;
    }
    setSending(true);
    setError("");
    try {
      await emailjs.send(SERVICE_ID, FEEDBACK_TEMPLATE, feedbackData, PUBLIC_KEY);
      setSuccess("Feedback sent successfully! Thank you.");
      setFeedbackData({ from_name: "", from_email: "", message_type: "General Feedback", message: "" });
      setTimeout(() => { setActiveForm(null); setSuccess(""); }, 2500);
    } catch {
      setError("Failed to send. Please try again later.");
    }
    setSending(false);
  }

  async function handleRestaurantSubmit(e) {
    e.preventDefault();
    if (!restaurantData.from_name || !restaurantData.from_email || !restaurantData.restaurant_name) {
      setError("Please fill in all required fields.");
      return;
    }
    setSending(true);
    setError("");
    try {
      await emailjs.send(SERVICE_ID, RESTAURANT_TEMPLATE, restaurantData, PUBLIC_KEY);
      setSuccess("Request sent successfully! Thank you.");
      setRestaurantData({ from_name: "", from_email: "", restaurant_name: "", restaurant_location: "", request_reason: "" });
      setTimeout(() => { setActiveForm(null); setSuccess(""); }, 2500);
    } catch {
      setError("Failed to send. Please try again later.");
    }
    setSending(false);
  }

  function closeModal() {
    setActiveForm(null);
    setError("");
    setSuccess("");
  }

  return (
    <section className="container page-section">
      <h2>📬 Contact Us</h2>
      <p>We'd love to hear from you! Choose an option below.</p>

      <div className="contact-options">
        <div className="contact-card">
          <h4>💬 Submit Feedback</h4>
          <p>Have a suggestion or found a bug? Let us know how we can improve Better Choices.</p>
          <button className="btn-contact" onClick={() => setActiveForm("feedback")}>
            Send Feedback
          </button>
        </div>

        <div className="contact-card">
          <h4>🍔 Request a Restaurant</h4>
          <p>Don't see your favorite restaurant? Request that we add it to our list.</p>
          <button className="btn-contact" onClick={() => setActiveForm("restaurant")}>
            Request Restaurant
          </button>
        </div>
      </div>

      {/* Modal Overlay */}
      {activeForm && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>✕</button>

            {/* Feedback Form */}
            {activeForm === "feedback" && (
              <form onSubmit={handleFeedbackSubmit}>
                <h3>💬 Submit Feedback</h3>
                <div className="form-group">
                  <label htmlFor="fb-name">Name *</label>
                  <input id="fb-name" name="from_name" value={feedbackData.from_name} onChange={handleFeedbackChange} placeholder="Your name" />
                </div>
                <div className="form-group">
                  <label htmlFor="fb-email">Email *</label>
                  <input id="fb-email" name="from_email" type="email" value={feedbackData.from_email} onChange={handleFeedbackChange} placeholder="Your email" />
                </div>
                <div className="form-group">
                  <label htmlFor="fb-type">Feedback Type</label>
                  <select id="fb-type" name="message_type" value={feedbackData.message_type} onChange={handleFeedbackChange} className="form-select">
                    <option>General Feedback</option>
                    <option>Bug Report</option>
                    <option>Feature Request</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="fb-message">Message *</label>
                  <textarea id="fb-message" name="message" value={feedbackData.message} onChange={handleFeedbackChange} placeholder="Your feedback..." rows="4" />
                </div>
                {error && <p className="form-error">{error}</p>}
                {success && <p className="form-success">{success}</p>}
                <button type="submit" className="btn-save" disabled={sending}>
                  {sending ? "Sending..." : "Submit Feedback"}
                </button>
              </form>
            )}

            {/* Restaurant Request Form */}
            {activeForm === "restaurant" && (
              <form onSubmit={handleRestaurantSubmit}>
                <h3>🍔 Request a Restaurant</h3>
                <div className="form-group">
                  <label htmlFor="rr-name">Name *</label>
                  <input id="rr-name" name="from_name" value={restaurantData.from_name} onChange={handleRestaurantChange} placeholder="Your name" />
                </div>
                <div className="form-group">
                  <label htmlFor="rr-email">Email *</label>
                  <input id="rr-email" name="from_email" type="email" value={restaurantData.from_email} onChange={handleRestaurantChange} placeholder="Your email" />
                </div>
                <div className="form-group">
                  <label htmlFor="rr-restaurant">Restaurant Name *</label>
                  <input id="rr-restaurant" name="restaurant_name" value={restaurantData.restaurant_name} onChange={handleRestaurantChange} placeholder="e.g., Panera Bread" />
                </div>
                <div className="form-group">
                  <label htmlFor="rr-location">Location</label>
                  <input id="rr-location" name="restaurant_location" value={restaurantData.restaurant_location} onChange={handleRestaurantChange} placeholder="e.g., Nationwide" />
                </div>
                <div className="form-group">
                  <label htmlFor="rr-reason">Reason for Request</label>
                  <textarea id="rr-reason" name="request_reason" value={restaurantData.request_reason} onChange={handleRestaurantChange} placeholder="Why should we add this restaurant?" rows="4" />
                </div>
                {error && <p className="form-error">{error}</p>}
                {success && <p className="form-success">{success}</p>}
                <button type="submit" className="btn-save" disabled={sending}>
                  {sending ? "Sending..." : "Submit Request"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

export default ContactPage;
