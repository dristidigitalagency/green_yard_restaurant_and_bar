import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import MenuShowcase from "@/components/MenuShowcase";
import Occasions from "@/components/Occasions";
import BookingCTA from "@/components/BookingCTA";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <MenuShowcase />
        <Occasions />
        <BookingCTA />
        <Testimonials />
      </main>
      <Footer />
    </>
  );
}
