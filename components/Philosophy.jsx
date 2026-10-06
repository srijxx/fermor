'use client';

import { useEffect, useRef, useState } from 'react';

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

export default function Philosophy() {
  const [ref, inView] = useInView(0.2);

  return (
    <section
      id="about"
      ref={ref}
      style={{
        background: 'var(--dark-bg)',
        position: 'relative',
        overflow: 'hidden',
        padding: '7rem 0',
      }}
    >
      {/* Decorative grid */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(var(--dark-border) 1px, transparent 1px),
            linear-gradient(90deg, var(--dark-border) 1px, transparent 1px)
          `,
          backgroundSize: '56px 56px',
          opacity: 0.35,
          maskImage: 'radial-gradient(ellipse 70% 80% at 50% 50%, black 20%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 80% at 50% 50%, black 20%, transparent 100%)',
        }}
      />

      {/* Accent glow left */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: '-80px',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(26,158,92,0.1) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div className="container-main" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          maxWidth: '760px',
          marginInline: 'auto',
          textAlign: 'center',
        }}>

          {/* Pre-label */}
          <p
            style={{
              fontSize: '0.78rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--accent-mid)',
              marginBottom: '2rem',
              opacity: inView ? 1 : 0,
              transition: 'opacity 0.6s ease',
            }}
          >
            Our philosophy
          </p>

          {/* Main headline */}
          <h2
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: 700,
              color: 'var(--dark-fg)',
              letterSpacing: '-0.035em',
              lineHeight: 1.05,
              marginBottom: '2rem',
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.7s ease 0.1s, transform 0.7s var(--ease-out) 0.1s',
            }}
          >
            Finance shouldn't feel{' '}
            <span style={{
              color: 'transparent',
              WebkitTextStroke: '1.5px var(--accent)',
              fontStyle: 'italic',
            }}>
              complicated.
            </span>
          </h2>

          {/* Supporting text */}
          <p
            style={{
              fontSize: 'clamp(1rem, 1.8vw, 1.25rem)',
              color: 'var(--dark-muted)',
              lineHeight: 1.7,
              maxWidth: '560px',
              marginInline: 'auto',
              marginBottom: '3rem',
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0)' : 'translateY(16px)',
              transition: 'opacity 0.7s ease 0.2s, transform 0.7s var(--ease-out) 0.2s',
            }}
          >
            Fermor brings clarity to the decisions that matter — so you spend less time worrying about money and more time doing something about it.
          </p>

          {/* Three principle pills */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: '0.75rem',
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0)' : 'translateY(12px)',
              transition: 'opacity 0.7s ease 0.3s, transform 0.7s var(--ease-out) 0.3s',
            }}
          >
            {[
              'Clarity over complexity',
              'Action over information',
              'Progress over perfection',
            ].map((principle) => (
              <span
                key={principle}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 16px',
                  background: 'var(--dark-surface)',
                  border: '1px solid var(--dark-border)',
                  borderRadius: '999px',
                  fontSize: '0.84rem',
                  fontWeight: 500,
                  color: 'var(--dark-fg)',
                  letterSpacing: '-0.005em',
                }}
              >
                <span
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: 'var(--accent)',
                    flexShrink: 0,
                  }}
                />
                {principle}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
