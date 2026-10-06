'use client';

import { useEffect, useRef, useState } from 'react';
import { TrendingUp, TrendingDown, PiggyBank, Target, Wallet } from 'lucide-react';

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

/* ── Donut chart (SVG) ─────────────────────────────────────── */
function DonutChart({ data, animated }) {
  const [drawn, setDrawn] = useState(false);
  useEffect(() => {
    if (animated) {
      const t = setTimeout(() => setDrawn(true), 400);
      return () => clearTimeout(t);
    } else {
      setDrawn(true);
    }
  }, [animated]);

  const size = 140;
  const r = 52;
  const cx = size / 2;
  const cy = size / 2;
  const circumference = 2 * Math.PI * r;
  // Gap between segments in px
  const GAP = 3;

  const total = data.reduce((s, d) => s + d.value, 0);
  let cumulativeFraction = 0;

  const slices = data.map((d) => {
    const fraction = d.value / total;
    const dashLen  = Math.max(0, fraction * circumference - GAP);
    const gapLen   = circumference - dashLen;
    const rotation = cumulativeFraction * 360 - 90;
    cumulativeFraction += fraction;
    return { ...d, dashLen, gapLen, rotation };
  });

  return (
    <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
        {/* Track ring */}
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--border)" strokeWidth="18" />
        {slices.map((s, i) => (
          <circle
            key={s.label}
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke={s.color}
            strokeWidth="18"
            strokeDasharray={`${drawn ? s.dashLen : 0} ${circumference}`}
            strokeLinecap="butt"
            transform={`rotate(${s.rotation} ${cx} ${cy})`}
            style={{
              transition: drawn
                ? `stroke-dasharray 0.9s cubic-bezier(0.16,1,0.3,1) ${i * 0.1}s`
                : 'none',
            }}
          />
        ))}
        {/* Center text */}
        <text x={cx} y={cy - 7} textAnchor="middle" fontSize="9" fontWeight="700" fill="var(--fg-muted)" letterSpacing="0.06em" textDecoration="none">SPENDING</text>
        <text x={cx} y={cy + 10} textAnchor="middle" fontSize="15" fontWeight="800" fill="var(--fg-primary)" letterSpacing="-0.03em">₹42K</text>
      </svg>
    </div>
  );
}

const spendingCategories = [
  { label: 'Housing',   value: 15000, color: '#1a9e5c', percent: 36 },
  { label: 'Food',      value: 8500,  color: '#4db87a', percent: 20 },
  { label: 'Transport', value: 5200,  color: '#2563eb', percent: 12 },
  { label: 'Shopping',  value: 7800,  color: '#d97706', percent: 19 },
  { label: 'Other',     value: 5500,  color: '#8b5cf6', percent: 13 },
];

const summaryCards = [
  {
    icon: Wallet,
    label: 'Total Balance',
    value: '₹2,45,680',
    change: '+12.4%',
    positive: true,
    sub: 'vs last month',
  },
  {
    icon: TrendingUp,
    label: 'Income',
    value: '₹85,000',
    change: '+5.2%',
    positive: true,
    sub: 'this month',
  },
  {
    icon: TrendingDown,
    label: 'Spending',
    value: '₹42,000',
    change: '−8.1%',
    positive: true,
    sub: 'vs last month',
  },
  {
    icon: PiggyBank,
    label: 'Savings',
    value: '₹43,000',
    change: '+18.3%',
    positive: true,
    sub: 'this month',
  },
];

export default function FinancialOverview() {
  const [ref, inView] = useInView(0.08);
  const [barsGrown, setBarsGrown] = useState(false);

  useEffect(() => {
    if (inView) {
      const t = setTimeout(() => setBarsGrown(true), 300);
      return () => clearTimeout(t);
    }
  }, [inView]);

  return (
    <section
      id="overview"
      ref={ref}
      className="section-py"
      style={{ background: 'var(--bg-subtle)' }}
    >
      <div className="container-main">
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '2.5rem',
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(16px)',
          transition: 'opacity 0.6s ease, transform 0.6s var(--ease-out)',
        }}>
          <div>
            <p className="label-sm" style={{ marginBottom: '0.75rem' }}>Financial overview</p>
            <h2 className="heading-lg">One clear picture of your money.</h2>
          </div>
          <span style={{
            fontSize: '0.8rem',
            color: 'var(--fg-muted)',
            padding: '4px 12px',
            background: 'var(--bg-surface)',
            border: '1px solid var(--border)',
            borderRadius: '999px',
          }}>
            October 2026
          </span>
        </div>

        {/* Summary cards row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1rem',
            marginBottom: '1.5rem',
          }}
          className="overview-cards"
        >
          {summaryCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <div
                key={card.label}
                className="card card-hover"
                style={{
                  padding: '1.25rem',
                  opacity: inView ? 1 : 0,
                  transform: inView ? 'translateY(0)' : 'translateY(16px)',
                  transition: `opacity 0.55s ease ${i * 0.08}s, transform 0.55s var(--ease-out) ${i * 0.08}s`,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.875rem' }}>
                  <div style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '8px',
                    background: 'var(--accent-light)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--accent)',
                  }}>
                    <Icon size={16} />
                  </div>
                  <span style={{
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    color: card.positive ? 'var(--accent)' : '#e05454',
                    background: card.positive ? 'var(--accent-light)' : '#fef2f2',
                    border: `1px solid ${card.positive ? 'rgba(26,158,92,0.2)' : 'rgba(224,84,84,0.2)'}`,
                    padding: '2px 7px',
                    borderRadius: '999px',
                  }}>
                    {card.change}
                  </span>
                </div>
                <p style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--fg-muted)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                  {card.label}
                </p>
                <p style={{ fontSize: '1.375rem', fontWeight: 700, color: 'var(--fg-primary)', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '0.2rem' }}>
                  {card.value}
                </p>
                <p style={{ fontSize: '0.75rem', color: 'var(--fg-muted)' }}>{card.sub}</p>
              </div>
            );
          })}
        </div>

        {/* Bottom row: spending chart + goal card */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.5fr 1fr',
            gap: '1rem',
          }}
          className="overview-bottom"
        >
          {/* Spending breakdown */}
          <div
            className="card"
            style={{
              padding: '1.5rem',
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0)' : 'translateY(16px)',
              transition: 'opacity 0.6s ease 0.3s, transform 0.6s var(--ease-out) 0.3s',
            }}
          >
            <p style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--fg-muted)', letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: '1.25rem' }}>
              Spending breakdown
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
              {/* Donut */}
              <DonutChart data={spendingCategories} animated={inView} />

              {/* Categories */}
              <div style={{ flex: 1, minWidth: '160px', display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                {spendingCategories.map((cat) => (
                  <div key={cat.label}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ width: '8px', height: '8px', borderRadius: '2px', background: cat.color, display: 'inline-block', flexShrink: 0 }} />
                        <span style={{ fontSize: '0.78rem', color: 'var(--fg-secondary)', fontWeight: 500 }}>{cat.label}</span>
                      </div>
                      <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--fg-primary)' }}>
                        {cat.percent}%
                      </span>
                    </div>
                    <div style={{ height: '4px', borderRadius: '2px', background: 'var(--bg-subtle)', overflow: 'hidden' }}>
                      <div style={{
                        height: '100%',
                        width: `${cat.percent}%`,
                        borderRadius: '2px',
                        background: cat.color,
                        transform: barsGrown ? 'scaleX(1)' : 'scaleX(0)',
                        transformOrigin: 'left',
                        transition: `transform 0.8s cubic-bezier(0.16,1,0.3,1) ${spendingCategories.indexOf(cat) * 0.07 + 0.1}s`,
                      }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Goal card */}
          <div
            className="card"
            style={{
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0)' : 'translateY(16px)',
              transition: 'opacity 0.6s ease 0.38s, transform 0.6s var(--ease-out) 0.38s',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.25rem' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '7px',
                background: '#fffbeb',
                border: '1px solid rgba(217,119,6,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#d97706',
              }}>
                <Target size={15} />
              </div>
              <p style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--fg-muted)', letterSpacing: '0.07em', textTransform: 'uppercase' }}>
                Savings goal
              </p>
            </div>

            <p style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--fg-primary)', marginBottom: '0.25rem' }}>
              Emergency fund
            </p>
            <p style={{ fontSize: '0.8rem', color: 'var(--fg-muted)', marginBottom: '1.25rem' }}>
              Target: ₹2,00,000
            </p>

            {/* Progress arc label */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '0.5rem',
            }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--fg-muted)' }}>Progress</span>
              <span style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--fg-primary)', letterSpacing: '-0.02em' }}>72%</span>
            </div>

            {/* Progress bar */}
            <div style={{ height: '8px', borderRadius: '4px', background: 'var(--bg-subtle)', overflow: 'hidden', marginBottom: '1rem' }}>
              <div style={{
                height: '100%',
                width: '72%',
                borderRadius: '4px',
                background: 'linear-gradient(90deg, var(--accent), var(--accent-mid))',
                transform: barsGrown ? 'scaleX(1)' : 'scaleX(0)',
                transformOrigin: 'left',
                transition: 'transform 1s cubic-bezier(0.16,1,0.3,1) 0.5s',
              }} />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <div>
                <p style={{ fontSize: '0.7rem', color: 'var(--fg-muted)', marginBottom: '2px' }}>Saved</p>
                <p style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--accent)', letterSpacing: '-0.02em' }}>₹1,44,000</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: '0.7rem', color: 'var(--fg-muted)', marginBottom: '2px' }}>Remaining</p>
                <p style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--fg-primary)', letterSpacing: '-0.02em' }}>₹56,000</p>
              </div>
            </div>

            <div style={{
              marginTop: 'auto',
              padding: '0.75rem',
              background: 'var(--accent-light)',
              border: '1px solid rgba(26,158,92,0.15)',
              borderRadius: 'var(--radius-md)',
            }}>
              <p style={{ fontSize: '0.78rem', color: 'var(--accent-dark)', fontWeight: 500, lineHeight: 1.4 }}>
                At your current savings rate, you'll reach your goal in <strong>~3 months</strong>.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .overview-cards {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .overview-bottom {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 540px) {
          .overview-cards {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
