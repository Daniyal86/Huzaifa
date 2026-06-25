import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, ShieldAlert, Award, RefreshCw } from 'lucide-react';

export default function Calculators() {
  const [activeCalc, setActiveCalc] = useState('hasbled');

  // HAS-BLED State
  const [hasbledInputs, setHasbledInputs] = useState({
    hypertension: false,
    abnormalRenal: false,
    abnormalLiver: false,
    stroke: false,
    bleeding: false,
    labileInr: false,
    elderly: false,
    drugs: false,
    alcohol: false
  });

  // Cockcroft-Gault State
  const [cgInputs, setCgInputs] = useState({
    age: '',
    weight: '',
    creatinine: '',
    gender: 'male'
  });

  // HAS-BLED Calculations
  const calculateHasBled = () => {
    let score = 0;
    if (hasbledInputs.hypertension) score += 1;
    if (hasbledInputs.abnormalRenal) score += 1;
    if (hasbledInputs.abnormalLiver) score += 1;
    if (hasbledInputs.stroke) score += 1;
    if (hasbledInputs.bleeding) score += 1;
    if (hasbledInputs.labileInr) score += 1;
    if (hasbledInputs.elderly) score += 1;
    if (hasbledInputs.drugs) score += 1;
    if (hasbledInputs.alcohol) score += 1;
    
    let risk = '';
    let bleedRate = '';
    if (score === 0) { risk = 'Low'; bleedRate = '1.13%'; }
    else if (score === 1) { risk = 'Low'; bleedRate = '1.02%'; }
    else if (score === 2) { risk = 'Moderate'; bleedRate = '1.88%'; }
    else if (score === 3) { risk = 'High'; bleedRate = '3.74%'; }
    else if (score === 4) { risk = 'High'; bleedRate = '8.70%'; }
    else if (score === 5) { risk = 'High'; bleedRate = '12.50%'; }
    else { risk = 'High'; bleedRate = '>12.50%'; }

    return { score, risk, bleedRate };
  };

  const hasbledResult = calculateHasBled();

  const handleHasbledCheckbox = (key) => {
    setHasbledInputs(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const resetHasbled = () => {
    setHasbledInputs({
      hypertension: false,
      abnormalRenal: false,
      abnormalLiver: false,
      stroke: false,
      bleeding: false,
      labileInr: false,
      elderly: false,
      drugs: false,
      alcohol: false
    });
  };

  // Cockcroft-Gault Calculations
  const calculateCg = () => {
    const { age, weight, creatinine, gender } = cgInputs;
    if (!age || !weight || !creatinine) return null;

    const ageNum = parseFloat(age);
    const weightNum = parseFloat(weight);
    const creatinineNum = parseFloat(creatinine);

    if (isNaN(ageNum) || isNaN(weightNum) || isNaN(creatinineNum) || creatinineNum <= 0) return null;

    let crCl = ((140 - ageNum) * weightNum) / (72 * creatinineNum);
    if (gender === 'female') {
      crCl *= 0.85;
    }

    let interpretation = '';
    let statusClass = '';
    if (crCl >= 90) {
      interpretation = 'Normal Renal Function';
      statusClass = 'success';
    } else if (crCl >= 60) {
      interpretation = 'Mild Renal Impairment';
      statusClass = 'warning';
    } else if (crCl >= 30) {
      interpretation = 'Moderate Renal Impairment';
      statusClass = 'danger';
    } else if (crCl >= 15) {
      interpretation = 'Severe Renal Impairment';
      statusClass = 'danger';
    } else {
      interpretation = 'Kidney Failure (ESRD)';
      statusClass = 'danger';
    }

    return { crCl: crCl.toFixed(1), interpretation, statusClass };
  };

  const cgResult = calculateCg();

  const handleCgChange = (e) => {
    const { name, value } = e.target;
    setCgInputs(prev => ({ ...prev, [name]: value }));
  };

  const resetCg = () => {
    setCgInputs({
      age: '',
      weight: '',
      creatinine: '',
      gender: 'male'
    });
  };

  return (
    <section id="calculators" className="section-padding calculators-section">
      <div className="container">
        <div className="section-title-wrapper">
          <span className="badge badge-gold">Clinical Decision Support</span>
          <h2 className="section-title">Clinical Calculators</h2>
          <div className="title-underline"></div>
        </div>

        {/* 3D Flip perspective container */}
        <div className="perspective-container">
          <motion.div 
            className="calculators-container premium-card"
            initial={{ rotateX: -15, opacity: 0, scale: 0.95 }}
            whileInView={{ rotateX: 0, opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: "spring", stiffness: 50, damping: 12, duration: 0.8 }}
          >
            {/* Calculator Navigation tabs */}
            <div className="calc-tabs">
              <button 
                onClick={() => setActiveCalc('hasbled')}
                className={`calc-tab-btn ${activeCalc === 'hasbled' ? 'active' : ''}`}
              >
                <ShieldAlert size={18} />
                <span>HAS-BLED Bleeding Risk</span>
              </button>
              <button 
                onClick={() => setActiveCalc('cockcroft')}
                className={`calc-tab-btn ${activeCalc === 'cockcroft' ? 'active' : ''}`}
              >
                <Activity size={18} />
                <span>Cockcroft-Gault (CrCl)</span>
              </button>
            </div>

            {/* HAS-BLED Interface */}
            {activeCalc === 'hasbled' && (
              <div className="calc-body">
                <div className="calc-form-side">
                  <h3 className="calc-title">HAS-BLED Bleeding Score</h3>
                  <p className="calc-desc">
                    Assesses the 1-year risk of major bleeding in atrial fibrillation patients on oral anticoagulation.
                  </p>

                  <div className="hasbled-grid">
                    <label className="checkbox-label">
                      <input 
                        type="checkbox" 
                        checked={hasbledInputs.hypertension}
                        onChange={() => handleHasbledCheckbox('hypertension')}
                      />
                      <span><strong>H</strong> - Hypertension (Systolic BP &gt;160 mmHg)</span>
                    </label>
                    
                    <label className="checkbox-label">
                      <input 
                        type="checkbox" 
                        checked={hasbledInputs.abnormalRenal}
                        onChange={() => handleHasbledCheckbox('abnormalRenal')}
                      />
                      <span><strong>A</strong> - Abnormal Renal Function (Dialysis, Cr &gt;2.26 mg/dL)</span>
                    </label>

                    <label className="checkbox-label">
                      <input 
                        type="checkbox" 
                        checked={hasbledInputs.abnormalLiver}
                        onChange={() => handleHasbledCheckbox('abnormalLiver')}
                      />
                      <span><strong>A</strong> - Abnormal Liver Function (Cirrhosis, AST/ALT &gt;3x)</span>
                    </label>

                    <label className="checkbox-label">
                      <input 
                        type="checkbox" 
                        checked={hasbledInputs.stroke}
                        onChange={() => handleHasbledCheckbox('stroke')}
                      />
                      <span><strong>S</strong> - Stroke History</span>
                    </label>

                    <label className="checkbox-label">
                      <input 
                        type="checkbox" 
                        checked={hasbledInputs.bleeding}
                        onChange={() => handleHasbledCheckbox('bleeding')}
                      />
                      <span><strong>B</strong> - Prior Bleeding History or Predisposition</span>
                    </label>

                    <label className="checkbox-label">
                      <input 
                        type="checkbox" 
                        checked={hasbledInputs.labileInr}
                        onChange={() => handleHasbledCheckbox('labileInr')}
                      />
                      <span><strong>L</strong> - Labile INRs (Unstable, target time in range &lt;60%)</span>
                    </label>

                    <label className="checkbox-label">
                      <input 
                        type="checkbox" 
                        checked={hasbledInputs.elderly}
                        onChange={() => handleHasbledCheckbox('elderly')}
                      />
                      <span><strong>E</strong> - Elderly (Age &gt; 65 years)</span>
                    </label>

                    <label className="checkbox-label">
                      <input 
                        type="checkbox" 
                        checked={hasbledInputs.drugs}
                        onChange={() => handleHasbledCheckbox('drugs')}
                      />
                      <span><strong>D</strong> - Drugs (Antiplatelet agents, NSAIDs)</span>
                    </label>

                    <label className="checkbox-label">
                      <input 
                        type="checkbox" 
                        checked={hasbledInputs.alcohol}
                        onChange={() => handleHasbledCheckbox('alcohol')}
                      />
                      <span><strong>D</strong> - Alcohol Excess (&ge;8 drinks/week)</span>
                    </label>
                  </div>

                  <button onClick={resetHasbled} className="btn-reset">
                    <RefreshCw size={14} />
                    Reset Calculator
                  </button>
                </div>

                <div className="calc-result-side">
                  <div className="result-card">
                    <span className="result-label">HAS-BLED Score</span>
                    <span className="result-value text-gold-gradient">{hasbledResult.score}</span>
                    <div className="risk-indicator">
                      <span>Clinical Bleeding Risk:</span>
                      <span className={`risk-badge risk-${hasbledResult.risk.toLowerCase()}`}>
                        {hasbledResult.risk} Risk
                      </span>
                    </div>
                    <div className="stats-box">
                      <span className="stats-number">{hasbledResult.bleedRate}</span>
                      <span className="stats-text">Est. Major Bleeds / 100 Patient-Years</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Cockcroft-Gault Interface */}
            {activeCalc === 'cockcroft' && (
              <div className="calc-body">
                <div className="calc-form-side">
                  <h3 className="calc-title">Cockcroft-Gault Equation</h3>
                  <p className="calc-desc">
                    Estimates creatinine clearance (CrCl) for patient drug dose adjustments.
                  </p>

                  <div className="cg-inputs-grid">
                    <div className="input-group">
                      <label>Age (years)</label>
                      <input 
                        type="number" 
                        name="age"
                        value={cgInputs.age}
                        onChange={handleCgChange}
                        placeholder="e.g., 65"
                      />
                    </div>
                    <div className="input-group">
                      <label>Actual Body Weight (kg)</label>
                      <input 
                        type="number" 
                        name="weight"
                        value={cgInputs.weight}
                        onChange={handleCgChange}
                        placeholder="e.g., 70"
                      />
                    </div>
                    <div className="input-group">
                      <label>Serum Creatinine (mg/dL)</label>
                      <input 
                        type="number" 
                        step="0.01"
                        name="creatinine"
                        value={cgInputs.creatinine}
                        onChange={handleCgChange}
                        placeholder="e.g., 1.0"
                      />
                    </div>
                    <div className="input-group">
                      <label>Patient Gender</label>
                      <div className="gender-radio-group">
                        <label className="radio-label">
                          <input 
                            type="radio" 
                            name="gender" 
                            value="male"
                            checked={cgInputs.gender === 'male'}
                            onChange={handleCgChange}
                          />
                          <span>Male</span>
                        </label>
                        <label className="radio-label">
                          <input 
                            type="radio" 
                            name="gender" 
                            value="female"
                            checked={cgInputs.gender === 'female'}
                            onChange={handleCgChange}
                          />
                          <span>Female</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <button onClick={resetCg} className="btn-reset">
                    <RefreshCw size={14} />
                    Reset Calculator
                  </button>
                </div>

                <div className="calc-result-side">
                  {cgResult ? (
                    <div className="result-card">
                      <span className="result-label">Estimated CrCl</span>
                      <span className="result-value text-gold-gradient">{cgResult.crCl}</span>
                      <span className="result-unit">mL/min</span>
                      <div className="risk-indicator">
                        <span>Renal Status:</span>
                        <span className={`risk-badge risk-${cgResult.statusClass}`}>
                          {cgResult.interpretation}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="result-card empty-result">
                      <Activity size={40} className="pulse-icon" />
                      <p>Enter age, weight, and serum creatinine parameters to view drug clearance estimation.</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      <style>{`
        .calculators-section {
          background-color: var(--bg-secondary);
          border-top: 1px solid var(--border-color);
          border-bottom: 1px solid var(--border-color);
        }

        .calculators-container {
          max-width: 900px;
          margin: 0 auto;
          box-shadow: var(--shadow-md);
        }

        .calc-tabs {
          display: flex;
          background-color: var(--bg-primary);
          border-bottom: 1px solid var(--border-color);
        }

        .calc-tab-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 20px;
          border: none;
          background: none;
          font-weight: 700;
          color: var(--text-muted);
          cursor: pointer;
          transition: var(--transition-smooth);
        }

        .calc-tab-btn:hover {
          color: var(--gold-primary);
          background-color: rgba(212, 175, 55, 0.03);
        }

        .calc-tab-btn.active {
          color: var(--gold-primary);
          background-color: var(--bg-secondary);
          border-top: 2px solid var(--gold-primary);
        }

        .calc-body {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 40px;
          padding: 40px;
          text-align: left;
        }

        .calc-form-side {
          display: flex;
          flex-direction: column;
        }

        .calc-title {
          font-size: 1.5rem;
          margin-bottom: 8px;
        }

        .calc-desc {
          color: var(--text-muted);
          font-size: 0.9rem;
          margin-bottom: 30px;
          line-height: 1.4;
        }

        .hasbled-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 14px;
          margin-bottom: 30px;
        }

        .checkbox-label {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          font-size: 0.9rem;
          color: var(--text-main);
          cursor: pointer;
        }

        .checkbox-label input {
          margin-top: 4px;
          accent-color: var(--gold-primary);
          cursor: pointer;
        }

        .cg-inputs-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
          margin-bottom: 30px;
        }

        .input-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .input-group label {
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--text-main);
        }

        .input-group input {
          padding: 12px;
          border: 1px solid var(--border-color);
          background-color: var(--bg-primary);
          color: var(--text-main);
          border-radius: var(--radius-sm);
          outline: none;
          font-size: 0.95rem;
        }

        .input-group input:focus {
          border-color: var(--gold-primary);
          box-shadow: 0 0 6px var(--gold-glow);
        }

        .gender-radio-group {
          display: flex;
          gap: 20px;
          padding: 10px 0;
        }

        .radio-label {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.95rem;
          cursor: pointer;
        }

        .radio-label input {
          accent-color: var(--gold-primary);
        }

        .btn-reset {
          align-self: flex-start;
          display: flex;
          align-items: center;
          gap: 8px;
          background: none;
          border: 1px dashed var(--border-color);
          color: var(--text-muted);
          padding: 10px 20px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 0.85rem;
          font-weight: 600;
          transition: var(--transition-smooth);
        }

        .btn-reset:hover {
          color: var(--gold-primary);
          border-color: var(--gold-primary);
          background-color: var(--gold-glow);
        }

        /* Results Panel */
        .calc-result-side {
          display: flex;
          align-items: stretch;
        }

        .result-card {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background-color: var(--bg-primary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 40px 20px;
          text-align: center;
        }

        .empty-result {
          color: var(--text-muted);
          font-size: 0.9rem;
          padding: 40px;
        }

        .pulse-icon {
          color: var(--border-color);
          margin-bottom: 20px;
          animation: pulse 2s infinite ease-in-out;
        }

        @keyframes pulse {
          0% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.08); opacity: 1; }
          100% { transform: scale(1); opacity: 0.6; }
        }

        .result-label {
          font-size: 0.9rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: var(--text-muted);
          margin-bottom: 10px;
        }

        .result-value {
          font-size: 4.5rem;
          font-weight: 800;
          line-height: 1.1;
        }

        .result-unit {
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--text-muted);
          margin-top: 4px;
        }

        .risk-indicator {
          margin-top: 24px;
          font-size: 0.95rem;
          font-weight: 600;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
        }

        .risk-badge {
          display: inline-block;
          padding: 6px 16px;
          border-radius: 50px;
          font-size: 0.85rem;
          font-weight: 700;
          text-transform: uppercase;
        }

        .risk-low, .risk-success {
          background-color: rgba(16, 185, 129, 0.1);
          color: var(--success);
          border: 1px solid rgba(16, 185, 129, 0.3);
        }

        .risk-moderate, .risk-warning {
          background-color: rgba(245, 158, 11, 0.1);
          color: var(--warning);
          border: 1px solid rgba(245, 158, 11, 0.3);
        }

        .risk-high, .risk-danger {
          background-color: rgba(239, 68, 68, 0.1);
          color: var(--danger);
          border: 1px solid rgba(239, 68, 68, 0.3);
        }

        .stats-box {
          margin-top: 30px;
          border-top: 1px solid var(--border-color);
          width: 100%;
          padding-top: 20px;
          display: flex;
          flex-direction: column;
        }

        .stats-number {
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--text-main);
        }

        .stats-text {
          font-size: 0.75rem;
          color: var(--text-muted);
          font-weight: 600;
          text-transform: uppercase;
        }

        @media (max-width: 768px) {
          .calc-body {
            grid-template-columns: 1fr;
            padding: 30px 20px;
          }
          .cg-inputs-grid {
            grid-template-columns: 1fr;
          }
          .result-card {
            padding: 30px 20px;
          }
        }
      `}</style>
    </section>
  );
}
