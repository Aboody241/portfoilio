import { Header } from "@/components/layout/Header";
import { NavRail } from "@/components/layout/NavRail";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { WorksSection } from "@/components/sections/WorksSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { ContactSection } from "@/components/sections/ContactSection";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-bg-1 text-white">
      <Header />
      <NavRail />
      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <WorksSection />
        <ExperienceSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
