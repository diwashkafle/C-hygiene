import AboutUs from "@/components/Hero/Aboutus";
import Header from "@/components/Hero/Header";
import LandingCoverPageSection from "@/components/Hero/LandingCoverPageSection";
import ContactUs from "@/components/Hero/Contactus";

export default function Home() {
  return (
    <main className="">
      <Header />
      <section className="">
        <LandingCoverPageSection />
        <AboutUs />
        <ContactUs />
      </section>
    </main>
  );
}
