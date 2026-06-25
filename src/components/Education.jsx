import React from 'react';
import { motion } from 'framer-motion';
import { Award, BookOpen, GraduationCap, Calendar } from 'lucide-react';

export default function Education() {
  const educationList = [
    {
      degree: 'Doctor of Pharmacy (Pharm.D.)',
      institution: 'MET’s Institute of Pharmacy, Adgaon, Nashik',
      university: 'Pune University',
      year: 'Graduation Year: 2026',
      score: 'Academic Score: 73.20%',
      icon: <GraduationCap size={22} />
    },
    {
      degree: 'Higher Secondary Certificate (HSC)',
      institution: 'Yews National High School for Boys and Jr College, Nashik',
      university: 'Maharashtra State Board',
      year: 'Year: 2020',
      score: 'Score: 62.00%',
      icon: <BookOpen size={20} />
    },
    {
      degree: 'Secondary School Certificate (SSC)',
      institution: 'Yews National High School for Boys, Nashik',
      university: 'Maharashtra State Board',
      year: 'Year: 2018',
      score: 'Score: 76.70%',
      icon: <Award size={20} />
    }
  ];

  return (
    <section id="education" className="section-padding education-section">
      <div className="container">
        <div className="section-title-wrapper">
          <span className="badge badge-gold">Academic Credentials</span>
          <h2 className="section-title">Education &amp; Academic Project</h2>
          <div className="title-underline"></div>
        </div>

        <div className="education-grid">
          {/* Education Timeline */}
          <div className="education-list">
            {educationList.map((edu, idx) => (
              <motion.div
                key={idx}
                className="education-card premium-card"
                initial={{ opacity: 0, x: -30, rotate: -2 }}
                whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ type: "spring", stiffness: 70, damping: 14, delay: idx * 0.1 }}
              >
                <div className="edu-icon-box">
                  {edu.icon}
                </div>
                <div className="edu-details">
                  <span className="edu-year">
                    <Calendar size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
                    {edu.year}
                  </span>
                  <h3 className="edu-degree">{edu.degree}</h3>
                  <h4 className="edu-institution">{edu.institution}</h4>
                  <p className="edu-sub">{edu.university} • <strong>{edu.score}</strong></p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Academic Graduation Project */}
          <motion.div
            className="project-card-container"
            initial={{ opacity: 0, x: 30, rotate: 2 }}
            whileInView={{ opacity: 1, x: 0, rotate: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: "spring", stiffness: 60, damping: 12 }}
          >
            <div className="project-card premium-card">
              <div className="project-header">
                <span className="badge badge-gold">Graduation Project / Thesis</span>
                <h3 className="project-title">Clinical Study &amp; Thesis</h3>
              </div>
              <div className="project-body">
                <p className="project-description-label">Topic of Investigation:</p>
                <blockquote className="project-topic">
                  “To Estimate The Performance Of The HAS-BLED Score &amp; DOAC Score In Cardiovascular Patients In A Tertiary Care Hospital”
                </blockquote>
                <div className="project-highlights">
                  <div className="highlight-point">
                    <div className="point-dot"></div>
                    <p>Evaluated bleeding risk predictions in patients undergoing therapy with Direct Oral Anticoagulants (DOACs).</p>
                  </div>
                  <div className="highlight-point">
                    <div className="point-dot"></div>
                    <p>Correlated real-world patient profiles with standard HAS-BLED clinical metrics for patient safety optimization.</p>
                  </div>
                  <div className="highlight-point">
                    <div className="point-dot"></div>
                    <p>Conducted statistical analyses to assess predictability, dosing limits, and bleeding incidents in critical care.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        .education-section {
          background-color: var(--bg-primary);
          position: relative;
        }

        .education-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          align-items: stretch;
        }

        .education-list {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .education-card {
          display: flex;
          gap: 20px;
          padding: 24px;
          background-color: var(--bg-secondary);
          align-items: flex-start;
        }

        .edu-icon-box {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background-color: var(--gold-glow);
          border: 1px solid var(--gold-border);
          color: var(--gold-primary);
          flex-shrink: 0;
        }

        .edu-details {
          text-align: left;
        }

        .edu-year {
          display: inline-flex;
          align-items: center;
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--gold-primary);
          background-color: var(--gold-glow);
          padding: 2px 10px;
          border-radius: 50px;
          margin-bottom: 8px;
          border: 1px solid var(--gold-border);
        }

        .edu-degree {
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: 4px;
          color: var(--text-main);
        }

        .edu-institution {
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--text-muted);
          margin-bottom: 4px;
        }

        .edu-sub {
          font-size: 0.85rem;
          color: var(--text-muted);
        }

        .project-card-container {
          height: 100%;
        }

        .project-card {
          padding: 40px;
          height: 100%;
          background-color: var(--bg-secondary);
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          text-align: left;
          border-left: 4px solid var(--gold-primary);
        }

        .project-title {
          font-size: 1.6rem;
          font-weight: 800;
          margin-top: 10px;
          margin-bottom: 24px;
          color: var(--text-main);
        }

        .project-description-label {
          font-size: 0.85rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: var(--gold-primary);
          margin-bottom: 8px;
        }

        .project-topic {
          font-family: var(--font-heading);
          font-size: 1.3rem;
          font-style: italic;
          line-height: 1.5;
          color: var(--text-main);
          margin-bottom: 24px;
          padding-left: 15px;
          border-left: 2px solid var(--border-color);
        }

        .project-highlights {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .highlight-point {
          display: flex;
          gap: 12px;
          align-items: flex-start;
        }

        .point-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: var(--gold-primary);
          margin-top: 8px;
          flex-shrink: 0;
        }

        .highlight-point p {
          font-size: 0.95rem;
          color: var(--text-muted);
          line-height: 1.5;
        }

        @media (max-width: 991px) {
          .education-grid {
            grid-template-columns: 1fr;
            gap: 30px;
          }
        }

        @media (max-width: 576px) {
          .education-card {
            flex-direction: column;
            gap: 16px;
          }
          .project-card {
            padding: 24px;
          }
          .project-topic {
            font-size: 1.15rem;
          }
        }
      `}</style>
    </section>
  );
}
