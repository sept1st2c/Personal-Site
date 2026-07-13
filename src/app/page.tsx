import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Activity from "@/components/Activity";
import LinkedInPosts from "@/components/LinkedInPosts";
import Achievements from "@/components/Achievements";
import Footer from "@/components/Footer";

// Skills section is intentionally not rendered for now — Achievements
// (which the site owner is adding photos to) took its slot instead.
// src/components/Skills.tsx and src/lib/data/skills.ts are left in place
// in case it comes back later.
//
// Education is no longer a separate section — it now lives prominently
// in the hero instead. src/components/Education.tsx is left in place
// unused in case it's wanted back.
export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Hero />
        <Experience />
        <Projects />
        <Achievements />
        <Activity />
        <LinkedInPosts />
        <About />
      </main>
      <Footer />
    </>
  );
}
