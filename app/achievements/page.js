import Navbar from "@/components/Navbar";
import Notice from "@/components/Notice";
import PageHero from "@/components/PageHero";
import Achievements from "@/components/Achievements";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Achievements",
  description:
    "Celebrating the academic and sporting milestones of students at Pope Memorial Higher Secondary School, Sawyerpuram.",
  alternates: {
    canonical: "/achievements",
  },
  openGraph: {
    title: "Achievements — Pope Memorial Higher Secondary School",
    description:
      "A look at the academic and sporting milestones our students have earned through hard work, teamwork, and discipline.",
    url: "/achievements",
    images: [
      {
        url: "/01.jpg",
        alt: "Aerial view of Pope Memorial Higher Secondary School campus",
      },
    ],
  },
};

export default function AchievementsPage() {
  return (
    <>
      <Navbar />
      <Notice />
      <PageHero
        eyebrow="Our Milestones"
        title="Achievements That Speak"
        description="Our students have earned recognition in both sports and academics over the years — the result of consistent effort, good coaching, and a healthy dose of team spirit."
        image="/01.jpg"
        alt="Aerial view of Pope Memorial Higher Secondary School campus"
      />
      <Achievements />
      <Footer />
    </>
  );
}
