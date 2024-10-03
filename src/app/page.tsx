import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import { InfiniteMovingCardsDemo } from "@/components/Customers";
import Features from "@/components/Features";
import FAQ from "@/components/FAQ";
import { BentoGridSecondDemo } from "@/components/bentoBlog";
import CallToAction from "@/components/CallToAction";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Hero />
      <HowItWorks />
      <Features />
      <BentoGridSecondDemo />
      <InfiniteMovingCardsDemo />
      <CallToAction />
    </main>
  );
}
