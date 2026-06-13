"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { resolveImage } from "@/lib/api";

const images = [
  {
    src: "/01.jpg",
    alt: "Aerial view of Pope Memorial Higher Secondary School campus",
  },
  {
    src: "/uniform.jpg",
    alt: "Students in uniform at Pope Memorial Higher Secondary School",
  },
];

export default function HeroCarousel({ heroImages = [] }) {
  const imagesToUse = heroImages.length > 0 ? heroImages.map(hi => ({ src: hi.image_url, alt: "Hero Image" })) : images;
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % imagesToUse.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative min-h-[360px] w-full max-w-full overflow-hidden rounded-[20px] shadow-[0_24px_64px_rgba(27,58,107,0.18)] lg:h-full lg:min-h-[560px]">
      {imagesToUse.map((image, index) => {
        const resolved = resolveImage(image.src, 1920);
        return (
        <Image
          key={`${image.src || index}-${index === currentIndex}`}
          src={resolved.src}
          alt={image.alt || "Hero Image"}
          fill
          priority={index === 0}
          className={`object-cover transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100 animate-kenburns" : "opacity-0"
          }`}
          sizes="(max-width: 1024px) 100vw, 50vw"
          unoptimized={resolved.unoptimized}
        />
        );
      })}
      <div className="absolute bottom-6 left-0 right-0 z-10 flex justify-center gap-2.5">
        {imagesToUse.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "w-8 bg-white"
                : "w-2.5 bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
