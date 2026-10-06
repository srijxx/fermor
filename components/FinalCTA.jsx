'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';

function useInView(threshold = 0.2) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

export default function FinalCTA() {
  const [ref, inView] = useInView(0.2);

  return (
    <section
      id="final-cta"
      ref={ref}
      className="section-py"
      style={{ background: 'var(--bg-base)' }}
    >
      <div className="container-main">
        <div
          style={{
            background: 'var(--dark-bg)',
            border: '1px solid var(--dark-border)',
            borderRadius: 'var(--radius-2xl)',
            padding: 'clamp(3rem, 6vw, 5rem) clamp(1.5rem, 5vw, 5rem)',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Accent glow center */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: '-60px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '500px',
              height: '300px',
              borderRadius: '50%',
              background: 'radial-gradient(ellipse, rgba(26,158,92,0.15) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          {/* Corner accents */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '80px',
              height: '80px',
              borderTop: '1px solid rgba(26,158,92,0.3)',
              borderLeft: '1px solid rgba(26,158,92,0.3)',
              borderRadius: '24px 0 0 0',
              pointerEvents: 'none',
            }}
          />
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              width: '80px',
              height: '80px',
              borderBottom: '1px solid rgba(26,158,92,0.3)',
              borderRight: '1px solid rgba(26,158,92,0.3)',
              borderRadius: '0 0 24px 0',
              pointerEvents: 'none',
            }}
          />

          <div style={{ position: 'relative', zIndex: 1 }}>
            {/* Label */}
            <p
              style={{
                fontSize: '0.78rem',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--accent-mid)',
                marginBottom: '1.25rem',
                opacity: inView ? 1 : 0,
                transition: 'opacity 0.6s ease',
              }}
            >
              Get started today
            </p>

            {/* Headline */}
            <h2
              style={{
                fontSize: 'clamp(2rem, 4.5vw, 3.25rem)',
                fontWeight: 700,
                color: 'var(--dark-fg)',
                letterSpacing: '-0.03em',
                lineHeight: 1.1,
                maxWidth: '580px',
                marginInline: 'auto',
                marginBottom: '1.25rem',
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.7s ease 0.1s, transform 0.7s var(--ease-out) 0.1s',
              }}
            >
              Ready to make sense of your money?
            </h2>

            {/* Sub */}
            <p
              style={{
                fontSize: 'clamp(0.95rem, 1.5vw, 1.125rem)',
                color: 'var(--dark-muted)',
                lineHeight: 1.65,
                maxWidth: '420px',
                marginInline: 'auto',
                marginBottom: '2.5rem',
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(16px)',
                transition: 'opacity 0.7s ease 0.2s, transform 0.7s var(--ease-out) 0.2s',
              }}
            >
              Start building a clearer financial future with Fermor.
            </p>

            {/* CTA */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '0.875rem',
                flexWrap: 'wrap',
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(12px)',
                transition: 'opacity 0.7s ease 0.3s, transform 0.7s var(--ease-out) 0.3s',
              }}
            >
              <a
                href="#hero-cta"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '0.9rem 2rem',
                  background: 'var(--accent)',
                  color: '#fff',
                  fontSize: '1rem',
                  fontWeight: 700,
                  borderRadius: 'var(--radius-md)',
                  textDecoration: 'none',
                  transition: 'background 0.18s ease, transform 0.15s var(--ease-spring), box-shadow 0.18s ease',
                  letterSpacing: '-0.01em',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'var(--accent-dark)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgb(26 158 92 / 0.35)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'var(--accent)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                Get started
                <ArrowRight size={16} />
              </a>

              <a
                href="#how-it-works"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '0.9rem 2rem',
                  background: 'transparent',
                  color: 'var(--dark-fg)',
                  fontSize: '1rem',
                  fontWeight: 600,
                  borderRadius: 'var(--radius-md)',
                  textDecoration: 'none',
                  border: '1.5px solid var(--dark-border)',
                  transition: 'border-color 0.18s ease, background 0.18s ease, transform 0.15s var(--ease-spring)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'var(--accent)';
                  e.currentTarget.style.background = 'rgba(26,158,92,0.06)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--dark-border)';
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                See how it works
              </a>
            </div>

            {/* Small reassurance */}
            <p
              style={{
                fontSize: '0.78rem',
                color: 'var(--dark-muted)',
                marginTop: '1.5rem',
                opacity: inView ? 0.7 : 0,
                transition: 'opacity 0.7s ease 0.4s',
              }}
            >
              No credit card required · Free to get started
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
