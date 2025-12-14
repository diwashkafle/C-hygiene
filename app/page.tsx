import AboutUs from "@/components/Hero/Aboutus";
import Header from "@/components/Hero/Header";
import LandingCoverPageSection from "@/components/Hero/LandingCoverPageSection";
import ContactUs from "@/components/Hero/Contactus";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
export default async function Home() {
  const session = await getServerSession(authOptions);
  let isAdmin = false;
  if(session){
    isAdmin = true;
  }
  return (
    <main className="">
      <Header />
      <section className="">
        <LandingCoverPageSection isAdmin={isAdmin} />
        <AboutUs />
        <ContactUs />
      </section>
    </main>
  );
}
