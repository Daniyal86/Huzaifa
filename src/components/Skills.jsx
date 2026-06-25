import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Stethoscope, Library, MonitorCheck, Settings } from 'lucide-react';

export default function Skills() {
  const categories = [
    {
      id: 'clinical',
      title: 'Clinical Practice',
      icon: <Stethoscope size={20} />,
      skills: [
        'Prescription Auditing',
        'Clinical Medication Review',
        'ADR Monitoring & Reporting',
        'Patient Medication Counseling',
        'Pharmacovigilance Practices',
        'Dose Calibration Audit',
        'Critical Care Pharmacotherapy'
      ]
    },
    {
      id: 'research',
      title: 'Clinical Databases & Tools',
      icon: <Library size={20} />,
      skills: [
        'UpToDate Clinical Database',
        'Micromedex',
        'Lexicomp Drug Reference',
        'Medscape Clinical Reference',
        'India Drug Index'
      ]
    },
    {
      id: 'technology',
      title: 'Medical IT & Systems',
      icon: <MonitorCheck size={20} />,
      skills: [
        'Electronic Medical Records (EMR)',
        'Hospital Information Systems (HIS)',
        'MS Excel Data Tracking',
        'Clinical Quality Documentation'
      ]
    },
    {
      id: 'soft',
      title: 'Core Competencies',
      icon: <Settings size={20} />,
      skills: [
        'Interdisciplinary Collaboration',
        'Clinical Problem Solving',
        'Patient Health Literacy Counseling',
        'NABH Audit Compliance Preparation'
      ]
    }
  ];

  const [activeTab, setActiveTab] = useState('clinical');

  return (
    <section id="skills" className="section-padding skills-section">
      <div className="container">
        <div className="section-title-wrapper">
          <span className="badge badge-gold">Clinical Competencies</span>
          <h2 className="section-title">Core Skills</h2>
          <div className="title-underline"></div>
        </div>

        <div className="skills-layout">
          {/* Navigation Sidebar/Tabs */}
          <div className="skills-tabs">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`tab-btn premium-card ${activeTab === cat.id ? 'active' : ''}`}
              >
                <div className={`tab-icon-box ${activeTab === cat.id ? 'active' : ''}`}>
                  {cat.icon}
                </div>
                <span className="tab-title-text">{cat.title}</span>
              </button>
            ))}
          </div>

          {/* Active Skills Grid */}
          <div className="skills-display">
            {categories.map((cat) => {
              if (cat.id !== activeTab) return null;

              return (
                <motion.div
                  key={cat.id}
                  className="skills-grid"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  {cat.skills.map((skill, idx) => (
                    <motion.div
                      key={idx}
                      className="skill-card premium-card"
                      whileHover={{ scale: 1.03, y: -2 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="skill-card-inner">
                        <div className="gold-dot"></div>
                        <span className="skill-name">{skill}</span>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        .skills-section {
          background-color: var(--bg-primary);
        }

        .skills-layout {
          display: grid;
          grid-template-columns: 0.8fr 1.2fr;
          gap: 40px;
          align-items: flex-start;
          max-width: 1000px;
          margin: 0 auto;
        }

        .skills-tabs {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .tab-btn {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 18px 24px;
          cursor: pointer;
          border-radius: var(--radius-sm);
          text-align: left;
          background-color: var(--bg-secondary);
        }

        .tab-btn:hover {
          transform: none;
        }

        .tab-btn.active {
          border-color: var(--gold-primary);
          box-shadow: var(--shadow-sm), 0 0 10px var(--gold-glow);
        }

        .tab-icon-box {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 8px;
          background-color: var(--bg-primary);
          color: var(--text-muted);
          transition: var(--transition-smooth);
        }

        .tab-icon-box.active {
          background-color: var(--gold-glow);
          color: var(--gold-primary);
          border: 1px solid var(--gold-border);
        }

        .tab-title-text {
          font-size: 1rem;
          font-weight: 700;
          color: var(--text-main);
        }

        .skills-display {
          min-height: 250px;
        }

        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 16px;
        }

        .skill-card {
          padding: 20px;
          background-color: var(--bg-secondary);
          display: flex;
          align-items: center;
          height: 100%;
        }

        .skill-card-inner {
          display: flex;
          align-items: center;
          gap: 12px;
          text-align: left;
        }

        .gold-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: var(--gold-primary);
          box-shadow: 0 0 6px var(--gold-primary);
          flex-shrink: 0;
        }

        .skill-name {
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--text-main);
          line-height: 1.4;
        }

        @media (max-width: 768px) {
          .skills-layout {
            grid-template-columns: 1fr;
            gap: 30px;
          }
          .skills-tabs {
            flex-direction: row;
            overflow-x: auto;
            padding-bottom: 10px;
          }
          .tab-btn {
            padding: 12px 18px;
            flex-shrink: 0;
          }
          .tab-title-text {
            font-size: 0.9rem;
          }
        }
      `}</style>
    </section>
  );
}
