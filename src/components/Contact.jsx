import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';

const Linkedin = ({ size = 18, className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={`lucide lucide-linkedin ${className}`}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function Contact() {
  const [formInputs, setFormInputs] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInputs(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, subject, message } = formInputs;
    if (!name || !email || !message) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    const accessKey = import.meta.env.VITE_WEB3FORMS_KEY;

    if (!accessKey) {
      // If no access key is configured, fall back to simulation mode
      setIsSending(true);
      setTimeout(() => {
        setIsSending(false);
        setIsSubmitted(true);
        setErrorMessage('');
        setFormInputs({ name: '', email: '', subject: '', message: '' });
      }, 1000);
      return;
    }

    setIsSending(true);
    setErrorMessage('');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: accessKey,
          name,
          email,
          subject: subject || 'Contact Form Submission',
          message
        })
      });

      const result = await response.json();
      if (result.success) {
        setIsSubmitted(true);
        setFormInputs({ name: '', email: '', subject: '', message: '' });
      } else {
        setErrorMessage(result.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setErrorMessage('Failed to connect to the email service. Please check your internet connection and try again.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="contact" className="section-padding contact-section">
      <div className="container">
        <div className="section-title-wrapper">
          <span className="badge badge-gold">Get In Touch</span>
          <h2 className="section-title">Contact Me</h2>
          <div className="title-underline"></div>
        </div>

        <div className="contact-grid">
          {/* Contact Details Card */}
          <motion.div
            className="contact-details-card premium-card"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="card-title-main">Clinical Communication</h3>
            <p className="card-desc-main">
              Feel free to reach out for professional collaborations, medication safety audits, clinical advisory roles, or general queries.
            </p>

            <div className="details-list">
              <div className="detail-item">
                <div className="icon-box">
                  <MapPin size={20} />
                </div>
                <div className="detail-info">
                  <span className="detail-label">Location</span>
                  <span className="detail-text">Nashik, Maharashtra, India</span>
                </div>
              </div>

              <div className="detail-item">
                <div className="icon-box">
                  <Mail size={20} />
                </div>
                <div className="detail-info">
                  <span className="detail-label">Email Address</span>
                  <a href="mailto:dr.huzaifas02@gmail.com" className="detail-link">
                    dr.huzaifas02@gmail.com
                  </a>
                </div>
              </div>

              <div className="detail-item">
                <div className="icon-box">
                  <Phone size={20} />
                </div>
                <div className="detail-info">
                  <span className="detail-label">Contact Number</span>
                  <a href="tel:+917796594952" className="detail-link">
                    +91 7796594952
                  </a>
                </div>
              </div>

              <div className="detail-item">
                <div className="icon-box">
                  <Linkedin size={20} />
                </div>
                <div className="detail-info">
                  <span className="detail-label">LinkedIn Profile</span>
                  <a 
                    href="https://www.linkedin.com/in/shaikh-huzaifa-6a7107217/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="detail-link"
                  >
                    shaikh-huzaifa-6a7107217
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form Card */}
          <motion.div
            className="contact-form-card premium-card"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            {isSubmitted ? (
              <div className="success-message">
                <CheckCircle size={56} className="success-icon" />
                <h3>Message Sent Successfully!</h3>
                <p>Thank you for reaching out. Dr. Shaikh Huzaifa will get back to you shortly.</p>
                <button onClick={() => setIsSubmitted(false)} className="btn-primary">
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <h3 className="form-title">Send a Direct Message</h3>
                {errorMessage && <div className="error-alert">{errorMessage}</div>}
                
                <div className="form-group-row">
                  <div className="form-group">
                    <label htmlFor="name">Full Name <span className="req">*</span></label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formInputs.name}
                      onChange={handleChange}
                      placeholder="e.g., John Doe"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email Address <span className="req">*</span></label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formInputs.email}
                      onChange={handleChange}
                      placeholder="e.g., john@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formInputs.subject}
                    onChange={handleChange}
                    placeholder="Inquiry Topic"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Your Message <span className="req">*</span></label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formInputs.message}
                    onChange={handleChange}
                    placeholder="Write your clinical or professional message here..."
                    required
                  ></textarea>
                </div>

                <button type="submit" className="btn-primary submit-btn" disabled={isSending}>
                  {isSending ? (
                    <>
                      <div className="btn-spinner" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>

      <style>{`
        .contact-section {
          background-color: var(--bg-primary);
        }

        .contact-grid {
          display: grid;
          grid-template-columns: 0.9fr 1.1fr;
          gap: 40px;
          align-items: stretch;
          max-width: 1000px;
          margin: 0 auto;
        }

        .contact-details-card {
          padding: 40px;
          background-color: var(--bg-secondary);
          display: flex;
          flex-direction: column;
          text-align: left;
        }

        .card-title-main {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 12px;
          color: var(--text-main);
        }

        .card-desc-main {
          color: var(--text-muted);
          font-size: 0.95rem;
          line-height: 1.5;
          margin-bottom: 30px;
        }

        .details-list {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .detail-item {
          display: flex;
          gap: 16px;
          align-items: center;
        }

        .icon-box {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background-color: var(--gold-glow);
          border: 1px solid var(--gold-border);
          color: var(--gold-primary);
          flex-shrink: 0;
        }

        .detail-info {
          display: flex;
          flex-direction: column;
        }

        .detail-label {
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: var(--text-muted);
          margin-bottom: 2px;
        }

        .detail-text, .detail-link {
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--text-main);
        }

        .detail-link:hover {
          color: var(--gold-primary);
        }

        .contact-form-card {
          padding: 40px;
          background-color: var(--bg-secondary);
        }

        .form-title {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 24px;
          color: var(--text-main);
          text-align: left;
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .form-group-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
          text-align: left;
        }

        .form-group label {
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--text-main);
        }

        .req {
          color: var(--danger);
        }

        .form-group input, .form-group textarea {
          padding: 12px 16px;
          border: 1px solid var(--border-color);
          background-color: var(--bg-primary);
          color: var(--text-main);
          border-radius: var(--radius-sm);
          outline: none;
          font-size: 0.95rem;
          font-family: inherit;
          transition: var(--transition-smooth);
        }

        .form-group input:focus, .form-group textarea:focus {
          border-color: var(--gold-primary);
          box-shadow: 0 0 6px var(--gold-glow);
        }

        .submit-btn {
          align-self: flex-start;
          margin-top: 10px;
          display: inline-flex;
          align-items: center;
        }

        .btn-spinner {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top-color: #ffffff;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
          margin-right: 8px;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        .error-alert {
          background-color: rgba(239, 68, 68, 0.1);
          color: var(--danger);
          padding: 12px;
          border-radius: var(--radius-sm);
          font-size: 0.9rem;
          font-weight: 600;
          text-align: left;
          border: 1px solid rgba(239, 68, 68, 0.3);
        }

        .success-message {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
          text-align: center;
          padding: 20px;
        }

        .success-icon {
          color: var(--success);
          margin-bottom: 20px;
        }

        .success-message h3 {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 10px;
        }

        .success-message p {
          color: var(--text-muted);
          font-size: 0.95rem;
          margin-bottom: 24px;
          max-width: 320px;
          line-height: 1.5;
        }

        @media (max-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr;
          }
          .form-group-row {
            grid-template-columns: 1fr;
            gap: 20px;
          }
        }

        @media (max-width: 576px) {
          .contact-details-card, .contact-form-card {
            padding: 24px;
          }
          .submit-btn {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
}
