import { Navbar } from "@/components/csi/navbar";
import { Hero } from "@/components/csi/hero";
import { About } from "@/components/csi/about";
import { Solutions } from "@/components/csi/solutions";
import { Capabilities } from "@/components/csi/capabilities";
import { Industries } from "@/components/csi/industries";
import { WhyCSI } from "@/components/csi/why-csi";
import { Future } from "@/components/csi/future";
import { CTA } from "@/components/csi/cta";
import { FAQ } from "@/components/csi/faq";
import { SectionReveal } from "@/components/csi/section-reveal";
import { Footer } from "@/components/csi/footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <SectionReveal tone="emerald">
        <About />
      </SectionReveal>
      <SectionReveal tone="teal">
        <Solutions />
      </SectionReveal>
      <SectionReveal tone="emerald">
        <Capabilities />
      </SectionReveal>
      <SectionReveal tone="teal">
        <Industries />
      </SectionReveal>
      <SectionReveal tone="emerald">
        <WhyCSI />
      </SectionReveal>
      <SectionReveal tone="slate">
        <Future />
      </SectionReveal>
      <SectionReveal tone="teal">
        <CTA />
      </SectionReveal>
      <SectionReveal tone="emerald">
        <FAQ />
      </SectionReveal>
      <Footer />
    </main>
  );
}
