import Image from "next/image";
import { ImageZoom } from "@/components/ui/zoomable-image";
import { getAchievements, resolveImage } from "@/lib/api";



// removed firstImage

export default async function Achievements() {
  const achievements = await getAchievements();

  const items = achievements?.length
    ? achievements.map((a) => ({
        id: a.id,
        image: a.image_url,
        title: a.title,
        text: a.description,
      }))
    : [];

  return (
    <section className="bg-white px-[5%] py-20" id="achievements">
      <div data-aos="fade-up">
        <p className="mb-2.5 text-[11.5px] font-bold uppercase tracking-[0.12em] text-gold">
          Recognition
        </p>
        <h2 className="mb-4 font-serif text-[clamp(30px,3.8vw,44px)] font-bold leading-[1.18] text-[#1c1f2b]">
          Achievements
        </h2>
      </div>

      <div className="mt-11 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map(({ id, image, title, text }, index) => (
          <div
            key={id ?? title}
            data-aos="fade-up"
            data-aos-delay={(index % 3) * 100}
            className="group flex flex-col h-full overflow-hidden rounded-2xl border border-border bg-white transition-all hover:-translate-y-1 hover:shadow-[0_6px_20px_rgba(0,0,0,0.08)]"
          >
            {image && (
              <div className="relative h-[250px] sm:h-[300px] lg:h-[400px] w-full overflow-hidden flex-shrink-0">
                <ImageZoom
                  src={resolveImage(image, 1024).src}
                  alt={title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  unoptimized={resolveImage(image, 1024).unoptimized}
                />
              </div>
            )}
            <div className="p-7 flex flex-1 flex-col">
              <h3 className="mb-2 text-[17px] font-bold leading-tight text-navy transition-colors group-hover:text-gold">
                {title}
              </h3>
              <p className="text-[14px] leading-relaxed text-muted flex-1">{text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
