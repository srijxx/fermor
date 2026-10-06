'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowRight, TrendingDown, PiggyBank, Target, Sparkles } from 'lucide-react';

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

const smallCards = [
  {
    icon: TrendingDown,
    label: 'Spending',
    stat: '8% lower',
    sub: 'than last month',
    color: 'var(--accent)',
    bg: 'var(--accent-light)',
    border: 'rgba(26,158,92,0.2)',
  },
  {
    icon: PiggyBank,
    label: 'Savings',
    stat: '₹43,000',
    sub: 'saved this month',
    color: '#2563eb',
    bg: '#eff6ff',
    border: 'rgba(37,99,235,0.2)',
  },
  {
    icon: Target,
    label: 'Goal',
    stat: '72%',
    sub: 'of your target reached',
    color: '#d97706',
    bg: '#fffbeb',
    border: 'rgba(217,119,6,0.2)',
  },
];

export default function NextBestMove() {
  const [ref, inView] = useInView(0.1);

  return (
    <section
      id="insights"
      ref={ref}
      className="section-py"
      style={{ background: 'var(--bg-base)' }}
    >
      <div className="container-main">
        {/* Header */}
        <div
          style={{
            maxWidth: '600px',
            marginBottom: '3rem',
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 0.6s ease, transform 0.6s var(--ease-out)',
          }}
        >
          <p className="label-sm" style={{ marginBottom: '0.75rem' }}>Your next best move</p>
          <h2 className="heading-lg" style={{ marginBottom: '1rem' }}>
            Don't just see your finances.<br />Know what to do next.
          </h2>
          <p className="body-lg">
            Fermor surfaces the one thing most worth your attention — and tells you exactly what action to take.
          </p>
        </div>

        {/* Main layout: big insight card + small cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.6fr 1fr',
            gap: '1.25rem',
            alignItems: 'start',
          }}
          className="nbm-grid"
        >
          {/* ── Big insight card ── */}
          <div
            style={{
              background: 'var(--dark-bg)',
              border: '1px solid var(--dark-border)',
              borderRadius: 'var(--radius-xl)',
              padding: '2rem',
              position: 'relative',
              overflow: 'hidden',
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.6s ease 0.1s, transform 0.6s var(--ease-out) 0.1s',
            }}
          >
            {/* Accent glow */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                bottom: '-60px',
                right: '-60px',
                width: '240px',
                height: '240px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(26,158,92,0.12) 0%, transparent 70%)',
                pointerEvents: 'none',
              }}
            />

            {/* Label */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.5rem' }}>
              <div style={{
                width: '28px',
                height: '28px',
                borderRadius: '6px',
                background: 'rgba(26,158,92,0.15)',
                border: '1px solid rgba(26,158,92,0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Sparkles size={13} color="var(--accent)" />
              </div>
              <span style={{
                fontSize: '0.7rem',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--accent-mid)',
              }}>
                Your next best move
              </span>
            </div>

            {/* Main insight */}
            <h3 style={{
              fontSize: 'clamp(1.25rem, 2.5vw, 1.625rem)',
              fontWeight: 700,
              color: 'var(--dark-fg)',
              letterSpacing: '-0.025em',
              lineHeight: 1.25,
              marginBottom: '0.875rem',
            }}>
              Your spending is down 12% this month.
            </h3>

            <p style={{
              fontSize: '0.9rem',
              color: 'var(--dark-muted)',
              lineHeight: 1.65,
              marginBottom: '1.5rem',
              maxWidth: '420px',
            }}>
              You're spending less while maintaining your savings pace. That's a meaningful shift — and you can put the difference to work.
            </p>

            {/* Suggested action box */}
            <div style={{
              background: 'var(--dark-surface)',
              border: '1px solid var(--dark-border)',
              borderLeft: '3px solid var(--accent)',
              borderRadius: 'var(--radius-md)',
              padding: '1rem 1.25rem',
              marginBottom: '1.5rem',
            }}>
              <p style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--accent-mid)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                Suggested action
              </p>
              <p style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--dark-fg)', letterSpacing: '-0.015em' }}>
                Move ₹5,000 toward your savings goal.
              </p>
            </div>

            {/* Micro stats row */}
            <div style={{
              display: 'flex',
              gap: '1.5rem',
              marginBottom: '1.75rem',
              flexWrap: 'wrap',
            }}>
              {[
                { label: 'This month vs last', value: '−12%', positive: true },
                { label: 'Projected savings', value: '₹48,000', positive: true },
                { label: 'Goal completion', value: '72%', positive: true },
              ].map((m) => (
                <div key={m.label}>
                  <p style={{ fontSize: '0.68rem', color: 'var(--dark-muted)', marginBottom: '2px', letterSpacing: '0.04em' }}>{m.label}</p>
                  <p style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--accent)', letterSpacing: '-0.02em' }}>{m.value}</p>
                </div>
              ))}
            </div>

            <a
              href="#overview"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '0.65rem 1.25rem',
                background: 'var(--accent)',
                color: '#fff',
                fontSize: '0.875rem',
                fontWeight: 600,
                borderRadius: 'var(--radius-md)',
                textDecoration: 'none',
                transition: 'background 0.18s ease, transform 0.15s var(--ease-spring)',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--accent-dark)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              View insight
              <ArrowRight size={14} />
            </a>
          </div>

          {/* ── Small insight cards column ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {smallCards.map((card, i) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.label}
                  style={{
                    background: 'var(--bg-surface)',
                    border: `1px solid ${card.border}`,
                    borderRadius: 'var(--radius-lg)',
                    padding: '1.25rem',
                    opacity: inView ? 1 : 0,
                    transform: inView ? 'translateY(0)' : 'translateY(16px)',
                    transition: `opacity 0.55s ease ${0.15 + i * 0.1}s, transform 0.55s var(--ease-out) ${0.15 + i * 0.1}s, box-shadow 0.2s ease`,
                    cursor: 'default',
                  }}
                  onMouseEnter={e => e.currentTarget.style.boxShadow = 'var(--shadow-md)'}
                  onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                    <div style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '8px',
                      background: card.bg,
                      border: `1px solid ${card.border}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: card.color,
                    }}>
                      <Icon size={16} />
                    </div>
                    <span style={{
                      fontSize: '0.68rem',
                      fontWeight: 700,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: 'var(--fg-muted)',
                    }}>
                      {card.label}
                    </span>
                  </div>
                  <p style={{
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    color: card.color,
                    letterSpacing: '-0.03em',
                    lineHeight: 1,
                    marginBottom: '0.25rem',
                  }}>
                    {card.stat}
                  </p>
                  <p style={{
                    fontSize: '0.78rem',
                    color: 'var(--fg-muted)',
                  }}>
                    {card.sub}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .nbm-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
