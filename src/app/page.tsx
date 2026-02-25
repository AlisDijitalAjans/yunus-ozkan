import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Services from "@/components/Services";
import Gallery from "@/components/Gallery";
import Footer from "@/components/Footer";
import CursorFollower from "@/components/CursorFollower";

export default function Home() {
  return (
    <>
      <CursorFollower />
      <Header />
      <main>
        <Hero />
        <About />
        <Projects />
        <Services />
        <Gallery />
      </main>
      <Footer />
    </>
  );
}
