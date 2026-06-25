import React from 'react';
import { motion } from 'framer-motion';
import { Award, Compass, Heart, Globe, BookOpen } from 'lucide-react';

export default function ExtraCurriculars() {
  const activities = [
    {
      title: 'Elderly Care Outreach',
      desc: 'Engaged in social outreach visits to the Old Age Home in Kathe Galli, Nashik.',
      icon: <Heart size={20} className="activity-icon-pink" />
    },
    {
      title: 'Orphanage Diwali Initiative',
      desc: 'Contributed to the Diwali gift initiative for the orphanage in Trimbakeshwar, Nashik.',
      icon: <Heart size={20} className="activity-icon-pink" />
    },
    {
      title: 'Poster Presentation',
      desc: 'Presented a clinical poster at the prestigious Tata Memorial Center in Mumbai.',
      icon: <Award size={20} className="activity-icon-gold" />
    },
    {
      title: 'Conference Participation',
      desc: 'Active delegate in various National and International pharmaceutical and clinical trials conferences.',
      icon: <Compass size={20} className="activity-icon-blue" />
    }
  ];

  const courses = [
    'Medical Devices - Regulatory Pathways',
    'Applied Prophetic Medicine Course',
    'ICH-GCP : Good Clinical Practice',
    'Brief Psychodynamic Psychotherapy - Intermediate Certificate',
    'Introduction To Professional Scientific Communication',
    'Current Regulatory Requirement for Conducting Clinical Trials in India for IND/NDA',
    'History and Principles of ICH GCP : Good Clinical Practice',
    'Good Clinical Practices by NIDA Clinical Trials Network',
    'Introduction to Good Manufacturing Practices (GMP)'
  ];

  const languages = ['English', 'Hindi', 'Urdu', 'Marathi'];

  return (
    <section id="education-extra" className="section-padding extracurriculars-section">
      <div className="container">
        <div className="section-title-wrapper">
          <span className="badge badge-gold">Beyond Pharmacy Practice</span>
          <h2 className="section-title">Certifications &amp; Outreach</h2>
          <div className="title-underline"></div>
        </div>

        <div className="extras-grid">
          {/* Left Side: Outreach & Languages */}
          <div className="extras-left-column">
            <motion.div
              className="extras-block premium-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="block-title">Social Outreach &amp; Engagements</h3>
              <div className="activities-list">
                {activities.map((act, idx) => (
                  <div key={idx} className="activity-item">
                    <div className="activity-icon-wrapper">
                      {act.icon}
                    </div>
                    <div className="activity-content">
                      <h4 className="activity-item-title">{act.title}</h4>
                      <p className="activity-item-desc">{act.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Languages Block */}
            <motion.div
              className="extras-block premium-card language-block"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h3 className="block-title">
                <Globe size={18} style={{ marginRight: '8px', verticalAlign: 'middle', color: 'var(--gold-primary)' }} />
                Language Proficiencies
              </h3>
              <div className="language-pills">
                {languages.map((lang, idx) => (
                  <span key={idx} className="badge badge-gold language-pill">
                    {lang}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Side: Courses & Certifications */}
          <motion.div
            className="extras-right-column premium-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="block-title">
              <BookOpen size={18} style={{ marginRight: '8px', verticalAlign: 'middle', color: 'var(--gold-primary)' }} />
              Professional Certifications
            </h3>
            <p className="block-subtitle">Specialized training programs completed during Pharm.D:</p>
            <div className="courses-grid">
              {courses.map((course, idx) => (
                <motion.div
                  key={idx}
                  className="course-card"
                  whileHover={{ x: 5 }}
                  transition={{ type: "tween", duration: 0.2 }}
                >
                  <div className="course-bullet">
                    <Award size={16} />
                  </div>
                  <span className="course-name">{course}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        .extracurriculars-section {
          background-color: var(--bg-secondary);
          border-top: 1px solid var(--border-color);
          border-bottom: 1px solid var(--border-color);
        }

        .extras-grid {
          display: grid;
          grid-template-columns: 1fr 1.1fr;
          gap: 40px;
          align-items: start;
        }

        .extras-left-column {
          display: flex;
          flex-direction: column;
          gap: 30px;
        }

        .extras-block {
          padding: 35px;
          text-align: left;
          background-color: var(--bg-secondary);
        }

        .block-title {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 24px;
          color: var(--text-main);
        }

        .block-subtitle {
          font-size: 0.95rem;
          color: var(--text-muted);
          margin-bottom: 20px;
          text-align: left;
        }

        .activities-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .activity-item {
          display: flex;
          gap: 16px;
          align-items: flex-start;
        }

        .activity-icon-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background-color: var(--bg-primary);
          border: 1px solid var(--border-color);
          flex-shrink: 0;
        }

        .activity-icon-pink {
          color: #ec4899;
        }

        .activity-icon-gold {
          color: var(--gold-primary);
        }

        .activity-icon-blue {
          color: #3b82f6;
        }

        .activity-content {
          text-align: left;
        }

        .activity-item-title {
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--text-main);
          margin-bottom: 4px;
        }

        .activity-item-desc {
          font-size: 0.9rem;
          color: var(--text-muted);
          line-height: 1.4;
        }

        .language-block {
          padding: 30px 35px;
        }

        .language-pills {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .language-pill {
          font-size: 0.9rem;
          padding: 6px 16px;
        }

        .extras-right-column {
          padding: 35px;
          background-color: var(--bg-secondary);
        }

        .courses-grid {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .course-card {
          display: flex;
          gap: 14px;
          align-items: flex-start;
          text-align: left;
          padding: 12px 16px;
          border-radius: var(--radius-sm);
          background-color: var(--bg-primary);
          border: 1px solid var(--border-color);
        }

        .course-bullet {
          color: var(--gold-primary);
          margin-top: 2px;
          flex-shrink: 0;
        }

        .course-name {
          font-size: 0.92rem;
          font-weight: 600;
          color: var(--text-main);
          line-height: 1.4;
        }

        @media (max-width: 991px) {
          .extras-grid {
            grid-template-columns: 1fr;
            gap: 30px;
          }
        }

        @media (max-width: 576px) {
          .extras-block {
            padding: 24px;
          }
          .extras-right-column {
            padding: 24px;
          }
        }
      `}</style>
    </section>
  );
}
