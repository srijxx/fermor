'use client';

import { Eye, Lightbulb, Zap, TrendingUp } from 'lucide-react';

const values = [
  {
    icon: <Eye size={18} />,
    title: 'Clear financial picture',
    desc: 'See every rupee, all in one place.',
  },
  {
    icon: <Lightbulb size={18} />,
    title: 'Smarter decisions',
    desc: 'Insights that actually tell you what to do.',
  },
  {
    icon: <Zap size={18} />,
    title: 'Goal tracking',
    desc: 'Know exactly how close you are.',
  },
  {
    icon: <TrendingUp size={18} />,
    title: 'Better financial habits',
    desc: 'Build consistency over time.',
  },
];

export default function ValueStrip() {
  return (
    <section
      aria-label="Product value points"
      style={{
        background: 'var(--dark-bg)',
        borderTop: '1px solid var(--dark-border)',
        borderBottom: '1px solid var(--dark-border)',
        padding: '0',
      }}
    >
      <div className="container-main">
        {/* Top label */}
        <div
          style={{
            paddingTop: '3rem',
            paddingBottom: '1.75rem',
            textAlign: 'center',
          }}
        >
          <p style={{
            fontSize: '0.78rem',
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--accent-mid)',
            marginBottom: '0.625rem',
          }}>
            Why Fermor
          </p>
          <p style={{
            fontSize: 'clamp(1.125rem, 2vw, 1.375rem)',
            fontWeight: 600,
            color: 'var(--dark-fg)',
            letterSpacing: '-0.015em',
          }}>
            Everything you need to understand your financial life.
          </p>
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: 'var(--dark-border)', marginBottom: '0' }} />

        {/* Value grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
          }}
          className="value-grid"
        >
          {values.map((item, i) => (
            <div
              key={item.title}
              style={{
                padding: '1.75rem 1.5rem',
                borderRight: i < values.length - 1 ? '1px solid var(--dark-border)' : 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.625rem',
                transition: 'background 0.2s ease',
                cursor: 'default',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--dark-surface)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  background: 'rgba(26,158,92,0.12)',
                  border: '1px solid rgba(26,158,92,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--accent)',
                  marginBottom: '0.25rem',
                }}
              >
                {item.icon}
              </div>
              <p style={{
                fontSize: '0.9rem',
                fontWeight: 600,
                color: 'var(--dark-fg)',
                letterSpacing: '-0.01em',
              }}>
                {item.title}
              </p>
              <p style={{
                fontSize: '0.82rem',
                color: 'var(--dark-muted)',
                lineHeight: 1.5,
              }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom border close */}
        <div style={{ height: '1px', background: 'var(--dark-border)' }} />
      </div>

      <style>{`
        @media (max-width: 768px) {
          .value-grid {
            grid-template-columns: 1fr 1fr !important;
          }
          .value-grid > div:nth-child(2) {
            border-right: none !important;
          }
          .value-grid > div:nth-child(1),
          .value-grid > div:nth-child(2) {
            border-bottom: 1px solid var(--dark-border);
          }
        }
        @media (max-width: 480px) {
          .value-grid {
            grid-template-columns: 1fr !important;
          }
          .value-grid > div {
            border-right: none !important;
            border-bottom: 1px solid var(--dark-border) !important;
          }
          .value-grid > div:last-child {
            border-bottom: none !important;
          }
        }
      `}</style>
    </section>
  );
}
