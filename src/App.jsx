import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Calculators from './components/Calculators';
import Education from './components/Education';
import ExtraCurriculars from './components/ExtraCurriculars';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const [theme, setTheme] = useState(() => {
    // Read theme from localStorage or fallback to system settings
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) return savedTheme;
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    return systemTheme;
  });

  useEffect(() => {
    // Set theme on the root document element to enable CSS variable updates
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="app-wrapper">
      <Header theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Calculators />
        <Education />
        <ExtraCurriculars />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
