import Navbar from "@/components/Navbar";
import Notice from "@/components/Notice";
import Hero from "@/components/Hero";
import Highlights from "@/components/Highlights";
import About from "@/components/About";
import Diocese from "@/components/Diocese";
import Academics from "@/components/Academics";
import Vision from "@/components/Vision";
import Staff from "@/components/Staff";
import Rules from "@/components/Rules";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import {
  getHighlights,
  getNotices,
  getStaff,
  getActivities,
  getAchievements,
  getDioceses,
  getStreams,
  getVisionMission,
  getRules,
  getContact
} from "@/lib/api";

export default async function Home() {
  // Fire all data fetches in parallel. Next.js will dedupe the requests
  // so when the child components call these same functions, they resolve instantly
  // instead of causing a sequential waterfall.
  const [highlightsData] = await Promise.all([
    getHighlights(),
    getNotices(),
    getStaff(),
    getActivities(),
    getAchievements(),
    getDioceses(),
    getStreams(),
    getVisionMission(),
    getRules(),
    getContact()
  ]);
  const highlights = highlightsData?.length
    ? highlightsData.map((h) => ({
        id: h.id,
        image: h.image_url,
        date: h.date,
        title: h.title,
        text: h.text
      }))
    : [];

  return (
    <>
      <Navbar />
      <Notice />
      <Hero />
      <Highlights items={highlights} />
      <About />
      <Diocese />
      <Academics />
      <Vision />
      <Staff />
      <Rules />
      <Contact />
      <Footer />
    </>
  );
}
