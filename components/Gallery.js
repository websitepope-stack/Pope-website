"use client";

import Image from "next/image";
import LightGallery from "lightgallery/react";
import lgZoom from "lightgallery/plugins/zoom";
import lgThumbnail from "lightgallery/plugins/thumbnail";

import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";

import { resolveImage } from "@/lib/api";

export default function Gallery({ photos = [] }) {
  return (
    <section className="bg-white px-[5%] py-20" id="gallery">
      <LightGallery
        plugins={[lgZoom, lgThumbnail]}
        speed={400}
        elementClassNames="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
      >
        {photos.map((photo, index) => {
          const thumb = resolveImage(photo, 640);
          const full = resolveImage(photo, 1920);
          return (
            <a
              key={index}
              href={full.src}
              data-aos="zoom-in"
              data-aos-delay={(index % 4) * 80}
              className="relative block aspect-square overflow-hidden rounded-2xl border border-border"
            >
              <Image
                src={thumb.src}
                alt={`School gallery photo ${index + 1}`}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-transform duration-500 hover:scale-105"
                unoptimized={thumb.unoptimized}
              />
            </a>
          );
        })}
      </LightGallery>
    </section>
  );
}
