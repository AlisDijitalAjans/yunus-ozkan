import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Services from "@/components/Services";
import Gallery from "@/components/Gallery";
import { getSettings } from "@/lib/settings";

export default async function Home() {
  const settings = await getSettings();

  return (
    <>
      <Hero settings={settings} />
      <About />
      <Projects />
      <Services />
      <Gallery />
    </>
  );
}
