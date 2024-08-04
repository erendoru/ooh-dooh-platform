import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import { InfiniteMovingCardsDemo } from "@/components/Customers";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Hero />
      <HowItWorks />
      <InfiniteMovingCardsDemo />
    </main>
  );
}
