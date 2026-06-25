import React from 'react';
import { Shield, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-left">
          <div className="footer-logo">
            <Shield size={18} className="gold-icon" />
            <span className="footer-brand">Dr. S. Huzaifa <span className="footer-brand-sub">Pharm.D</span></span>
          </div>
          <p className="footer-creds">Clinical Pharmacologist &amp; Medication Safety Officer</p>
        </div>

        <div className="footer-right">
          <p className="footer-copy">
            &copy; {new Date().getFullYear()} Dr. Shaikh Huzaifa. All Rights Reserved.
          </p>
          <button onClick={scrollToTop} className="back-to-top-btn" aria-label="Back to top">
            <ArrowUp size={16} />
          </button>
        </div>
      </div>

      <style>{`
        .footer {
          background-color: #0A0A0A;
          color: #F8FAFC;
          padding: 30px 0;
          border-top: 1px solid #1F1F1F;
        }

        .footer-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 20px;
        }

        .footer-left {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
        }

        .footer-logo {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 4px;
        }

        .footer-brand {
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 1.1rem;
        }

        .footer-brand-sub {
          font-size: 0.7rem;
          color: var(--gold-primary);
          border: 1px solid var(--gold-border);
          padding: 1px 4px;
          border-radius: 4px;
          margin-left: 4px;
        }

        .footer-creds {
          font-size: 0.8rem;
          color: #94A3B8;
        }

        .footer-right {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .footer-copy {
          font-size: 0.8rem;
          color: #94A3B8;
        }

        .back-to-top-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background-color: #1F1F1F;
          border: 1px solid #333333;
          color: #94A3B8;
          cursor: pointer;
          transition: var(--transition-smooth);
        }

        .back-to-top-btn:hover {
          background-color: var(--gold-primary);
          color: #FFFFFF;
          border-color: var(--gold-primary);
          transform: translateY(-2px);
        }

        @media (max-width: 576px) {
          .footer-container {
            flex-direction: column;
            align-items: center;
            text-align: center;
          }
          .footer-left {
            align-items: center;
            text-align: center;
          }
          .footer-right {
            flex-direction: column;
            gap: 10px;
          }
        }
      `}</style>
    </footer>
  );
}
