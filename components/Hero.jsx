'use client';

import { useState, useEffect, useRef } from 'react';
import { ArrowRight, TrendingUp, TrendingDown, CheckCircle2 } from 'lucide-react';

/* ── Animated counter hook ─────────────────────────────────────── */
function useCountUp(target, duration = 1200, started = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!started) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(ease * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, target, duration]);
  return value;
}

/* ── Mini SVG sparkline ─────────────────────────────────────────── */
function Sparkline({ points, color = '#1a9e5c', animated = false }) {
  const lineRef = useRef(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => setDrawn(true), 600);
      return () => clearTimeout(timer);
    } else {
      setDrawn(true);
    }
  }, [animated]);

  // Use a fixed viewBox that fills proportionally; SVG will scale via CSS
  const vw = 360, vh = 56;
  const pad = 4;
  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = max - min || 1;
  const coords = points.map((p, i) => ({
    x: pad + (i / (points.length - 1)) * (vw - pad * 2),
    y: pad + (1 - (p - min) / range) * (vh - pad * 2),
  }));
  const d = coords.map((c, i) => `${i === 0 ? 'M' : 'L'} ${c.x.toFixed(1)} ${c.y.toFixed(1)}`).join(' ');
  const fillPath = d + ` L ${vw - pad} ${vh} L ${pad} ${vh} Z`;
  const pathLength = 800;

  return (
    <svg
      viewBox={`0 0 ${vw} ${vh}`}
      preserveAspectRatio="none"
      style={{ width: '100%', height: '56px', display: 'block' }}
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="sparkFillHero" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.15" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={fillPath} fill="url(#sparkFillHero)" />
      <path
        ref={lineRef}
        d={d}
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        strokeDasharray={pathLength}
        strokeDashoffset={drawn ? 0 : pathLength}
        style={{ transition: drawn ? 'stroke-dashoffset 1.1s cubic-bezier(0.16,1,0.3,1)' : 'none' }}
      />
    </svg>
  );
}

/* ── Bar chart for income vs spending ──────────────────────────── */
function MiniBarChart({ animated }) {
  const [grow, setGrow] = useState(false);
  useEffect(() => {
    if (animated) {
      const t = setTimeout(() => setGrow(true), 800);
      return () => clearTimeout(t);
    } else {
      setGrow(true);
    }
  }, [animated]);

  const bars = [
    { label: 'Income',  value: 85, color: '#1a9e5c' },
    { label: 'Spending', value: 49.4, color: '#e8e8e4' },
    { label: 'Savings',  value: 50.6, color: '#4db87a' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      {bars.map((bar) => (
        <div key={bar.label} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '0.65rem', fontWeight: 600, color: 'var(--fg-muted)', width: '46px', flexShrink: 0, letterSpacing: '0.04em' }}>
            {bar.label}
          </span>
          <div style={{ flex: 1, height: '6px', borderRadius: '3px', background: 'var(--bg-subtle)', overflow: 'hidden' }}>
            <div
              style={{
                height: '100%',
                width: `${bar.value}%`,
                borderRadius: '3px',
                background: bar.color,
                transform: grow ? 'scaleX(1)' : 'scaleX(0)',
                transformOrigin: 'left',
                transition: grow ? `transform 0.9s cubic-bezier(0.16,1,0.3,1) ${bars.indexOf(bar) * 0.1 + 0.1}s` : 'none',
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Main Hero ──────────────────────────────────────────────────── */
export default function Hero() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const balance = useCountUp(245680, 1400, visible);
  const income  = useCountUp(85000,  1100, visible);
  const spending = useCountUp(42000, 1100, visible);
  const savings  = useCountUp(43000, 1100, visible);

  const fmt = (n) => '₹' + n.toLocaleString('en-IN');

  const sparkData = [42, 55, 48, 62, 58, 71, 67, 78, 72, 85, 80, 91];

  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        paddingTop: '64px',
        background: 'var(--bg-base)',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background grid pattern */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(var(--border) 1px, transparent 1px),
            linear-gradient(90deg, var(--border) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
          opacity: 0.4,
          maskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, black 30%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, black 30%, transparent 100%)',
        }}
      />

      {/* Accent glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '20%',
          right: '5%',
          width: '480px',
          height: '480px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(26,158,92,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div className="container-main" style={{ width: '100%', paddingBlock: '5rem 4rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '4rem',
          alignItems: 'center',
        }}
          className="hero-grid"
        >

          {/* ── Left column: copy ───────────────────────────── */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.7s var(--ease-out), transform 0.7s var(--ease-out)',
            }}
          >
            {/* Pill badge */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '5px 12px',
                background: 'var(--accent-light)',
                border: '1px solid rgba(26,158,92,0.2)',
                borderRadius: '999px',
                marginBottom: '1.75rem',
              }}
            >
              <span className="status-dot" />
              <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--accent-dark)', letterSpacing: '0.02em' }}>
                Your money, your clarity
              </span>
            </div>

            {/* Headline */}
            <h1
              className="heading-display"
              style={{ marginBottom: '1.25rem', maxWidth: '520px' }}
            >
              Your money,<br />
              <span style={{ color: 'var(--accent)' }}>made simple.</span>
            </h1>

            {/* Body */}
            <p
              className="body-lg"
              style={{
                maxWidth: '440px',
                marginBottom: '2.25rem',
                opacity: visible ? 1 : 0,
                transition: 'opacity 0.7s ease 0.15s',
              }}
            >
              Understand where you stand, make better decisions, and build a stronger financial future.
            </p>

            {/* CTAs */}
            <div
              id="hero-cta"
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.875rem',
                marginBottom: '2.5rem',
                opacity: visible ? 1 : 0,
                transition: 'opacity 0.7s ease 0.25s',
              }}
            >
              <a href="#final-cta" className="btn-primary" style={{ fontSize: '1rem', padding: '0.8rem 1.625rem' }}>
                Get started
                <ArrowRight size={16} />
              </a>
              <a href="#how-it-works" className="btn-secondary" style={{ fontSize: '1rem', padding: '0.8rem 1.625rem' }}>
                See how it works
              </a>
            </div>

            {/* Product feature points — no unverified claims */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1.25rem',
                opacity: visible ? 1 : 0,
                transition: 'opacity 0.7s ease 0.35s',
              }}
            >
              {[
                'Clear financial picture',
                'Actionable insights',
                'Built around your goals',
              ].map((point) => (
                <div key={point} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CheckCircle2 size={14} color="var(--accent)" aria-hidden="true" />
                  <span style={{ fontSize: '0.82rem', color: 'var(--fg-muted)', fontWeight: 500 }}>{point}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right column: dashboard card ─────────────────── */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(28px)',
              transition: 'opacity 0.8s var(--ease-out) 0.2s, transform 0.8s var(--ease-out) 0.2s',
            }}
          >
            <DashboardCard
              balance={balance}
              income={income}
              spending={spending}
              savings={savings}
              fmt={fmt}
              sparkData={sparkData}
              animated={visible}
            />
          </div>
        </div>
      </div>

      {/* Mobile hero grid override */}
      <style>{`
        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
        }
      `}</style>
    </section>
  );
}

/* ── Dashboard card component ───────────────────────────────────── */
function DashboardCard({ balance, income, spending, savings, fmt, sparkData, animated }) {
  return (
    <div
      style={{
        background: 'var(--bg-surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-xl)',
        boxShadow: '0 24px 64px rgb(0 0 0 / 0.10), 0 4px 16px rgb(0 0 0 / 0.06)',
        padding: '1.5rem',
        maxWidth: '440px',
        marginInline: 'auto',
      }}
    >
      {/* Card header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
        <div>
          <p style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--fg-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '2px' }}>
            Financial Snapshot
          </p>
          <p style={{ fontSize: '0.8rem', color: 'var(--fg-muted)' }}>October 2026</p>
        </div>
        {/* "Sample overview" badge — replaces "Live" to avoid implying real data */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
          padding: '4px 10px',
          background: 'var(--bg-subtle)',
          border: '1px solid var(--border)',
          borderRadius: '999px',
        }}>
          <span style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: 'var(--fg-placeholder)',
            flexShrink: 0,
          }} aria-hidden="true" />
          <span style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--fg-muted)' }}>Sample overview</span>
        </div>
      </div>

      {/* Balance */}
      <div style={{ marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '10px', marginBottom: '4px' }}>
          <span className="stat-num-lg">{fmt(balance)}</span>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '3px',
            padding: '3px 8px',
            background: 'var(--accent-light)',
            borderRadius: '999px',
            marginBottom: '4px',
          }}>
            <TrendingUp size={11} color="var(--accent)" />
            <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--accent)' }}>+12.4%</span>
          </div>
        </div>
        <p style={{ fontSize: '0.78rem', color: 'var(--fg-muted)' }}>Total balance · this month</p>
      </div>

      {/* Sparkline */}
      <div style={{
        marginBottom: '1.25rem',
        background: 'var(--bg-subtle)',
        borderRadius: 'var(--radius-md)',
        padding: '4px 0 0',
        overflow: 'hidden',
      }}>
        <Sparkline points={sparkData} animated={animated} />
      </div>

      {/* Stat row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: '0.75rem',
        marginBottom: '1.25rem',
      }}>
        <StatMini
          label="Income"
          value={fmt(income)}
          icon={<TrendingUp size={12} color="var(--accent)" />}
          positive
        />
        <StatMini
          label="Spending"
          value={fmt(spending)}
          icon={<TrendingDown size={12} color="#e05454" />}
          negative
        />
        <StatMini
          label="Savings"
          value={fmt(savings)}
          icon={<TrendingUp size={12} color="var(--accent)" />}
          positive
        />
      </div>

      {/* Bar chart */}
      <div style={{
        background: 'var(--bg-subtle)',
        borderRadius: 'var(--radius-md)',
        padding: '0.875rem',
        marginBottom: '1rem',
      }}>
        <p style={{ fontSize: '0.68rem', fontWeight: 600, color: 'var(--fg-muted)', letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: '0.625rem' }}>
          Monthly breakdown
        </p>
        <MiniBarChart animated={animated} />
      </div>

      {/* Status */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '0.75rem 1rem',
        background: 'var(--accent-light)',
        border: '1px solid rgba(26,158,92,0.15)',
        borderRadius: 'var(--radius-md)',
        marginBottom: '0.75rem',
      }}>
        <CheckCircle2 size={15} color="var(--accent)" style={{ flexShrink: 0 }} aria-hidden="true" />
        <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--accent-dark)' }}>
          You're on track this month
        </span>
      </div>

      {/* Example data disclaimer */}
      <p style={{
        fontSize: '0.68rem',
        color: 'var(--fg-placeholder)',
        textAlign: 'center',
        letterSpacing: '0.02em',
      }}>
        Example data for demonstration
      </p>
    </div>
  );
}

function StatMini({ label, value, icon, positive, negative }) {
  return (
    <div style={{
      background: 'var(--bg-subtle)',
      borderRadius: 'var(--radius-md)',
      padding: '0.625rem 0.5rem',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
        <span style={{ fontSize: '0.65rem', fontWeight: 600, color: 'var(--fg-muted)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
          {label}
        </span>
        {icon}
      </div>
      <p style={{
        fontSize: '0.82rem',
        fontWeight: 700,
        color: positive ? 'var(--accent)' : negative ? '#e05454' : 'var(--fg-primary)',
        letterSpacing: '-0.01em',
      }}>
        {value}
      </p>
    </div>
  );
}
