import { About } from "@/components/landing/about";
import { Contact } from "@/components/landing/contact";
import { Footer } from "@/components/landing/footer";
import { Header } from "@/components/landing/header";
import { Hero } from "@/components/landing/hero";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Services } from "@/components/landing/services";

export default function Home() {
  return (
    <div className="flex min-h-[100dvh] flex-col overflow-x-hidden bg-[#121212]">
      <Header />
      <main className="flex-1">
        <Hero />
        <Services />
        <HowItWorks />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
