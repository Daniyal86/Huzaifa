import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Briefcase, Award } from 'lucide-react';

export default function Experience() {
  const internships = [
    {
      hospital: 'Shree Sai Baba Hospital and Research Centre, Nashik',
      role: 'Clinical Pharmacologist & Medication Safety Officer Intern',
      period: 'Feb 2025 - Present',
      details: [
        'Engaged in medical administration auditing and clinical protocol reviews.',
        'Assisted in documentation audits to support ongoing NABH accreditation processes.',
        'Participated in ward rounds to audit prescription orders for therapeutic compliance.'
      ]
    },
    {
      hospital: 'HCG Manavata Cancer Centre, Nashik',
      role: 'Clinical Research Coordinator Intern',
      period: 'Nov 2025 - Jan 2026',
      details: [
        'Maintained regulatory study records, source documents, and Case Report Forms (CRFs).',
        'Assisted in patient screening, scheduling, and protocol follow-up visits.',
        'Supported the informed consent documentation and patient counseling processes under supervision.'
      ]
    },
    {
      hospital: 'KIMS Manavata Hospital, Nashik',
      role: 'Clinical Pharmacologist Intern – Pharm.D',
      period: 'July 2025 - Oct 2025',
      details: [
        'Participated in Intensive Care Unit (ICU) rounds covering critical care pharmacotherapy.',
        'Identified and cataloged drug-drug interactions and adverse drug reaction (ADR) profiles.',
        'Performed patient medication reconciliation and contributed to pharmacovigilance logging.'
      ]
    },
    {
      hospital: 'NAMCO Cancer Hospital, Nashik',
      role: 'Clinical Pharmacologist Intern',
      period: 'July 2024 - April 2025',
      details: [
        'Collaborated with oncologists to monitor chemotherapy plans and clinical patient outcomes.',
        'Observed standard safety protocols for sterile chemotherapy compounding and handling.',
        'Assisted in dose adjustments for oncology patients with impaired renal or hepatic metrics.'
      ]
    },
    {
      hospital: 'Sahyadri Hospital, Nashik',
      role: 'Clinical Pharmacologist Intern',
      period: 'March 2024 - May 2024',
      details: [
        'Conducted patient education counseling for chronic illness medication plans.',
        'Supported the clinical pharmacy team in tracking, cataloging, and mitigating medication errors.',
        'Gained exposure to Therapeutic Drug Monitoring (TDM) and IV drug administration rules.'
      ]
    },
    {
      hospital: 'Ashoka Medicover Hospital, Nashik',
      role: 'Clinical Pharmacologist Intern',
      period: 'Dec 2023 - Feb 2024',
      details: [
        'Analyzed patient records for drug-drug interactions and adverse event profiles.',
        'Helped log prescribing anomalies to support clinical quality metrics.',
        'Assisted in hospital-wide medication error auditing and documentation.'
      ]
    },
    {
      hospital: 'Apollo Hospital, Nashik',
      role: 'Clinical Pharmacologist Intern',
      period: 'July 2022 - Nov 2023',
      details: [
        'Participated in clinical rounds to track drug therapeutic indicators.',
        'Assisted in calculating creatinine clearance and auditing hepatic dose limits under guidance.',
        'Contributed to compiling patient medication history charts during admission.'
      ]
    }
  ];

  return (
    <section id="experience" className="section-padding experience-section">
      <div className="container">
        <div className="section-title-wrapper">
          <span className="badge badge-gold">Clinical Rotation History</span>
          <h2 className="section-title">Hospital Experience</h2>
          <div className="title-underline"></div>
        </div>

        <div className="timeline-container">
          <div className="timeline-line"></div>

          {internships.map((intern, idx) => {
            const isEven = idx % 2 === 0;

            // Framer Motion spring-physics alternating animations
            const cardVariants = {
              hidden: { 
                opacity: 0, 
                x: isEven ? 80 : -80, 
                rotate: isEven ? 8 : -8 
              },
              visible: { 
                opacity: 1, 
                x: 0, 
                rotate: 0,
                transition: {
                  type: "spring",
                  stiffness: 65,
                  damping: 14,
                  mass: 0.8,
                  duration: 0.8
                }
              }
            };

            return (
              <div 
                key={idx} 
                className={`timeline-item ${isEven ? 'item-right' : 'item-left'}`}
              >
                <div className="timeline-node">
                  <Briefcase size={16} />
                </div>

                <motion.div 
                  className="timeline-card premium-card"
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-120px" }}
                >
                  <div className="card-header">
                    <span className="card-date">
                      <Calendar size={14} style={{ marginRight: '6px' }} />
                      {intern.period}
                    </span>
                    <h3 className="card-hospital">{intern.hospital}</h3>
                    <h4 className="card-role">{intern.role}</h4>
                  </div>
                  <ul className="card-details-list">
                    {intern.details.map((detail, dIdx) => (
                      <li key={dIdx}>{detail}</li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .experience-section {
          background-image: linear-gradient(180deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
          position: relative;
        }

        .timeline-container {
          position: relative;
          max-width: 1000px;
          margin: 0 auto;
          padding: 40px 0;
        }

        .timeline-line {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 50%;
          width: 2px;
          background-color: var(--border-color);
          transform: translateX(-50%);
          z-index: 1;
        }

        .timeline-item {
          display: flex;
          justify-content: flex-end;
          width: 50%;
          padding: 20px 40px;
          position: relative;
          z-index: 2;
          box-sizing: border-box;
        }

        .timeline-item.item-right {
          align-self: flex-end;
          margin-left: 50%;
          justify-content: flex-start;
        }

        .timeline-item.item-left {
          align-self: flex-start;
          margin-right: 50%;
          justify-content: flex-end;
        }

        /* Timeline flex layout engine */
        .timeline-container {
          display: flex;
          flex-direction: column;
        }

        .timeline-node {
          position: absolute;
          top: 30px;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background-color: var(--bg-secondary);
          border: 2px solid var(--gold-primary);
          box-shadow: 0 0 10px var(--gold-glow);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 5;
          color: var(--gold-primary);
        }

        .item-right .timeline-node {
          left: -18px;
        }

        .item-left .timeline-node {
          right: -18px;
        }

        .timeline-card {
          width: 100%;
          max-width: 440px;
          padding: 30px;
          text-align: left;
          background-color: var(--bg-secondary);
        }

        .card-header {
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 16px;
          margin-bottom: 16px;
        }

        .card-date {
          display: inline-flex;
          align-items: center;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--gold-primary);
          background-color: var(--gold-glow);
          padding: 4px 12px;
          border-radius: 50px;
          margin-bottom: 10px;
          border: 1px solid var(--gold-border);
        }

        .card-hospital {
          font-size: 1.25rem;
          font-weight: 700;
          line-height: 1.3;
          margin-bottom: 6px;
          color: var(--text-main);
        }

        .card-role {
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--text-muted);
        }

        .card-details-list {
          list-style: none;
        }

        .card-details-list li {
          font-size: 0.9rem;
          color: var(--text-muted);
          position: relative;
          padding-left: 18px;
          margin-bottom: 10px;
          line-height: 1.5;
        }

        .card-details-list li:last-child {
          margin-bottom: 0;
        }

        .card-details-list li::before {
          content: '•';
          color: var(--gold-primary);
          font-weight: bold;
          font-size: 1.2rem;
          position: absolute;
          left: 0;
          top: -2px;
        }

        @media (max-width: 900px) {
          .timeline-line {
            left: 20px;
          }

          .timeline-item {
            width: 100%;
            padding: 16px 16px 16px 52px;
            justify-content: flex-start;
          }

          .timeline-item.item-right {
            margin-left: 0;
          }

          .timeline-item.item-left {
            margin-right: 0;
            align-self: flex-end;
          }

          .item-right .timeline-node,
          .item-left .timeline-node {
            left: 2px;
            right: auto;
            width: 32px;
            height: 32px;
          }

          .timeline-card {
            max-width: 100%;
            padding: 20px 16px;
          }

          .card-hospital {
            font-size: 1.05rem;
          }

          .card-role {
            font-size: 0.88rem;
          }

          .card-details-list li {
            font-size: 0.85rem;
          }

          .card-date {
            font-size: 0.8rem;
            padding: 3px 10px;
          }
        }
      `}</style>
    </section>
  );
}
