"use client";

import { useRef } from "react";
import Image from "next/image";
import { ImageZoom } from "@/components/ui/zoomable-image";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import { resolveImage } from "@/lib/api";



export default function Highlights({ items = [] }) {
  const trackRef = useRef(null);

  const scrollByCard = (direction) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector("[data-card]");
    const amount = card ? card.offsetWidth + 24 : track.clientWidth;
    track.scrollBy({ left: direction * amount, behavior: "smooth" });
  };

  return (
    <section className="bg-white px-[5%] py-20" id="highlights">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div data-aos="fade-up">
          <p className="mb-2.5 text-[11.5px] font-bold uppercase tracking-[0.12em] text-gold">
            School Life
          </p>
          <h2 className="mb-4 font-serif text-[clamp(30px,3.8vw,44px)] font-bold leading-[1.18] text-[#1c1f2b]">
            Highlights &amp; Events
          </h2>
          <p className="max-w-[580px] text-[15.5px] leading-[1.75] text-muted">
            A glimpse into the celebrations, competitions, and milestones that
            bring our school community together.
          </p>
        </div>

        {items.length > 1 && (
          <div className="flex gap-3">
            <button
              type="button"
              aria-label="Previous"
              onClick={() => scrollByCard(-1)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-navy transition-colors hover:bg-navy-lt"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              aria-label="Next"
              onClick={() => scrollByCard(1)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-navy transition-colors hover:bg-navy-lt"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>

      <div
        ref={trackRef}
        className="mt-11 flex gap-6 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory"
      >
        {items.map((item, index) => (
          <div
            key={item.id ?? index}
            data-card
            data-aos="fade-up"
            data-aos-delay={(index % 3) * 100}
            className="flex h-full flex-col w-[95%] flex-shrink-0 snap-start overflow-hidden rounded-2xl border border-border bg-white transition-all hover:-translate-y-1 hover:shadow-[0_8px_28px_rgba(27,58,107,0.1)] sm:w-[calc(50%-12px)] lg:w-[calc(40%-18px)]"
          >
            <div className="relative h-[280px] sm:h-[340px] lg:h-[400px] w-full flex-shrink-0">
              <ImageZoom
                src={resolveImage(item.image, 1024).src}
                alt={item.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 50vw, 25vw"
                unoptimized={resolveImage(item.image, 1024).unoptimized}
              />
            </div>
            <div className="p-6 flex flex-1 flex-col">
              {item.date && (
                <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.06em] text-gold">
                  <CalendarDays size={14} />
                  {item.date}
                </div>
              )}
              <h3 className="mb-2 text-[17px] font-bold leading-tight text-navy">
                {item.title}
              </h3>
              <p className="text-[14px] leading-relaxed text-muted flex-1">{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
