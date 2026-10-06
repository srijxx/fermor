'use client';

const footerLinks = [
  { label: 'Product',      href: '#product' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Insights',     href: '#insights' },
  { label: 'About',        href: '#about' },
  { label: 'Contact',      href: 'mailto:hello@fermor.in' },
];

/* Inline SVG icons for social platforms */
function LinkedInIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  );
}

const socials = [
  { label: 'LinkedIn',  Icon: LinkedInIcon,  href: '#' },
  { label: 'X',         Icon: XIcon,         href: '#' },
  { label: 'Instagram', Icon: InstagramIcon, href: '#' },
];

export default function Footer() {
  return (
    <footer
      style={{
        background: 'var(--dark-bg)',
        borderTop: '1px solid var(--dark-border)',
        padding: '3.5rem 0 2rem',
      }}
      aria-label="Site footer"
    >
      <div className="container-main">
        {/* Top row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '2rem',
            marginBottom: '3rem',
          }}
        >
          {/* Brand */}
          <div style={{ maxWidth: '280px' }}>
            <a
              href="#hero"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                textDecoration: 'none',
                marginBottom: '0.875rem',
              }}
              aria-label="Fermor home"
            >
              <span
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
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M2 10L5 5.5L8 8L11 4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              <span style={{
                fontSize: '1rem',
                fontWeight: 700,
                letterSpacing: '-0.02em',
                color: 'var(--dark-fg)',
              }}>
                Fermor
              </span>
            </a>
            <p style={{
              fontSize: '0.84rem',
              color: 'var(--dark-muted)',
              lineHeight: 1.65,
            }}>
              Make sense of your money. Understand where you stand, decide what to do next, and build a stronger financial future.
            </p>
          </div>

          {/* Nav links */}
          <nav aria-label="Footer navigation">
            <p style={{
              fontSize: '0.7rem',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--dark-muted)',
              marginBottom: '1rem',
            }}>
              Navigate
            </p>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    style={{
                      fontSize: '0.875rem',
                      color: 'var(--dark-muted)',
                      textDecoration: 'none',
                      transition: 'color 0.15s ease',
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--dark-fg)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--dark-muted)'}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social */}
          <div>
            <p style={{
              fontSize: '0.7rem',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--dark-muted)',
              marginBottom: '1rem',
            }}>
              Follow
            </p>
            <div style={{ display: 'flex', gap: '0.625rem' }}>
              {socials.map(({ label, Icon, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    background: 'var(--dark-surface)',
                    border: '1px solid var(--dark-border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--dark-muted)',
                    textDecoration: 'none',
                    transition: 'border-color 0.15s ease, color 0.15s ease, background 0.15s ease',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'var(--accent)';
                    e.currentTarget.style.color = 'var(--accent)';
                    e.currentTarget.style.background = 'rgba(26,158,92,0.08)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'var(--dark-border)';
                    e.currentTarget.style.color = 'var(--dark-muted)';
                    e.currentTarget.style.background = 'var(--dark-surface)';
                  }}
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: 'var(--dark-border)', marginBottom: '1.5rem' }} />

        {/* Bottom row */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.75rem',
        }}>
          <p style={{ fontSize: '0.78rem', color: 'var(--dark-muted)' }}>
            © {new Date().getFullYear()} Fermor. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '1.25rem' }}>
            {['Privacy', 'Terms'].map((item) => (
              <a
                key={item}
                href="#"
                style={{
                  fontSize: '0.78rem',
                  color: 'var(--dark-muted)',
                  textDecoration: 'none',
                  transition: 'color 0.15s ease',
                }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--dark-fg)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--dark-muted)'}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
