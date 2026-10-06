import Navbar           from '@/components/Navbar';
import Hero             from '@/components/Hero';
import ValueStrip       from '@/components/ValueStrip';
import ClaritySection   from '@/components/ClaritySection';
import NextBestMove     from '@/components/NextBestMove';
import FinancialOverview from '@/components/FinancialOverview';
import MoneyStory       from '@/components/MoneyStory';
import HowItWorks       from '@/components/HowItWorks';
import Philosophy       from '@/components/Philosophy';
import FinalCTA         from '@/components/FinalCTA';
import Footer           from '@/components/Footer';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <ValueStrip />
        <ClaritySection />
        <NextBestMove />
        <FinancialOverview />
        <MoneyStory />
        <HowItWorks />
        <Philosophy />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
