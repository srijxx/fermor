'use client';

import { useEffect, useRef, useState } from 'react';
import { Link2, Eye, MousePointerClick, TrendingUp } from 'lucide-react';

function useInView(threshold = 0.1) {
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

const steps = [
  {
    num: '01',
    icon: Link2,
    title: 'Connect',
    body: 'Bring your financial information together in one place — accounts, income, and expenses.',
  },
  {
    num: '02',
    icon: Eye,
    title: 'Understand',
    body: 'See your full financial picture clearly. Know exactly where you stand and how things are changing.',
  },
  {
    num: '03',
    icon: MousePointerClick,
    title: 'Act',
    body: 'Make smarter decisions based on your actual situation — not guesswork.',
  },
  {
    num: '04',
    icon: TrendingUp,
    title: 'Grow',
    body: 'Track your goals, build better habits, and watch your financial future take shape.',
  },
];

export default function HowItWorks() {
  const [ref, inView] = useInView(0.08);
  const [active, setActive] = useState(0);

  return (
    <section
      id="how-it-works"
      ref={ref}
      className="section-py"
      style={{ background: 'var(--bg-subtle)' }}
    >
      <div className="container-main">
        {/* Header */}
        <div style={{
          textAlign: 'center',
          maxWidth: '520px',
          marginInline: 'auto',
          marginBottom: '3.5rem',
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(16px)',
          transition: 'opacity 0.6s ease, transform 0.6s var(--ease-out)',
        }}>
          <p className="label-sm" style={{ marginBottom: '0.75rem' }}>How it works</p>
          <h2 className="heading-lg">From setup to financial clarity in four steps.</h2>
        </div>

        {/* Steps */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '0',
            position: 'relative',
          }}
          className="steps-grid"
        >
          {/* Connecting line */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: '28px',
              left: 'calc(12.5% + 20px)',
              right: 'calc(12.5% + 20px)',
              height: '1px',
              background: 'var(--border)',
              zIndex: 0,
            }}
            className="steps-connector"
          />

          {steps.map((step, i) => {
            const Icon = step.icon;
            const isActive = active === i;
            return (
              <div
                key={step.num}
                onClick={() => setActive(i)}
                style={{
                  padding: '0 1.25rem 2rem',
                  opacity: inView ? 1 : 0,
                  transform: inView ? 'translateY(0)' : 'translateY(20px)',
                  transition: `opacity 0.55s ease ${i * 0.1}s, transform 0.55s var(--ease-out) ${i * 0.1}s`,
                  cursor: 'pointer',
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                {/* Step node */}
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: isActive ? 'var(--accent)' : 'var(--bg-surface)',
                  border: `1.5px solid ${isActive ? 'var(--accent)' : 'var(--border-strong)'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: isActive ? '#fff' : 'var(--fg-secondary)',
                  marginBottom: '1.25rem',
                  transition: 'background 0.25s ease, border-color 0.25s ease, color 0.25s ease, transform 0.2s var(--ease-spring)',
                  transform: isActive ? 'scale(1.08)' : 'scale(1)',
                  boxShadow: isActive ? '0 6px 20px rgb(26 158 92 / 0.25)' : 'none',
                }}>
                  <Icon size={20} />
                </div>

                <span style={{
                  display: 'block',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  color: isActive ? 'var(--accent)' : 'var(--fg-placeholder)',
                  marginBottom: '0.375rem',
                  transition: 'color 0.25s ease',
                }}>
                  {step.num}
                </span>

                <h3 style={{
                  fontSize: '1.0625rem',
                  fontWeight: 700,
                  color: isActive ? 'var(--fg-primary)' : 'var(--fg-secondary)',
                  letterSpacing: '-0.015em',
                  marginBottom: '0.5rem',
                  transition: 'color 0.25s ease',
                }}>
                  {step.title}
                </h3>

                <p style={{
                  fontSize: '0.85rem',
                  color: 'var(--fg-muted)',
                  lineHeight: 1.65,
                  transition: 'opacity 0.25s ease',
                  opacity: isActive ? 1 : 0.75,
                }}>
                  {step.body}
                </p>

                {/* Active underline */}
                <div style={{
                  position: 'absolute',
                  bottom: '0',
                  left: '1.25rem',
                  right: '1.25rem',
                  height: '2px',
                  borderRadius: '1px',
                  background: 'var(--accent)',
                  transform: isActive ? 'scaleX(1)' : 'scaleX(0)',
                  transformOrigin: 'left',
                  transition: 'transform 0.3s var(--ease-out)',
                }} />
              </div>
            );
          })}
        </div>

        {/* Step nav dots */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '6px',
          marginTop: '2rem',
          opacity: inView ? 1 : 0,
          transition: 'opacity 0.6s ease 0.4s',
        }}>
          {steps.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Go to step ${i + 1}`}
              style={{
                width: active === i ? '24px' : '8px',
                height: '8px',
                borderRadius: '4px',
                background: active === i ? 'var(--accent)' : 'var(--border-strong)',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                transition: 'width 0.3s var(--ease-out), background 0.25s ease',
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .steps-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 0 !important;
          }
          .steps-connector {
            display: none !important;
          }
        }
        @media (max-width: 480px) {
          .steps-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
