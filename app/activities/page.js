import Navbar from "@/components/Navbar";
import Notice from "@/components/Notice";
import PageHero from "@/components/PageHero";
import Activities from "@/components/Activities";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Activities & Clubs",
  description:
    "Explore the clubs and co-curricular activities at Pope Memorial Higher Secondary School, Sawyerpuram — music, scouting, sports, and community service.",
  alternates: {
    canonical: "/activities",
  },
  openGraph: {
    title: "Activities & Clubs — Pope Memorial Higher Secondary School",
    description:
      "From music and scouting to sports and community work, students get plenty of chances to try new things outside the classroom.",
    url: "/activities",
    images: [
      {
        url: "/02.jpeg",
        alt: "Aerial view of Pope Memorial Higher Secondary School campus",
      },
    ],
  },
};

export default function ActivitiesPage() {
  return (
    <>
      <Navbar />
      <Notice />
      <PageHero
        eyebrow="School Life"
        title="Activities & Clubs"
        description="From music and scouting to sports and community work, students get plenty of chances to try new things, make friends, and build confidence outside the classroom."
        image="/01.jpg"
        alt="Students in uniform at Pope Memorial Higher Secondary School"
      />
      <Activities />
      <Footer />
    </>
  );
}
