import React, { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X, Shield } from 'lucide-react';

export default function Header({ theme, toggleTheme }) {
  const [isSticky, setIsSticky] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Skills', href: '#skills' },
    { name: 'Clinical Tools', href: '#calculators' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <header className={`header ${isSticky ? 'sticky' : ''}`}>
      <div className="header-container">
        <a href="#home" className="logo-area">
          <div className="logo-icon">
            <Shield size={22} className="gold-icon" />
          </div>
          <span className="logo-text">Dr. S. Huzaifa <span className="logo-sub">Pharm.D</span></span>
        </a>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="nav-link">
              {link.name}
            </a>
          ))}
          <button onClick={toggleTheme} className="theme-toggle-btn" aria-label="Toggle theme">
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </nav>

        {/* Mobile Navigation Trigger */}
        <div className="mobile-actions">
          <button onClick={toggleTheme} className="theme-toggle-btn mobile-theme-btn" aria-label="Toggle theme">
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
            className="mobile-menu-btn"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <div className={`mobile-drawer ${isMobileMenuOpen ? 'open' : ''}`}>
        <nav className="mobile-nav">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="mobile-nav-link"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
        </nav>
      </div>

      <style>{`
        .header {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 1000;
          background-color: transparent;
          border-bottom: 1px solid transparent;
          transition: var(--transition-smooth);
          height: 80px;
          display: flex;
          align-items: center;
        }

        .header.sticky {
          background-color: rgba(var(--bg-secondary-rgb, 255, 255, 255), 0.85);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--border-color);
          box-shadow: var(--shadow-sm);
          height: 70px;
        }

        [data-theme="dark"] .header.sticky {
          background-color: rgba(18, 18, 18, 0.85);
        }

        .header-container {
          max-width: 1200px;
          width: 100%;
          margin: 0 auto;
          padding: 0 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .logo-area {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-heading);
          font-size: 1.25rem;
          font-weight: 700;
        }

        .logo-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: var(--gold-glow);
          border: 1px solid var(--gold-border);
        }

        .gold-icon {
          color: var(--gold-primary);
        }

        .logo-text {
          color: var(--text-main);
        }

        .logo-sub {
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--gold-primary);
          border: 1px solid var(--gold-border);
          padding: 2px 6px;
          border-radius: 4px;
          vertical-align: middle;
          margin-left: 4px;
        }

        .desktop-nav {
          display: flex;
          align-items: center;
          gap: 24px;
        }

        .nav-link {
          font-size: 0.95rem;
          font-weight: 500;
          color: var(--text-muted);
          position: relative;
          padding: 6px 0;
        }

        .nav-link:hover {
          color: var(--gold-primary);
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background-color: var(--gold-primary);
          transition: var(--transition-smooth);
        }

        .nav-link:hover::after {
          width: 100%;
        }

        .theme-toggle-btn {
          background: none;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          padding: 8px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: var(--transition-smooth);
          border: 1px solid var(--border-color);
        }

        .theme-toggle-btn:hover {
          color: var(--gold-primary);
          border-color: var(--gold-primary);
          background-color: var(--gold-glow);
          transform: rotate(15deg);
        }

        .mobile-actions {
          display: none;
          align-items: center;
          gap: 12px;
        }

        .mobile-menu-btn {
          background: none;
          border: none;
          color: var(--text-main);
          cursor: pointer;
          padding: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Mobile Menu Drawer */
        .mobile-drawer {
          position: fixed;
          top: 80px;
          left: 0;
          width: 100%;
          background-color: var(--bg-secondary);
          border-bottom: 1px solid var(--border-color);
          z-index: 999;
          transform: translateY(-150%);
          opacity: 0;
          visibility: hidden;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: var(--shadow-md);
        }

        .mobile-drawer.open {
          transform: translateY(0);
          opacity: 1;
          visibility: visible;
        }

        .header.sticky ~ .mobile-drawer {
          top: 70px;
        }

        .mobile-nav {
          display: flex;
          flex-direction: column;
          padding: 24px;
          gap: 16px;
        }

        .mobile-nav-link {
          font-size: 1.1rem;
          font-weight: 500;
          color: var(--text-main);
          padding: 8px 0;
          border-bottom: 1px dashed var(--border-color);
        }

        .mobile-nav-link:last-child {
          border-bottom: none;
        }

        .mobile-nav-link:hover {
          color: var(--gold-primary);
          padding-left: 8px;
        }

        @media (max-width: 768px) {
          .desktop-nav {
            display: none;
          }

          .mobile-actions {
            display: flex;
          }
        }
      `}</style>
    </header>
  );
}
