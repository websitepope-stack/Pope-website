import Image from "next/image";

export default function PageHero({ eyebrow, title, description, image, alt }) {
  return (
    <section className="relative flex min-h-[300px] items-end overflow-hidden bg-navy px-[5%] py-14 text-white lg:min-h-[360px]">
      <Image
        src={image}
        alt={alt}
        fill
        priority
        className="object-cover opacity-25"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-dk via-navy/70 to-navy/40" />
      <div className="relative z-10 max-w-[700px]">
        <p className="mb-2.5 text-[11.5px] font-bold uppercase tracking-[0.12em] text-gold">
          {eyebrow}
        </p>
        <h1 className="mb-4 font-serif text-[clamp(32px,4.5vw,52px)] font-bold leading-[1.15] text-white">
          {title}
        </h1>
        <p className="text-[15.5px] leading-[1.75] text-[#cdd9ee]">{description}</p>
      </div>
    </section>
  );
}
