'use client';

import { useEffect, useRef, useState } from 'react';
import { Search, BarChart2, MousePointerClick, Sprout } from 'lucide-react';

const steps = [
  {
    tag: 'SEE',
    icon: Search,
    headline: 'Know where your money goes.',
    body: 'Get a complete picture of your income, spending, and savings — organized automatically so nothing slips through.',
    color: 'var(--accent)',
    bg: 'var(--accent-light)',
    border: 'rgba(26,158,92,0.25)',
  },
  {
    tag: 'UNDERSTAND',
    icon: BarChart2,
    headline: 'Turn financial data into useful insights.',
    body: 'Fermor interprets your numbers and explains what they mean — not just what happened, but why it matters.',
    color: '#2563eb',
    bg: '#eff6ff',
    border: 'rgba(37,99,235,0.2)',
  },
  {
    tag: 'ACT',
    icon: MousePointerClick,
    headline: 'Make informed financial decisions.',
    body: 'When you know your situation clearly, every decision gets easier. Fermor points you toward the right next move.',
    color: '#d97706',
    bg: '#fffbeb',
    border: 'rgba(217,119,6,0.2)',
  },
  {
    tag: 'GROW',
    icon: Sprout,
    headline: 'Build better financial habits over time.',
    body: 'Track progress toward your goals, celebrate wins, and keep moving forward — month after month.',
    color: '#7c3aed',
    bg: '#f5f3ff',
    border: 'rgba(124,58,237,0.2)',
  },
];

function useInView(threshold = 0.15) {
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

function StepCard({ step, index, inView }) {
  const Icon = step.icon;
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? step.bg : 'var(--bg-surface)',
        border: `1px solid ${hovered ? step.border : 'var(--border)'}`,
        borderRadius: 'var(--radius-lg)',
        padding: '1.75rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        cursor: 'default',
        opacity: inView ? 1 : 0,
        transition: `opacity 0.55s ease ${index * 0.1}s, transform 0.55s var(--ease-out) ${index * 0.1}s, background 0.22s ease, border-color 0.22s ease, box-shadow 0.22s ease`,
        boxShadow: hovered ? '0 12px 32px rgb(0 0 0 / 0.09)' : 'var(--shadow-sm)',
        position: 'relative',
        overflow: 'hidden',
        /* Two-layer transform: entrance + hover lift */
        transform: !inView
          ? 'translateY(20px)'
          : hovered
          ? 'translateY(-4px)'
          : 'translateY(0)',
      }}
    >
      {/* Step number watermark */}
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '1rem',
          right: '1.25rem',
          fontSize: '3.5rem',
          fontWeight: 800,
          color: step.color,
          opacity: hovered ? 0.07 : 0.04,
          lineHeight: 1,
          letterSpacing: '-0.04em',
          transition: 'opacity 0.22s ease',
          userSelect: 'none',
          pointerEvents: 'none',
        }}
      >
        {String(index + 1).padStart(2, '0')}
      </span>

      {/* Tag */}
      <span style={{
        display: 'inline-block',
        fontSize: '0.68rem',
        fontWeight: 700,
        letterSpacing: '0.1em',
        color: step.color,
        background: step.bg,
        border: `1px solid ${step.border}`,
        borderRadius: '999px',
        padding: '3px 10px',
        alignSelf: 'flex-start',
      }}>
        {step.tag}
      </span>

      {/* Icon */}
      <div
        style={{
          width: '44px',
          height: '44px',
          borderRadius: '10px',
          background: step.bg,
          border: `1px solid ${step.border}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: step.color,
          transition: 'transform 0.3s var(--ease-spring)',
          transform: hovered ? 'scale(1.1) rotate(-3deg)' : 'scale(1) rotate(0deg)',
        }}
      >
        <Icon size={20} />
      </div>

      {/* Content */}
      <div>
        <h3 style={{
          fontSize: '1rem',
          fontWeight: 700,
          color: 'var(--fg-primary)',
          letterSpacing: '-0.015em',
          marginBottom: '0.5rem',
          lineHeight: 1.3,
        }}>
          {step.headline}
        </h3>
        <p style={{
          fontSize: '0.875rem',
          color: 'var(--fg-secondary)',
          lineHeight: 1.65,
        }}>
          {step.body}
        </p>
      </div>
    </div>
  );
}

export default function ClaritySection() {
  const [ref, inView] = useInView(0.1);

  return (
    <section
      id="product"
      ref={ref}
      className="section-py"
      style={{ background: 'var(--bg-subtle)' }}
    >
      <div className="container-main">
        {/* Header */}
        <div
          style={{
            maxWidth: '560px',
            marginBottom: '3rem',
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 0.6s ease, transform 0.6s var(--ease-out)',
          }}
        >
          <p className="label-sm" style={{ marginBottom: '0.75rem' }}>From numbers to clarity</p>
          <h2 className="heading-lg" style={{ marginBottom: '1rem' }}>
            Financial clarity starts with knowing where you stand.
          </h2>
          <p className="body-lg">
            Fermor turns raw financial information into something you can actually use — step by step.
          </p>
        </div>

        {/* Step flow label */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '1.75rem',
            flexWrap: 'wrap',
            opacity: inView ? 1 : 0,
            transition: 'opacity 0.6s ease 0.1s',
          }}
        >
          {steps.map((s, i) => (
            <span key={s.tag} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                color: s.color,
                letterSpacing: '0.06em',
              }}>
                {s.tag}
              </span>
              {i < steps.length - 1 && (
                <span style={{ fontSize: '0.75rem', color: 'var(--fg-placeholder)' }}>→</span>
              )}
            </span>
          ))}
        </div>

        {/* Cards grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1rem',
          }}
          className="clarity-grid"
        >
          {steps.map((step, i) => (
            <StepCard key={step.tag} step={step} index={i} inView={inView} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .clarity-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 540px) {
          .clarity-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
