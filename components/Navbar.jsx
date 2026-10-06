'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Product',      href: '#product' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Insights',     href: '#insights' },
  { label: 'About',        href: '#about' },
];

export default function Navbar() {
  const [scrolled,   setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      <header
        role="banner"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          transition: 'background 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease',
          background: scrolled ? 'rgba(250,250,249,0.94)' : 'transparent',
          borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
          boxShadow: scrolled ? '0 1px 16px rgb(0 0 0 / 0.05)' : 'none',
          backdropFilter: scrolled ? 'blur(14px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(14px)' : 'none',
        }}
      >
        <nav
          className="container-main"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '64px',
          }}
          aria-label="Main navigation"
        >
          {/* ── Logo ── */}
          <a
            href="#hero"
            onClick={closeMobile}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              textDecoration: 'none',
              flexShrink: 0,
            }}
            aria-label="Fermor – back to top"
          >
            <span
              aria-hidden="true"
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '7px',
                background: 'var(--accent)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 10L5 5.5L8 8L11 4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            <span style={{
              fontSize: '1.0625rem',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              color: 'var(--fg-primary)',
            }}>
              Fermor
            </span>
          </a>

          {/* ── Desktop nav links (hidden on mobile) ── */}
          <ul
            aria-label="Primary navigation"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
              listStyle: 'none',
              margin: 0,
              padding: 0,
            }}
            className="desktop-nav"
          >
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  style={{
                    padding: '0.4rem 0.875rem',
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    color: 'var(--fg-secondary)',
                    textDecoration: 'none',
                    borderRadius: '6px',
                    transition: 'color 0.15s ease, background 0.15s ease',
                    display: 'block',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = 'var(--fg-primary)';
                    e.currentTarget.style.background = 'var(--bg-subtle)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = 'var(--fg-secondary)';
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* ── Desktop CTA buttons (hidden on mobile) ── */}
          <div
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            className="desktop-cta"
          >
            <a
              href="#"
              style={{
                padding: '0.45rem 1rem',
                fontSize: '0.9rem',
                fontWeight: 500,
                color: 'var(--fg-secondary)',
                textDecoration: 'none',
                borderRadius: '6px',
                transition: 'color 0.15s ease',
              }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--fg-primary)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--fg-secondary)'}
            >
              Log in
            </a>
            <a
              href="#final-cta"
              className="btn-primary"
              style={{ padding: '0.5rem 1.125rem', fontSize: '0.9rem' }}
            >
              Get started
            </a>
          </div>

          {/* ── Mobile hamburger (hidden on desktop) ── */}
          <button
            className="mobile-menu-btn"
            onClick={() => setMobileOpen(prev => !prev)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              borderRadius: '6px',
              color: 'var(--fg-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.15s ease',
              minWidth: '44px',
              minHeight: '44px',
            }}
          >
            {mobileOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </nav>
      </header>

      {/* ── Mobile menu overlay ── */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        // Hide from AT when closed
        aria-hidden={!mobileOpen}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 40,
          background: 'var(--bg-base)',
          display: 'flex',
          flexDirection: 'column',
          padding: '0 1.5rem 2rem',
          transition: 'opacity 0.22s ease, transform 0.22s var(--ease-out)',
          opacity: mobileOpen ? 1 : 0,
          transform: mobileOpen ? 'translateY(0)' : 'translateY(-8px)',
          pointerEvents: mobileOpen ? 'auto' : 'none',
        }}
      >
        {/* Spacer for fixed header */}
        <div style={{ height: '64px', flexShrink: 0 }} aria-hidden="true" />

        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}>
          <ul
            style={{ listStyle: 'none', margin: 0, padding: 0, marginBottom: '2rem' }}
            aria-label="Mobile navigation"
          >
            {navLinks.map((link, i) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={closeMobile}
                  tabIndex={mobileOpen ? 0 : -1}
                  style={{
                    display: 'block',
                    padding: '0.875rem 0',
                    fontSize: '1.125rem',
                    fontWeight: 600,
                    color: 'var(--fg-primary)',
                    textDecoration: 'none',
                    borderBottom: '1px solid var(--border)',
                    animation: mobileOpen ? `fadeUp 0.35s var(--ease-out) ${i * 0.05 + 0.05}s both` : 'none',
                  }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
              animation: mobileOpen ? 'fadeUp 0.35s var(--ease-out) 0.25s both' : 'none',
            }}
          >
            <a
              href="#"
              onClick={closeMobile}
              tabIndex={mobileOpen ? 0 : -1}
              style={{
                display: 'block',
                padding: '0.875rem',
                fontSize: '1rem',
                fontWeight: 600,
                color: 'var(--fg-primary)',
                textDecoration: 'none',
                textAlign: 'center',
                border: '1.5px solid var(--border-strong)',
                borderRadius: 'var(--radius-md)',
                minHeight: '48px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              Log in
            </a>
            <a
              href="#final-cta"
              onClick={closeMobile}
              tabIndex={mobileOpen ? 0 : -1}
              className="btn-primary"
              style={{ justifyContent: 'center', padding: '0.875rem', minHeight: '48px' }}
            >
              Get started
            </a>
          </div>
        </div>
      </div>

      {/* Responsive visibility rules */}
      <style>{`
        /* Desktop: show nav + cta, hide hamburger */
        @media (min-width: 768px) {
          .desktop-nav   { display: flex !important; }
          .desktop-cta   { display: flex !important; }
          .mobile-menu-btn { display: none !important; }
        }
        /* Mobile: hide desktop nav + cta, show hamburger */
        @media (max-width: 767px) {
          .desktop-nav   { display: none !important; }
          .desktop-cta   { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}
