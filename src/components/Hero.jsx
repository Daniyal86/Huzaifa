import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Award, ArrowDown } from 'lucide-react';

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

export default function Hero() {
  return (
    <section id="home" className="hero-section">
      <div className="container hero-grid">
        <motion.div 
          className="hero-content"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="badge-wrapper">
            <span className="badge badge-gold">
              <Award size={14} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
              Clinician &amp; Pharmacotherapist
            </span>
          </div>
          <h1 className="hero-title">
            Dr. Shaikh Huzaifa <span className="title-suffix">Pharm.D</span>
          </h1>
          <h2 className="hero-subtitle text-gold-gradient">
            Clinical Pharmacologist &amp; Medication Safety Officer
          </h2>
          <p className="hero-description">
            A Doctor of Pharmacy graduate specializing in critical care pharmacotherapy, medication safety auditing, adverse drug reaction (ADR) monitoring, and NABH clinical safety protocols. Dedicated to optimizing patient outcomes through evidence-based practice and interdisciplinary collaboration.
          </p>

          <div className="contact-info-grid">
            <div className="info-item">
              <MapPin size={18} className="gold-icon" />
              <span>Nashik, Maharashtra, India</span>
            </div>
            <div className="info-item">
              <Mail size={18} className="gold-icon" />
              <a href="mailto:dr.huzaifas02@gmail.com">dr.huzaifas02@gmail.com</a>
            </div>
            <div className="info-item">
              <Phone size={18} className="gold-icon" />
              <a href="tel:+917796594952">+91 7796594952</a>
            </div>
          </div>

          <div className="hero-actions">
            <a href="#contact" className="btn-primary">
              Get in Touch
            </a>
            <a 
              href="https://www.linkedin.com/in/shaikh-huzaifa-6a7107217/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-secondary"
            >
              <Linkedin size={18} />
              LinkedIn Profile
            </a>
          </div>
        </motion.div>

        <div className="hero-visual">
          {/* Framer Motion Spring-physics Twist Animation */}
          <motion.div 
            className="profile-frame"
            initial={{ scale: 0.3, rotate: -60, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ 
              type: "spring", 
              stiffness: 85, 
              damping: 14, 
              delay: 0.15 
            }}
          >
            {/* The profile.jpeg is resolved relative to public folder in Vite */}
            <img 
              src="/assets/images/profile.jpeg" 
              alt="Dr. Shaikh Huzaifa" 
              className="profile-img"
            />
          </motion.div>
          
          <div className="decorative-glow"></div>
        </div>
      </div>

      <div className="scroll-indicator-container">
        <a href="#about" className="scroll-indicator">
          <span>Scroll Down</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <ArrowDown size={16} />
          </motion.div>
        </a>
      </div>

      <style>{`
        .hero-section {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding-top: 100px;
          padding-bottom: 60px;
          background-image: radial-gradient(circle at 80% 20%, rgba(212, 175, 55, 0.03) 0%, transparent 50%);
        }

        [data-theme="dark"] .hero-section {
          background-image: radial-gradient(circle at 80% 20%, rgba(212, 175, 55, 0.06) 0%, transparent 50%);
        }

        .hero-grid {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 60px;
          align-items: center;
          width: 100%;
        }

        .hero-content {
          text-align: left;
        }

        .badge-wrapper {
          margin-bottom: 20px;
        }

        .hero-title {
          font-size: 3.5rem;
          margin-bottom: 12px;
          font-weight: 800;
          letter-spacing: -1px;
        }

        .title-suffix {
          font-size: 1.5rem;
          font-weight: 600;
          color: var(--gold-primary);
          border: 2px solid var(--gold-primary);
          padding: 4px 10px;
          border-radius: 8px;
          margin-left: 10px;
          display: inline-block;
          vertical-align: middle;
        }

        .hero-subtitle {
          font-size: 1.8rem;
          margin-bottom: 24px;
          font-weight: 600;
          letter-spacing: -0.5px;
          line-height: 1.3;
        }

        .hero-description {
          color: var(--text-muted);
          font-size: 1.05rem;
          line-height: 1.7;
          margin-bottom: 32px;
          max-width: 600px;
        }

        .contact-info-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          gap: 16px;
          margin-bottom: 40px;
        }

        .info-item {
          display: flex;
          align-items: center;
          gap: 10px;
          color: var(--text-main);
          font-size: 0.95rem;
        }

        .info-item a:hover {
          color: var(--gold-primary);
        }

        .hero-actions {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
        }

        .hero-visual {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .profile-frame {
          width: 320px;
          height: 320px;
          z-index: 2;
        }

        .decorative-glow {
          position: absolute;
          width: 350px;
          height: 350px;
          border-radius: 50%;
          background: radial-gradient(circle, var(--gold-glow) 0%, transparent 70%);
          z-index: 1;
          filter: blur(10px);
        }

        .scroll-indicator-container {
          position: absolute;
          bottom: 30px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 5;
        }

        .scroll-indicator {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          font-size: 0.8rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: var(--text-muted);
        }

        .scroll-indicator:hover {
          color: var(--gold-primary);
        }

        @media (max-width: 1024px) {
          .hero-grid {
            gap: 40px;
          }
          .hero-title {
            font-size: 2.8rem;
          }
          .hero-subtitle {
            font-size: 1.5rem;
          }
        }

        @media (max-width: 768px) {
          .hero-section {
            padding-top: 90px;
            padding-bottom: 40px;
          }
          .hero-grid {
            grid-template-columns: 1fr;
            text-align: center;
            gap: 28px;
          }
          .hero-content {
            text-align: center;
            order: 2;
          }
          .hero-visual {
            order: 1;
          }
          .profile-frame {
            width: 200px;
            height: 200px;
          }
          .hero-title {
            font-size: 2.2rem;
            letter-spacing: -0.5px;
          }
          .title-suffix {
            font-size: 1.1rem;
            padding: 2px 8px;
            margin-left: 6px;
          }
          .hero-subtitle {
            font-size: 1.2rem;
            margin-bottom: 16px;
          }
          .hero-description {
            font-size: 0.95rem;
            margin-bottom: 24px;
            margin-left: auto;
            margin-right: auto;
          }
          .contact-info-grid {
            grid-template-columns: 1fr;
            gap: 10px;
            justify-items: center;
            margin-bottom: 24px;
          }
          .hero-actions {
            justify-content: center;
            flex-wrap: wrap;
            gap: 12px;
          }
          .scroll-indicator-container {
            display: none;
          }
        }

        @media (max-width: 400px) {
          .hero-title {
            font-size: 1.9rem;
          }
          .hero-subtitle {
            font-size: 1.1rem;
          }
        }
      `}</style>
    </section>
  );
}
