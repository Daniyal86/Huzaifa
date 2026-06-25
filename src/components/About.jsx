import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Award, FileText, CheckCircle2 } from 'lucide-react';

export default function About() {
  const stats = [
    { label: 'Hospital Rotations', value: '7' },
    { label: 'Specialty Courses', value: '9+' },
    { label: 'Clinical Skills', value: '12+' },
    { label: 'Academic Score', value: '73%' }
  ];

  const highlights = [
    'Exposure to NABH hospital safety standards and quality audit workflows.',
    'ICU clinical rounds covering advanced critical care pharmacotherapy.',
    'Formulation and active tracking of Adverse Drug Reactions (ADR) reports.',
    'Therapeutic drug monitoring (TDM) and dose customization processes.',
    'Patient counseling and bedside medication reconciliation services.',
    'Assessment of bleeding indices (HAS-BLED) and renal dosing equations.'
  ];

  return (
    <section id="about" className="section-padding about-section">
      <div className="container">
        <div className="section-title-wrapper">
          <span className="badge badge-gold">Professional Profile</span>
          <h2 className="section-title">About Me</h2>
          <div className="title-underline"></div>
        </div>

        <div className="about-grid">
          <motion.div 
            className="about-info-block"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="block-subtitle">Clinical Focus &amp; Goals</h3>
            <p className="block-text">
              I am a Doctor of Pharmacy (Pharm.D.) graduate with comprehensive clinical exposure spanning multiple corporate and tertiary care hospitals. My training has provided me with deep practical insights into clinical pharmacy practice, patient safety monitoring, and drug therapy optimization.
            </p>
            <p className="block-text">
              I am passionate about bridging the gap between medicine prescribing and optimal patient outcomes. My active internship experience across oncology, critical care, and cardiovascular clinical setups has equipped me with the skills to audit drug orders, prevent adverse interactions, and align care protocols with global safety standards.
            </p>

            <div className="highlights-grid">
              {highlights.map((item, idx) => (
                <div key={idx} className="highlight-item">
                  <CheckCircle2 size={18} className="gold-icon flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            className="about-stats-block"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="stats-inner-grid">
              {stats.map((stat, idx) => (
                <div key={idx} className="stat-card premium-card">
                  <span className="stat-value text-gold-gradient">{stat.value}</span>
                  <span className="stat-label">{stat.label}</span>
                </div>
              ))}
            </div>

            <div className="quote-box premium-card">
              <span className="quote-symbol">“</span>
              <p className="quote-text">
                Medication safety is not just a protocol; it is the cornerstone of clinical trust and patient recovery.
              </p>
              <span className="quote-author">- Dr. Shaikh Huzaifa, Pharm.D</span>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        .about-section {
          background-color: var(--bg-secondary);
          border-top: 1px solid var(--border-color);
          border-bottom: 1px solid var(--border-color);
        }

        .section-title-wrapper {
          text-align: center;
          margin-bottom: 60px;
        }

        .section-title {
          font-size: 2.5rem;
          margin-top: 10px;
          margin-bottom: 12px;
        }

        .title-underline {
          width: 60px;
          height: 3px;
          background-color: var(--gold-primary);
          margin: 0 auto;
          border-radius: 5px;
        }

        .about-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 60px;
          align-items: flex-start;
        }

        .about-info-block {
          text-align: left;
        }

        .block-subtitle {
          font-size: 1.7rem;
          margin-bottom: 20px;
          font-weight: 700;
        }

        .block-text {
          color: var(--text-muted);
          font-size: 1.05rem;
          line-height: 1.7;
          margin-bottom: 20px;
        }

        .highlights-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 14px;
          margin-top: 30px;
        }

        .highlight-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          color: var(--text-main);
          font-size: 0.95rem;
          line-height: 1.4;
        }

        .stats-inner-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
          margin-bottom: 30px;
        }

        .stat-card {
          padding: 30px 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
        }

        .stat-value {
          font-size: 2.5rem;
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 6px;
        }

        .stat-label {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .quote-box {
          padding: 30px;
          position: relative;
          text-align: center;
          background: linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-primary) 100%);
          border-left: 4px solid var(--gold-primary);
        }

        .quote-symbol {
          font-family: var(--font-heading);
          font-size: 4rem;
          line-height: 0.1;
          color: var(--gold-border);
          position: absolute;
          top: 30px;
          left: 20px;
        }

        .quote-text {
          font-family: var(--font-heading);
          font-size: 1.2rem;
          font-style: italic;
          color: var(--text-main);
          margin-bottom: 12px;
          line-height: 1.5;
          position: relative;
          z-index: 2;
        }

        .quote-author {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--gold-dark);
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        @media (max-width: 1024px) {
          .about-grid {
            gap: 40px;
          }
        }

        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr;
            gap: 50px;
          }
        }
      `}</style>
    </section>
  );
}
