"use client"; // Mark this file as a Client Component

import Hero from '@/components/Hero';
import UmrahVisaRules from '@/components/UmrahVisaRules';
import AboutGohajjumrah from '@/components/AboutGohajjumrah';
import PackageCategories from '@/components/PackageCategories';
import Hajj2025 from '@/components/Hajj2025';
import QuickLinks from '@/components/QuickLinks';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <main className="min-h-screen bg-background">
        <Hero />
        <PackageCategories />
        <AboutGohajjumrah />
        <QuickLinks />
        <Footer />
      </main>
    </>
  );
}