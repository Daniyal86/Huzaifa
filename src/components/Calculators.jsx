import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, ShieldAlert, RefreshCw, Baby, Scale, ChevronRight } from 'lucide-react';

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

  // Paediatric Dose State
  const [pdInputs, setPdInputs] = useState({
    adultDose: '',
    ageYears: '',
    ageMonths: '',
    weightKg: ''  // User enters kg; formula converts to lbs internally
  });

  const handlePdChange = (e) => {
    const { name, value } = e.target;
    setPdInputs(prev => ({ ...prev, [name]: value }));
  };

  const resetPd = () => {
    setPdInputs({ adultDose: '', ageYears: '', ageMonths: '', weightKg: '' });
  };

  const calculatePd = () => {
    const adult = parseFloat(pdInputs.adultDose);
    const ageY = parseFloat(pdInputs.ageYears);
    const ageM = parseFloat(pdInputs.ageMonths);
    const wtKg = parseFloat(pdInputs.weightKg);
    // Clark's Rule requires weight in lbs — convert kg → lbs automatically
    const wtLbs = wtKg * 2.2046;
    const results = {};
    if (adult > 0 && !isNaN(ageY) && ageY >= 1 && ageY <= 12) {
      results.youngs = ((ageY / (ageY + 12)) * adult).toFixed(2);
    }
    if (adult > 0 && !isNaN(wtKg) && wtKg > 0) {
      results.clarks = ((wtLbs / 150) * adult).toFixed(2);
    }
    if (adult > 0 && !isNaN(ageM) && ageM > 0 && ageM < 12) {
      results.frieds = ((ageM / 150) * adult).toFixed(2);
    }
    return results;
  };

  const pdResults = calculatePd();

  // BMI State
  const [bmiUnit, setBmiUnit] = useState('metric');
  const [bmiInputs, setBmiInputs] = useState({
    weightKg: '', heightCm: '',
    weightKgImperial: '', heightFt: '', heightIn: '' // Imperial also takes kg, converts to lbs internally
  });

  const handleBmiChange = (e) => {
    const { name, value } = e.target;
    setBmiInputs(prev => ({ ...prev, [name]: value }));
  };

  const resetBmi = () => {
    setBmiInputs({ weightKg: '', heightCm: '', weightKgImperial: '', heightFt: '', heightIn: '' });
  };

  const calculateBmi = () => {
    let bmi = null;
    if (bmiUnit === 'metric') {
      const wKg = parseFloat(bmiInputs.weightKg);
      const hCm = parseFloat(bmiInputs.heightCm);
      if (wKg > 0 && hCm > 0) {
        const hM = hCm / 100;
        bmi = wKg / (hM * hM);
      }
    } else {
      const wKgImp = parseFloat(bmiInputs.weightKgImperial);
      // Imperial BMI formula uses lbs — auto-convert kg → lbs
      const wLbs = wKgImp * 2.2046;
      const ft = parseFloat(bmiInputs.heightFt) || 0;
      const inch = parseFloat(bmiInputs.heightIn) || 0;
      const totalIn = ft * 12 + inch;
      if (wKgImp > 0 && totalIn > 0) {
        bmi = (703 * wLbs) / (totalIn * totalIn);
      }
    }
    if (bmi === null) return null;
    let category = '', colorClass = '', percent = 0;
    if (bmi < 18.5)      { category = 'Underweight'; colorClass = 'bmi-under';    percent = Math.min((bmi / 18.5) * 25, 25); }
    else if (bmi < 25)  { category = 'Normal Weight'; colorClass = 'bmi-normal';  percent = 25 + ((bmi - 18.5) / 6.5) * 25; }
    else if (bmi < 30)  { category = 'Overweight';   colorClass = 'bmi-over';    percent = 50 + ((bmi - 25) / 5) * 25; }
    else                { category = 'Obese';         colorClass = 'bmi-obese';   percent = Math.min(75 + ((bmi - 30) / 10) * 25, 99); }
    return { bmi: bmi.toFixed(1), category, colorClass, percent: Math.min(percent, 99) };
  };

  const bmiResult = calculateBmi();

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
                <span className="tab-icon-wrap"><ShieldAlert size={18} /></span>
                <span className="tab-label">HAS-BLED Bleeding Risk</span>
                <ChevronRight size={16} className="tab-chevron" />
              </button>
              <button 
                onClick={() => setActiveCalc('cockcroft')}
                className={`calc-tab-btn ${activeCalc === 'cockcroft' ? 'active' : ''}`}
              >
                <span className="tab-icon-wrap"><Activity size={18} /></span>
                <span className="tab-label">Cockcroft-Gault (CrCl)</span>
                <ChevronRight size={16} className="tab-chevron" />
              </button>
              <button 
                onClick={() => setActiveCalc('paediatric')}
                className={`calc-tab-btn ${activeCalc === 'paediatric' ? 'active' : ''}`}
              >
                <span className="tab-icon-wrap"><Baby size={18} /></span>
                <span className="tab-label">Paediatric Dosage</span>
                <ChevronRight size={16} className="tab-chevron" />
              </button>
              <button 
                onClick={() => setActiveCalc('bmi')}
                className={`calc-tab-btn ${activeCalc === 'bmi' ? 'active' : ''}`}
              >
                <span className="tab-icon-wrap"><Scale size={18} /></span>
                <span className="tab-label">BMI Calculator</span>
                <ChevronRight size={16} className="tab-chevron" />
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

            {/* Paediatric Dose Calculator */}
            {activeCalc === 'paediatric' && (
              <div className="calc-body">
                <div className="calc-form-side">
                  <h3 className="calc-title">Paediatric Dose Calculator</h3>
                  <p className="calc-desc">
                    Calculate child doses from adult doses using three validated clinical formulas.
                  </p>

                  <div className="cg-inputs-grid">
                    <div className="input-group">
                      <label>Adult Dose (mg)</label>
                      <input
                        type="number"
                        name="adultDose"
                        value={pdInputs.adultDose}
                        onChange={handlePdChange}
                        placeholder="e.g., 500"
                      />
                    </div>
                    <div className="input-group">
                      <label>Age — Years (1–12 yrs)</label>
                      <input
                        type="number"
                        name="ageYears"
                        value={pdInputs.ageYears}
                        onChange={handlePdChange}
                        placeholder="e.g., 6"
                      />
                    </div>
                    <div className="input-group">
                      <label>Age — Months (&lt;12 mo)</label>
                      <input
                        type="number"
                        name="ageMonths"
                        value={pdInputs.ageMonths}
                        onChange={handlePdChange}
                        placeholder="e.g., 8"
                      />
                    </div>
                    <div className="input-group">
                      <label>Weight (kg) <span style={{fontSize:'0.75em', opacity:0.65, fontWeight:400}}>→ auto-converts to lbs for Clark's Rule</span></label>
                      <input
                        type="number"
                        name="weightKg"
                        value={pdInputs.weightKg}
                        onChange={handlePdChange}
                        placeholder="e.g., 20"
                      />
                    </div>
                  </div>

                  <button onClick={resetPd} className="btn-reset">
                    <RefreshCw size={14} />
                    Reset Calculator
                  </button>
                </div>

                <div className="calc-result-side">
                  <div className="pd-results-stack">

                    {/* Young's Rule */}
                    <div className={`pd-rule-card ${pdResults.youngs ? 'active-result' : ''}`}>
                      <div className="pd-rule-header">
                        <span className="pd-rule-label">A) Young's Rule</span>
                        <span className="pd-rule-note">Children 1–12 years</span>
                      </div>
                      <div className="pd-formula">
                        <span className="formula-text">
                          Child Dose = <span className="formula-fraction">
                            <span className="numerator">Age (years)</span>
                            <span className="denominator">Age + 12</span>
                          </span> × Adult Dose
                        </span>
                      </div>
                      {pdResults.youngs ? (
                        <div className="pd-answer">
                          <span className="pd-value text-gold-gradient">{pdResults.youngs}</span>
                          <span className="pd-unit">mg</span>
                        </div>
                      ) : (
                        <div className="pd-empty">Enter adult dose &amp; age (1–12 yrs)</div>
                      )}
                    </div>

                    {/* Clark's Rule */}
                    <div className={`pd-rule-card ${pdResults.clarks ? 'active-result' : ''}`}>
                      <div className="pd-rule-header">
                        <span className="pd-rule-label">B) Clark's Rule</span>
                        <span className="pd-rule-note">All ages by weight</span>
                      </div>
                      <div className="pd-formula">
                        <span className="formula-text">
                          Child Dose = <span className="formula-fraction">
                            <span className="numerator">Weight (kg × 2.2046)</span>
                            <span className="denominator">150</span>
                          </span> × Adult Dose
                        </span>
                      </div>
                      {pdResults.clarks ? (
                        <div className="pd-answer">
                          <span className="pd-value text-gold-gradient">{pdResults.clarks}</span>
                          <span className="pd-unit">mg</span>
                        </div>
                      ) : (
                        <div className="pd-empty">Enter adult dose &amp; weight (kg)</div>
                      )}
                    </div>

                    {/* Fried's Rule */}
                    <div className={`pd-rule-card ${pdResults.frieds ? 'active-result' : ''}`}>
                      <div className="pd-rule-header">
                        <span className="pd-rule-label">C) Fried's Rule</span>
                        <span className="pd-rule-note">Infants under 1 year</span>
                      </div>
                      <div className="pd-formula">
                        <span className="formula-text">
                          Child Dose = <span className="formula-fraction">
                            <span className="numerator">Age (months)</span>
                            <span className="denominator">150</span>
                          </span> × Adult Dose
                        </span>
                      </div>
                      {pdResults.frieds ? (
                        <div className="pd-answer">
                          <span className="pd-value text-gold-gradient">{pdResults.frieds}</span>
                          <span className="pd-unit">mg</span>
                        </div>
                      ) : (
                        <div className="pd-empty">Enter adult dose &amp; age in months (&lt;12)</div>
                      )}
                    </div>

                  </div>
                </div>
              </div>
            )}

            {/* BMI Calculator */}
            {activeCalc === 'bmi' && (
              <div className="calc-body">
                <div className="calc-form-side">
                  <h3 className="calc-title">BMI Calculator</h3>
                  <p className="calc-desc">
                    Body Mass Index (BMI) estimates body fat based on weight and height using WHO classifications.
                  </p>

                  {/* Unit toggle */}
                  <div className="bmi-unit-toggle">
                    <button
                      className={`unit-btn ${bmiUnit === 'metric' ? 'active' : ''}`}
                      onClick={() => setBmiUnit('metric')}
                    >Metric (kg / cm)</button>
                    <button
                      className={`unit-btn ${bmiUnit === 'imperial' ? 'active' : ''}`}
                      onClick={() => setBmiUnit('imperial')}
                    >Imperial (lbs / ft)</button>
                  </div>

                  {bmiUnit === 'metric' ? (
                    <div className="cg-inputs-grid">
                      <div className="input-group">
                        <label>Weight (kg)</label>
                        <input type="number" name="weightKg" value={bmiInputs.weightKg}
                          onChange={handleBmiChange} placeholder="e.g., 70" />
                      </div>
                      <div className="input-group">
                        <label>Height (cm)</label>
                        <input type="number" name="heightCm" value={bmiInputs.heightCm}
                          onChange={handleBmiChange} placeholder="e.g., 170" />
                      </div>
                    </div>
                  ) : (
                    <div className="cg-inputs-grid">
                      <div className="input-group">
                        <label>Weight (kg) <span style={{fontSize:'0.75em', opacity:0.65, fontWeight:400}}>→ auto-converts to lbs</span></label>
                        <input type="number" name="weightKgImperial" value={bmiInputs.weightKgImperial}
                          onChange={handleBmiChange} placeholder="e.g., 70" />
                      </div>
                      <div className="input-group">
                        <label>Height — Feet</label>
                        <input type="number" name="heightFt" value={bmiInputs.heightFt}
                          onChange={handleBmiChange} placeholder="e.g., 5" />
                      </div>
                      <div className="input-group">
                        <label>Height — Inches</label>
                        <input type="number" name="heightIn" value={bmiInputs.heightIn}
                          onChange={handleBmiChange} placeholder="e.g., 7" />
                      </div>
                    </div>
                  )}

                  <button onClick={resetBmi} className="btn-reset" style={{ marginTop: '20px' }}>
                    <RefreshCw size={14} />
                    Reset Calculator
                  </button>
                </div>

                <div className="calc-result-side">
                  {bmiResult ? (
                    <div className="result-card">
                      <span className="result-label">Body Mass Index</span>
                      <span className="result-value text-gold-gradient">{bmiResult.bmi}</span>
                      <span className="result-unit">kg/m²</span>

                      <div className="risk-indicator" style={{ marginTop: '16px' }}>
                        <span>WHO Classification:</span>
                        <span className={`risk-badge ${bmiResult.colorClass}`}>
                          {bmiResult.category}
                        </span>
                      </div>

                      {/* BMI Scale Bar */}
                      <div className="bmi-scale-wrap">
                        <div className="bmi-scale-bar">
                          <div className="bmi-scale-segment seg-under" />
                          <div className="bmi-scale-segment seg-normal" />
                          <div className="bmi-scale-segment seg-over" />
                          <div className="bmi-scale-segment seg-obese" />
                          <div className="bmi-scale-marker" style={{ left: `${bmiResult.percent}%` }} />
                        </div>
                        <div className="bmi-scale-labels">
                          <span>Underweight</span>
                          <span>Normal</span>
                          <span>Overweight</span>
                          <span>Obese</span>
                        </div>
                        <div className="bmi-scale-nums">
                          <span>16</span>
                          <span>18.5</span>
                          <span>25</span>
                          <span>30</span>
                          <span>40+</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="result-card empty-result">
                      <Scale size={40} className="pulse-icon" />
                      <p>Enter your weight and height to calculate BMI and WHO classification.</p>
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

        /* Desktop: hide chevron */
        .tab-chevron { display: none; }

        .tab-icon-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .tab-label { flex: 1; }

        @media (max-width: 768px) {
          /* Mobile: full-width vertical list */
          .calc-tabs {
            display: flex;
            flex-direction: column;
            gap: 0;
            padding: 0;
            border-bottom: none;
            background-color: var(--bg-primary);
          }

          .calc-tab-btn {
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
            gap: 14px;
            padding: 16px 20px;
            background-color: var(--bg-primary);
            border: none !important;
            border-bottom: 1px solid var(--border-color) !important;
            border-radius: 0;
            border-left: 4px solid transparent !important;
            font-size: 0.95rem;
            font-weight: 600;
            text-align: left;
            color: var(--text-muted);
          }

          .calc-tab-btn:last-child {
            border-bottom: none !important;
          }

          .calc-tab-btn.active {
            border-left-color: var(--gold-primary) !important;
            background-color: var(--gold-glow);
            color: var(--gold-primary);
          }

          .tab-icon-wrap {
            width: 36px;
            height: 36px;
            border-radius: 10px;
            background-color: var(--bg-secondary);
            border: 1px solid var(--border-color);
            flex-shrink: 0;
          }

          .calc-tab-btn.active .tab-icon-wrap {
            background-color: rgba(212,175,55,0.2);
            border-color: var(--gold-border);
            color: var(--gold-primary);
          }

          .tab-label {
            flex: 1;
            font-size: 0.95rem;
            line-height: 1.2;
            text-align: left;
            white-space: nowrap;
          }

          .tab-chevron {
            display: block;
            opacity: 0.3;
            flex-shrink: 0;
          }

          .calc-tab-btn.active .tab-chevron {
            opacity: 1;
            color: var(--gold-primary);
          }

          .calc-body {
            border-top: 2px solid var(--border-color);
          }
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
          .calc-tabs {
            flex-direction: column;
          }
          .calc-tab-btn {
            padding: 14px 16px;
            justify-content: flex-start;
            gap: 10px;
            font-size: 0.9rem;
          }
          .calc-body {
            grid-template-columns: 1fr;
            padding: 24px 16px;
            gap: 24px;
          }
          .cg-inputs-grid {
            grid-template-columns: 1fr;
          }
          .result-card {
            padding: 30px 16px;
          }
          .result-value {
            font-size: 3.5rem;
          }
          .hasbled-grid {
            gap: 12px;
          }
          .checkbox-label {
            font-size: 0.88rem;
          }
        }

        /* Paediatric Calculator Styles */
        .pd-results-stack {
          display: flex;
          flex-direction: column;
          gap: 14px;
          width: 100%;
        }

        .pd-rule-card {
          background-color: var(--bg-primary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          padding: 16px 20px;
          transition: var(--transition-smooth);
        }

        .pd-rule-card.active-result {
          border-color: var(--gold-border);
          box-shadow: 0 0 12px var(--gold-glow);
        }

        .pd-rule-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
          flex-wrap: wrap;
          gap: 4px;
        }

        .pd-rule-label {
          font-size: 0.9rem;
          font-weight: 700;
          color: var(--text-main);
        }

        .pd-rule-note {
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--gold-primary);
          background-color: var(--gold-glow);
          padding: 2px 8px;
          border-radius: 50px;
          border: 1px solid var(--gold-border);
        }

        .pd-formula {
          margin-bottom: 10px;
          padding: 8px 10px;
          background-color: var(--bg-secondary);
          border-radius: 6px;
          border: 1px solid var(--border-color);
        }

        .formula-text {
          font-size: 0.85rem;
          color: var(--text-muted);
          display: flex;
          align-items: center;
          gap: 6px;
          flex-wrap: wrap;
        }

        .formula-fraction {
          display: inline-flex;
          flex-direction: column;
          align-items: center;
          vertical-align: middle;
          margin: 0 4px;
        }

        .numerator {
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text-main);
          border-bottom: 1.5px solid var(--gold-primary);
          padding-bottom: 2px;
          text-align: center;
        }

        .denominator {
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text-main);
          padding-top: 2px;
          text-align: center;
        }

        .pd-answer {
          display: flex;
          align-items: baseline;
          gap: 6px;
        }

        .pd-value {
          font-size: 1.8rem;
          font-weight: 800;
          line-height: 1;
        }

        .pd-unit {
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--text-muted);
        }

        .pd-empty {
          font-size: 0.8rem;
          color: var(--text-muted);
          font-style: italic;
        }

        /* BMI Calculator Styles */
        .bmi-unit-toggle {
          display: flex;
          gap: 10px;
          margin-bottom: 24px;
          background-color: var(--bg-primary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          padding: 4px;
        }

        .unit-btn {
          flex: 1;
          padding: 10px 12px;
          border: none;
          border-radius: 6px;
          background: none;
          color: var(--text-muted);
          font-weight: 600;
          font-size: 0.85rem;
          cursor: pointer;
          transition: var(--transition-smooth);
        }

        .unit-btn.active {
          background-color: var(--gold-primary);
          color: #fff;
          box-shadow: 0 2px 8px rgba(212, 175, 55, 0.35);
        }

        .bmi-scale-wrap {
          width: 100%;
          margin-top: 24px;
          text-align: left;
        }

        .bmi-scale-bar {
          display: flex;
          height: 14px;
          border-radius: 50px;
          overflow: visible;
          position: relative;
          gap: 2px;
        }

        .bmi-scale-segment {
          flex: 1;
          border-radius: 50px;
        }

        .seg-under  { background-color: #60A5FA; }
        .seg-normal { background-color: #34D399; }
        .seg-over   { background-color: #FBBF24; }
        .seg-obese  { background-color: #F87171; }

        .bmi-scale-marker {
          position: absolute;
          top: -4px;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: var(--gold-primary);
          border: 3px solid var(--bg-secondary);
          box-shadow: 0 0 8px var(--gold-glow);
          transform: translateX(-50%);
          transition: left 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .bmi-scale-labels {
          display: flex;
          justify-content: space-between;
          margin-top: 8px;
          font-size: 0.72rem;
          font-weight: 600;
          color: var(--text-muted);
        }

        .bmi-scale-nums {
          display: flex;
          justify-content: space-between;
          margin-top: 2px;
          font-size: 0.7rem;
          color: var(--text-muted);
          opacity: 0.7;
        }

        .bmi-under  { background-color: rgba(96,165,250,0.12); color: #60A5FA; border: 1px solid rgba(96,165,250,0.3); }
        .bmi-normal { background-color: rgba(52,211,153,0.12); color: #34D399; border: 1px solid rgba(52,211,153,0.3); }
        .bmi-over   { background-color: rgba(245,158,11,0.12);  color: var(--warning); border: 1px solid rgba(245,158,11,0.3); }
        .bmi-obese  { background-color: rgba(239,68,68,0.12);   color: var(--danger);  border: 1px solid rgba(239,68,68,0.3); }
      `}</style>
    </section>
  );
}
