'use client';

import { useEffect, useRef, useState } from 'react';
import { ShoppingBag, Car, UtensilsCrossed, Receipt, Coffee } from 'lucide-react';

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

const transactions = [
  {
    day: 'Monday',
    date: 'Oct 5',
    amount: '₹850',
    category: 'Food',
    merchant: 'Swiggy',
    icon: UtensilsCrossed,
    color: '#1a9e5c',
    bg: 'var(--accent-light)',
    border: 'rgba(26,158,92,0.2)',
    note: 'Under your dining budget',
    positive: true,
  },
  {
    day: 'Tuesday',
    date: 'Oct 6',
    amount: '₹1,200',
    category: 'Shopping',
    merchant: 'Amazon',
    icon: ShoppingBag,
    color: '#2563eb',
    bg: '#eff6ff',
    border: 'rgba(37,99,235,0.2)',
    note: 'Planned purchase',
    positive: true,
  },
  {
    day: 'Wednesday',
    date: 'Oct 7',
    amount: '₹420',
    category: 'Transport',
    merchant: 'Ola',
    icon: Car,
    color: '#d97706',
    bg: '#fffbeb',
    border: 'rgba(217,119,6,0.2)',
    note: 'Lower than usual',
    positive: true,
  },
  {
    day: 'Thursday',
    date: 'Oct 8',
    amount: '₹2,100',
    category: 'Bills',
    merchant: 'Electricity board',
    icon: Receipt,
    color: '#7c3aed',
    bg: '#f5f3ff',
    border: 'rgba(124,58,237,0.2)',
    note: 'Recurring · expected',
    positive: null,
  },
  {
    day: 'Friday',
    date: 'Oct 9',
    amount: '₹650',
    category: 'Food',
    merchant: 'Blue Tokai',
    icon: Coffee,
    color: '#1a9e5c',
    bg: 'var(--accent-light)',
    border: 'rgba(26,158,92,0.2)',
    note: 'Within your budget',
    positive: true,
  },
];

export default function MoneyStory() {
  const [ref, inView] = useInView(0.08);

  return (
    <section
      ref={ref}
      className="section-py"
      style={{ background: 'var(--bg-base)' }}
    >
      <div className="container-main">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.4fr',
            gap: '5rem',
            alignItems: 'center',
          }}
          className="story-grid"
        >
          {/* Left: copy */}
          <div
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0)' : 'translateY(16px)',
              transition: 'opacity 0.6s ease, transform 0.6s var(--ease-out)',
            }}
          >
            <p className="label-sm" style={{ marginBottom: '0.875rem' }}>Activity timeline</p>
            <h2 className="heading-lg" style={{ marginBottom: '1.25rem' }}>
              Your money has a story. Fermor helps you understand it.
            </h2>
            <p className="body-lg" style={{ marginBottom: '1.75rem' }}>
              Every transaction is a chapter. See your week at a glance, spot patterns, and understand how your daily choices add up.
            </p>

            {/* Week summary */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
            }}>
              {[
                { label: 'Total this week', value: '₹5,220', color: 'var(--fg-primary)' },
                { label: 'vs. last week', value: '−14%', color: 'var(--accent)' },
                { label: 'Transactions', value: '5', color: 'var(--fg-primary)' },
              ].map((s) => (
                <div key={s.label} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0.75rem 1rem',
                  background: 'var(--bg-subtle)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-md)',
                }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--fg-secondary)', fontWeight: 500 }}>{s.label}</span>
                  <span style={{ fontSize: '1rem', fontWeight: 700, color: s.color, letterSpacing: '-0.02em' }}>{s.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: timeline */}
          <div
            style={{
              position: 'relative',
              opacity: inView ? 1 : 0,
              transition: 'opacity 0.6s ease 0.15s',
            }}
          >
            {/* Connecting line */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                left: '17px',
                top: '28px',
                bottom: '28px',
                width: '1px',
                background: 'linear-gradient(to bottom, var(--accent) 0%, var(--border) 60%, transparent 100%)',
                opacity: 0.4,
              }}
            />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
              {transactions.map((tx, i) => {
                const Icon = tx.icon;
                return (
                  <div
                    key={tx.day}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '1rem',
                      opacity: inView ? 1 : 0,
                      transform: inView ? 'translateX(0)' : 'translateX(16px)',
                      transition: `opacity 0.5s ease ${i * 0.08 + 0.1}s, transform 0.5s var(--ease-out) ${i * 0.08 + 0.1}s`,
                    }}
                  >
                    {/* Timeline node */}
                    <div style={{
                      width: '34px',
                      height: '34px',
                      borderRadius: '8px',
                      background: tx.bg,
                      border: `1px solid ${tx.border}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: tx.color,
                      flexShrink: 0,
                      zIndex: 1,
                      position: 'relative',
                    }}>
                      <Icon size={15} />
                    </div>

                    {/* Card */}
                    <div
                      style={{
                        flex: 1,
                        background: 'var(--bg-surface)',
                        border: '1px solid var(--border)',
                        borderRadius: 'var(--radius-md)',
                        padding: '0.875rem 1rem',
                        transition: 'border-color 0.18s ease, box-shadow 0.18s ease',
                        cursor: 'default',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.borderColor = tx.color;
                        e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.borderColor = 'var(--border)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.5rem' }}>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '1px' }}>
                            <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--fg-muted)', letterSpacing: '0.04em' }}>{tx.day}</span>
                            <span style={{ fontSize: '0.68rem', color: 'var(--fg-placeholder)' }}>· {tx.date}</span>
                          </div>
                          <p style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--fg-primary)', letterSpacing: '-0.01em' }}>{tx.merchant}</p>
                        </div>
                        <div style={{ textAlign: 'right', flexShrink: 0 }}>
                          <p style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--fg-primary)', letterSpacing: '-0.02em' }}>{tx.amount}</p>
                          <span style={{
                            fontSize: '0.65rem',
                            fontWeight: 600,
                            color: tx.color,
                            background: tx.bg,
                            border: `1px solid ${tx.border}`,
                            borderRadius: '999px',
                            padding: '1px 7px',
                            display: 'inline-block',
                          }}>
                            {tx.category}
                          </span>
                        </div>
                      </div>

                      {tx.note && (
                        <p style={{
                          fontSize: '0.72rem',
                          color: 'var(--fg-muted)',
                          marginTop: '0.375rem',
                          paddingTop: '0.375rem',
                          borderTop: '1px solid var(--border)',
                        }}>
                          {tx.note}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .story-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
        }
      `}</style>
    </section>
  );
}
