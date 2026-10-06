import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  title: 'Fermor — Make sense of your money',
  description:
    'Understand where you stand, make better decisions, and build a stronger financial future with Fermor.',
  keywords: ['personal finance', 'money management', 'financial clarity', 'budgeting', 'savings'],
  openGraph: {
    title: 'Fermor — Make sense of your money',
    description: 'Understand where you stand, make better decisions, and build a stronger financial future.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      style={{ scrollBehavior: 'smooth' }}
    >
      <body style={{ minHeight: '100vh', overflowX: 'hidden' }}>
        {/* Accessibility: skip navigation link (CSS-only show on focus) */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
