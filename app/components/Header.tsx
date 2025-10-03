'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import Login from './Login';
import Register from './Register';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const loginRef = useRef<HTMLDivElement>(null);
  const registerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (loginRef.current && !loginRef.current.contains(event.target as Node)) {
        setShowLogin(false);
      }
      if (registerRef.current && !registerRef.current.contains(event.target as Node)) {
        setShowRegister(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="header">
      <div className="header-container">

        <div className="left-buttons">
          <button onClick={() => { setShowLogin(!showLogin); setShowRegister(false); }}>
            Connexion
          </button>
          <button onClick={() => { setShowRegister(!showRegister); setShowLogin(false); }}>
            Inscription
          </button>
        </div>

        <nav className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <Link href="#experience">Expérience</Link>
          <Link href="#projects">Projets</Link>
          <Link href="#contact">Contact</Link>
          <Link href="#about">À propos</Link>
        </nav>

        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </button>

        {showLogin && (
          <div ref={loginRef} className="dropdown-form">
            <Login />
          </div>
        )}

        {showRegister && (
          <div ref={registerRef} className="dropdown-form">
            <Register />
          </div>
        )}

      </div>
    </header>
  );
}
