import Hero from "../components/home/Hero";
import MarqueeTicker from "../components/home/MarqueeTicker";
import ServicesGrid from "../components/home/ServicesGrid";
import StatsBar from "../components/home/StatsBar";
import HowItWorks from "../components/home/HowItWorks";
import DoctorsPreview from "../components/home/DoctorsPreview";
import Testimonials from "../components/home/Testimonials";
import BlogPreview from "../components/home/BlogPreview";
import QuickAppointment from "../components/home/QuickAppointment";
import NewsletterSignup from "../components/home/NewsletterSignup";

export default function Home() {
  return (
    <main>
      <Hero />
      <MarqueeTicker />
      <ServicesGrid />
      <StatsBar />
      <HowItWorks />
      <DoctorsPreview />
      <Testimonials />
      <BlogPreview />
      <QuickAppointment />
      <NewsletterSignup />
    </main>
  );
}
