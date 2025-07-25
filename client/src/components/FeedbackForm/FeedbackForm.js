import React, { useState } from 'react';
import './FeedbackForm.css';

export default function FeedbackForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    rating: 0
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRating = (rating) => {
    setFormData(prev => ({ ...prev, rating }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Feedback submitted:', formData);
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '', rating: 0 });
  };

  return (
    <div className="feedback-form-container">
      {submitted && <p className="success-msg">✅ Thank you for your feedback!</p>}
      <form onSubmit={handleSubmit} className="feedback-form">
        <label>Name
          <input type="text" name="name" required value={formData.name} onChange={handleChange} />
        </label>

        <label>Email
          <input type="email" name="email" required value={formData.email} onChange={handleChange} />
        </label>

        <label>Message
          <textarea name="message" required value={formData.message} onChange={handleChange}></textarea>
        </label>

        <label>Rating</label>
        <div className="star-rating">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`star ${formData.rating >= star ? 'filled' : ''}`}
              onClick={() => handleRating(star)}
            >
              ★
            </span>
          ))}
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
