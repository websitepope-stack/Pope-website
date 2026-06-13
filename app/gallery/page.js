import Navbar from "@/components/Navbar";
import Notice from "@/components/Notice";
import PageHero from "@/components/PageHero";
import Gallery from "@/components/Gallery";
import Footer from "@/components/Footer";
import { getGallery } from "@/lib/api";

export const metadata = {
  title: "Photo Gallery",
  description:
    "Browse photos from events, celebrations, and daily life at Pope Memorial Higher Secondary School, Sawyerpuram.",
  alternates: {
    canonical: "/gallery",
  },
  openGraph: {
    title: "Photo Gallery — Pope Memorial Higher Secondary School",
    description:
      "Photos from around campus — classrooms, clubs, events, and everyday school life.",
    url: "/gallery",
    images: [
      {
        url: "/01.jpg",
        alt: "Aerial view of Pope Memorial Higher Secondary School campus",
      },
    ],
  },
};

export default async function GalleryPage() {
  const gallery = await getGallery();
  const photos = gallery?.length ? gallery.map((g) => g.image_url).filter(Boolean) : [];

  return (
    <>
      <Navbar />
      <Notice />
      <PageHero
        eyebrow="Photo Gallery"
        title="Life at Pope Memorial"
        description="A visual journey through our campus, classrooms, clubs, and celebrations — capturing the everyday moments that make our school community special."
        image="/01.jpg"
        alt="Aerial view of Pope Memorial Higher Secondary School campus"
      />
      <Gallery photos={photos} />
      <Footer />
    </>
  );
}
