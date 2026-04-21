import Footer from "@/components/landing/Footer";
import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";

export default function Home() {
  return (
    <main className="flex bg-[#35a0e0] font-fjalla-one min-h-screen flex-col items-center justify-between">
     <Header/>
     <Hero/>
     <Footer/>
  </main>
  );
}
