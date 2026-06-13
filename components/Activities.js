import Image from "next/image";
import { ImageZoom } from "@/components/ui/zoomable-image";
import { getActivities, resolveImage } from "@/lib/api";



// removed firstImage

export default async function Activities() {
  const activities = await getActivities();

  const items = activities?.length
    ? activities.map((a) => ({
        id: a.id,
        image: a.image_url,
        title: a.name,
        text: a.description,
        master: `Master: ${a.master}`,
      }))
    : [];

  return (
    <section className="bg-cream px-[5%] py-20" id="activities">
      <div className="mt-11 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map(({ id, image, title, text, master }, index) => (
          <div
            key={id ?? title}
            data-aos="fade-up"
            data-aos-delay={(index % 3) * 100}
            className="flex flex-col h-full overflow-hidden rounded-2xl border border-border bg-white transition-all hover:-translate-y-1 hover:shadow-[0_6px_20px_rgba(0,0,0,0.08)]"
          >
            {image && (
              <div className="relative h-[250px] sm:h-[300px] lg:h-[400px] w-full flex-shrink-0">
                <ImageZoom
                  src={resolveImage(image, 1024).src}
                  alt={title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 50vw, 33vw"
                  unoptimized={resolveImage(image, 1024).unoptimized}
                />
              </div>
            )}
            <div className="p-6 flex flex-1 flex-col">
              <h3 className="mb-1.5 text-[15px] font-semibold text-navy">{title}</h3>
              <p className="text-[13px] leading-[1.6] text-muted flex-1">{text}</p>
              <div className="mt-2.5 text-xs font-semibold text-gold">{master}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
